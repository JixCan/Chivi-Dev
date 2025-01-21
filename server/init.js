// server/init.js
import initDB from './db.js';

async function main() {
  const db = await initDB();
  console.log('База данных успешно инициализирована.');
  await db.close();
}

main().catch((error) => {
  console.error('Ошибка при инициализации базы данных:', error);
});