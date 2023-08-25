import { Request, Router } from 'express';
import { BlogDataSource } from '../datasource';
import { Post } from '../entities/Post';

export const viewsRouter = () => {
  const viewsRouter = Router();

  viewsRouter.get('/', async (req, res) => {
    const { offset, limit } = extractPaginationParams(req);

    const posts = await BlogDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'userId')
      .orderBy('post.created_at')
      .offset(offset)
      .limit(limit)
      .getMany();

    res.render('home', {
      posts,
    });
  });

  return viewsRouter;
};

const extractPaginationParams = (req: Request) => {
  const page = { offset: 0, limit: 20 };

  if (!isNaN(Number(req.query.offset))) {
    page.offset = Number(req.query.offset);
  }

  if (!isNaN(Number(req.query.limit))) {
    page.limit = Number(req.query.limit);
  }

  return page;
};
