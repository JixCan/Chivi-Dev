import React, { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';

interface HanziAnimationProps {
    character: string; // Иероглиф для анимации
}

const HanziAnimation: React.FC<HanziAnimationProps> = ({ character }) => {
    const writerRef = useRef<HanziWriter | null>(null);
    const targetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (targetRef.current) {
            // Инициализируем Hanzi Writer
            writerRef.current = HanziWriter.create(targetRef.current, character, {
                width: 100, // Ширина области для иероглифа
                height: 100, // Высота области для иероглифа
                padding: 5, // Отступы
                showOutline: true, // Показывать контур
                strokeAnimationSpeed: 1, // Скорость анимации штрихов
                delayBetweenStrokes: 300, // Задержка между штрихами
            });

            // Запускаем анимацию
            writerRef.current.animateCharacter();
        }

        // Очистка при размонтировании компонента
        return () => {
            if (writerRef.current && targetRef.current) {
                // Удаляем содержимое контейнера
                targetRef.current.innerHTML = '';
            }
        };
    }, [character]);

    return <div ref={targetRef}></div>;
};

export default HanziAnimation;