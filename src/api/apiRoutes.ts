import { Router } from 'express';
import { Post } from '../entities/Post';
import { BlogDataSource } from '../datasource';

export const apiRouter = () => {
  const apiRouter = Router();
  apiRouter.get('/health', (_, res) => {
    res.send('UP');
  });

  apiRouter.post('/posts', (req, res) => {
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
  });

  return apiRouter;
};
