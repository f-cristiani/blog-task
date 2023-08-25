import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';

export const BlogDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'blog',
  entities: [User, Post],
  synchronize: true,
  logging: false,
});
