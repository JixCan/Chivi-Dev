// server/server.js
import express from 'express';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();

  // Создаем Vite сервер в middleware режиме
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });

  // Используем Vite middleware
  app.use(vite.middlewares);

  // API
  app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }]);
  });

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