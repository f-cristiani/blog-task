import { Request, Router } from 'express';
import { BlogDataSource } from '../datasource';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';

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

  viewsRouter.get('/posts/:postId([0-9]+)', async (req, res) => {
    const post = await BlogDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'userId')
      .where(`post.id = ${extractPostId(req)}`)
      .getOne();

    const comments = await BlogDataSource.getRepository(Comment)
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.post', 'postId')
      .innerJoinAndSelect('comment.user', 'userId')
      .where(`comment.postId = ${extractPostId(req)}`)
      .getMany();

    res.render('detailView', {
      post,
      comments,
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

const extractPostId = (req: Request) => {
  if (isNaN(Number(req.params.postId))) {
    throw new Error('Invalid post id');
  }

  return Number(req.params.postId);
};
