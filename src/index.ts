import express, { Router } from 'express';
import mustacheExpress from 'mustache-express';
import { API_PORT } from './config';
import { BlogDataSource } from './datasource';
import { apiRouter } from './api/apiRoutes';
import bodyParser from 'body-parser';

BlogDataSource.initialize()
  .then(() => {
    BlogDataSource.synchronize();
    console.log(`DB ready`);

    app.listen(API_PORT, () => {
      console.log(`[server]: Server is running at port ${API_PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

const app = express();
app.use(bodyParser.json());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

const views = () => {
  const viewsRouter = Router();

  viewsRouter.get('/', (_, res) => {
    res.render('home');
  });

  return viewsRouter;
};

app.use('/api', apiRouter());
app.use('/', views());
