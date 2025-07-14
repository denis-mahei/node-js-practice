import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import path from 'path';
import redoc from 'redoc-express';
import { fileURLToPath } from 'url';
import { sayHello } from './middlewares/welcome.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import productsRouter from './routers/products.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = getEnvVar('PORT', '3000');

export const setupServer = () => {
  const exp = express();

  exp.use(express.json());

  exp.use(cors());

  exp.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  exp.get('/', sayHello);

  exp.use('/api/products', productsRouter);

  exp.use(
    '/docs',
    redoc({
      title: 'Products API Docs',
      specUrl: '/openapi.yaml',
    }),
  );

  exp.use('/openapi.yaml', express.static(path.resolve(__dirname, 'docs')));

  exp.use(errorHandler);

  exp.use(notFoundHandler);

  exp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
