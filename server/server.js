// server/server.js
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
// import text2wav from 'text2wav';

async function createServer() {
  const app = express();

  // Middleware для обработки JSON в теле запроса
  app.use(express.json());

  // Подключение к базе данных
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  // GET-маршрут для поиска слова
  app.get('/api/word', async (req, res) => {
    const { text } = req.query; // Получаем текст из query-параметров

    if (!text) {
      return res.status(400).json({ error: 'Параметр "text" отсутствует в запросе' });
    }

    try {
      // Ищем запись в базе данных
      const word = await db.get(
        `SELECT * FROM words WHERE t_hanzi = ? OR s_hanzi = ?`,
        [text, text]
      );

      if (word) {
        // Если запись найдена, возвращаем её
        res.json(word);
      } else {
        // Если запись не найдена, возвращаем 404
        res.status(404).json({ error: 'Слово не найдено' });
      }
    } catch (error) {
      console.error('Ошибка при поиске слова:', error);
      res.status(500).json({ error: 'Ошибка сервера при поиске слова' });
    }
  });

  app.get('/api/random', async (req, res) => {
    const { number } = req.query;
    if (!number) {
      return res.status(400).json({ error: 'Параметр "number" отсутствует в запросе' });
    }

    try {
      // Ищем запись в базе данных
      const word = await db.get(
        `SELECT * FROM words WHERE HSK_level = ? ORDER BY RANDOM() LIMIT 1 `,
        [Number(number)]
      );

      if (word) {
        // Если запись найдена, возвращаем её
        res.json(word);
      } else {
        // Если запись не найдена, возвращаем 404
        res.status(404).json({ error: 'Слово не найдено' });
      }
    } catch (error) {
      console.error('Ошибка при поиске слова:', error);
      res.status(500).json({ error: 'Ошибка сервера при поиске слова' });
    }
  });

  // app.post('/api/synthesize', async (req, res) => {
  //   const { text } = req.body;
  
  //   if (!text) {
  //     return res.status(400).json({ error: 'Параметр "text" отсутствует в запросе' });
  //   }
  
  //   try {
  //     const wavData = await text2wav(text, { voice: 'zh' });
  //     res.set('Content-Type', 'audio/wav');
  //     res.send(wavData);
  //   } catch (error) {
  //     console.error('Ошибка при генерации аудио:', error);
  //     res.status(500).json({ error: 'Ошибка сервера при генерации аудио' });
  //   }
  // });

  // Создаем Vite сервер в middleware режиме
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });

  // Используем Vite middleware
  app.use(vite.middlewares);

  // Все остальные запросы перенаправляются на index.html
  app.get('*', async (req, res) => {
    const url = req.originalUrl;
    let template;
    try {
      template = await vite.transformIndexHtml(url, '<div id="root"></div>');
    } catch (e) {
      console.error(e);
      return res.status(500).end('Internal Server Error');
    }
    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

createServer();