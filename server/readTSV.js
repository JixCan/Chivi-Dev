// server/readTSV.js
import fs from 'fs';

async function readTSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Разделяем файл на строки
      const lines = data.split('\n');

      // Обрабатываем каждую строку
      for (const line of lines) {
        // Разделяем строку на колонки по табуляции
        const columns = line.split('\t');

        // Если строка не пустая, добавляем её в результаты
        if (columns.length === 4) {
          results.push(columns);
        }
      }

      resolve(results);
    });
  });
}

export default readTSVFile;