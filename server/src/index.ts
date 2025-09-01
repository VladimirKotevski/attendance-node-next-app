import App from './app';
import { logger } from '@utils/logger';
import { Database } from './database/database';
import AttendanceRoute from '@/routes/attendance.route'


const start = async () => {

  const database = Database.getInstance();
  await database.connect();

  const appInstance = new App([new AttendanceRoute()], database);
  const app = appInstance.getServer();

  const PORT =  3001;
  app.listen(PORT, () => {
    logger.info(`🚀 Server listening on port ${PORT}`);
    logger.info(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
};

start();