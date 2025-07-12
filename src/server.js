import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { sayHello } from './middlewares/welcome.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import productsRouter from './routers/products.js';

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

  exp.use(errorHandler);

  exp.use(notFoundHandler);

  exp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
