import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import HanziAnimation from './hanzi-anim'; // Импортируем компонент анимации

// Определяем тип для пропсов
interface ViewerProps {
    data: {
        id: number;
        t_hanzi: string;
        s_hanzi: string;
        pinyin: string;
        meaning: string;
        HSK_level: number;
    } | null; // Данные могут быть null, если ничего не найдено
}

export default function Viewer({ data }: ViewerProps) {
    // Функция для озвучивания пиньиня
    const speakPinyin = () => {
        if (data?.s_hanzi) {
            const utterance = new SpeechSynthesisUtterance(data.s_hanzi);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;

            const voices = window.speechSynthesis.getVoices();
            const chineseVoice = voices.find(voice => voice.lang === 'zh-CN');
            if (chineseVoice) {
                utterance.voice = chineseVoice;
            }

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('Пиньинь отсутствует');
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Character Info</CardTitle>
                </CardHeader>
                <CardContent>
                    {data ? (
                        <>
                            {/* Отображаем анимацию для каждого иероглифа в s_hanzi */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                {data.s_hanzi.split('').map((char, index) => (
                                    <HanziAnimation key={index} character={char} />
                                ))}
                            </div>

                            <Label style={{ display: 'block', padding: '10px' }}>Simplified character: {data.s_hanzi}</Label>
                            <Label style={{ display: 'block', padding: '10px' }}>Traditional character: {data.t_hanzi}</Label>
                            <Label style={{ display: 'block', padding: '10px' }}>Pinyin: {data.pinyin}</Label>
                            <Label style={{ display: 'block', padding: '10px' }}>Meaning: {data.meaning}</Label>
                            <Label style={{ display: 'block', padding: '10px' }}>HSK Level: {data.HSK_level}</Label>

                            {/* Кнопка для озвучивания пиньиня */}
                            <Button onClick={speakPinyin} style={{ marginTop: '10px' }}>
                                Озвучить пиньинь
                            </Button>
                        </>
                    ) : (
                        <Label>No data available</Label>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}