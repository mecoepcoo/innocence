import { ICategory } from './category';
import { ITag } from './tag';
export interface IPost {
  id: number,
  title: string,
  author: string,
  post_content: string,
  status: number,
  order: number,
  read_count: number,
  category: ICategory,
  tags: ITag[],
  created_at?: any,
  updated_at?: any,
  date?: {
    day: number,
    month: number,
    year: number,
  },
};