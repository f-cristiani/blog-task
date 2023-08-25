import { Router } from 'express';
import { Post } from '../entities/Post';
import { BlogDataSource } from '../datasource';

export const apiRouter = () => {
  const apiRouter = Router();
  apiRouter.get('/health', (_, res) => {
    res.send('UP');
  });

  apiRouter.post('/posts', (req, res) => {
    try {
      const body = req.body;

      BlogDataSource.getRepository(Post).insert({
        title: body.title || '',
        imageUrl: body.imageUrl || '',
        content: body.content || '',
        user: {
          id: body.userId,
        },
      });

      res.status(200);
      res.json({});
    } catch (error) {
      res.status(500);
      res.json({
        status: 'Error',
      });
    }
  });

  return apiRouter;
};
