import "@/global";
import App from './app';
import { logger } from '@utils/logger';
import { Database } from './database/mongo';
import AttendanceRoute from '@/routes/attendance.route'
import { RedisDatabase } from './database/redis';


const start = async () => {

  const database = Database.getInstance();
  await database.connect();

  const redis = RedisDatabase.getInstance();
  await redis.connect();

  const appInstance = new App([new AttendanceRoute()], database, redis);
  const app = appInstance.getServer();

  const PORT =  3001;
  app.listen(PORT, () => {
    logger.info(`🚀 Server listening on port ${PORT}`);
    logger.info(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
};

start();