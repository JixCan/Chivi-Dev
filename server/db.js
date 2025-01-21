// server/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import readTSVFile from './readTSV.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDB() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  // Создание таблицы
  await db.exec(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      t_hanzi TEXT,
      s_hanzi TEXT,
      pinyin TEXT,
      meaning TEXT,
      HSK_level INTEGER
    )
  `);

  // Заполнение таблицы данными из TSV-файлов
  await fillTable(db);

  return db;
}

async function fillTable(db) {
  // Путь к папке с TSV-файлами
  const tsvFolder = path.join(__dirname, '../src/assets/words-tsv');

  // Чтение и вставка данных для каждого уровня HSK
  for (let level = 1; level <= 7; level++) {
    const filePath = path.join(tsvFolder, `HSK ${level}.tsv`);
    const data = await readTSVFile(filePath);

    // Вставка данных в таблицу
    for (const row of data) {
      // row — это массив значений, например: ['傳統', '传统', 'chuántǒng', 'традиция']
      const [t_hanzi, s_hanzi, pinyin, meaning] = row;

      await db.run(
        `INSERT INTO words (t_hanzi, s_hanzi, pinyin, meaning, HSK_level) VALUES (?, ?, ?, ?, ?)`,
        [t_hanzi, s_hanzi, pinyin, meaning, level]
      );
    }
  }

  console.log('Таблица успешно заполнена данными из TSV-файлов.');
}

export default initDB;