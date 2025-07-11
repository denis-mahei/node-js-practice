import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { sayHello } from './middlewares/welcome.js';
import { getEnvVar } from './utils/getEnvVar.js';

const exp = express();

const PORT = getEnvVar('PORT', '3000');

exp.use(express.json());

exp.get('/', sayHello);

exp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
