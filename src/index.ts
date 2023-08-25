import express, { Router } from 'express';
import { API_PORT } from './config';

const app = express();

const api = () => {
  const apiRouter = Router();
  apiRouter.get('/health', (_, res) => {
    res.send('UP');
  });

  return apiRouter;
};

app.use('/api', api());

app.listen(API_PORT, () => {
  console.log(`[server]: Server is running at port ${API_PORT}`);
});
