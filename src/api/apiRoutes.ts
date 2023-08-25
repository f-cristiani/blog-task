import { Router } from 'express';
import { Post } from '../entities/Post';
import { BlogDataSource } from '../datasource';
import { User } from '../entities/User';
import { Comment } from '../entities/Comment';

export const apiRouter = () => {
  const apiRouter = Router();
  apiRouter.get('/health', (_, res) => {
    res.send('UP');
  });

  apiRouter.post('/posts', async (req, res) => {
    try {
      const body = req.body;

      await BlogDataSource.getRepository(Post).insert({
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
    }
  });

  apiRouter.post('/users', async (req, res) => {
    try {
      const body = req.body;

      await BlogDataSource.getRepository(User).insert({
        name: body.name || '',
        email: body.email || '',
      });

      res.status(200);
      res.json({});
    } catch (error) {
      res.status(500);
    }
  });

  apiRouter.post('/comments', async (req, res) => {
    try {
      const body = req.body;

      await BlogDataSource.getRepository(Comment).insert({
        content: body.content || '',
        user: {
          id: body.userId,
        },
        post: {
          id: body.postId,
        },
      });

      res.status(200);
      res.json({});
    } catch (error) {
      res.status(500);
    }
  });

  return apiRouter;
};
