// server/checkData.js
import initDB from './db.js';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function main() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  // Используем метод all для получения данных
  const result = await db.all(
    "SELECT HSK_level, COUNT(*) as count FROM words GROUP BY HSK_level ORDER BY HSK_level ASC;"
    // "SELECT * FROM words WHERE HSK_level = 1;"
  );

  // const del = await db.exec("delete from words;");

  console.log(result); // Вывод результата
  await db.close();
}

main().catch((error) => {
  console.error('Ошибка при проверке данных:', error);
});