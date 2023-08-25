import express, { Router } from 'express';
import mustacheExpress from 'mustache-express';
import { API_PORT } from './config';

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

const api = () => {
  const apiRouter = Router();
  apiRouter.get('/health', (_, res) => {
    res.send('UP');
  });

  return apiRouter;
};

const views = () => {
  const viewsRouter = Router();

  viewsRouter.get('/', (_, res) => {
    res.render('home');
  });

  return viewsRouter;
};

app.use('/api', api());
app.use('/', views());

app.listen(API_PORT, () => {
  console.log(`[server]: Server is running at port ${API_PORT}`);
});
