import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { Database } from './database/mongo';
import { RedisDatabase } from './database/redis';


class App {
  public app: express.Application;
  public env: string;
  public database: Database;
  public redis: RedisDatabase;


  constructor(routes: Routes[],  database: Database, redis: RedisDatabase) {
    this.app = express();
    this.env = 'development';
    this.database = database; 
    this.redis = redis;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.set('trust proxy', true);
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: '*', credentials: true }));
    this.app.use(helmet({
      crossOriginOpenerPolicy: false, // disable only if needed
    }));
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Auth Service API',
          version: '1.0.0',
          description: 'API documentation for the auth service',
        },
        servers: [
          {
            url: '/', // tells Swagger to prefix routes with /users
          },
        ],
      },
      apis: ['**/*.ts'], // Adjust this to point to your route files for Swagger comments
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;