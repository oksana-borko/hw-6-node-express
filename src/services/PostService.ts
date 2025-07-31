import { Post } from "../model/postTypes";

export interface PostService {
  getAllPosts(): Post[];
  getPostById(id: string): Post;
  addPost(post: Post): boolean;
  removePost(id: string): Post;
  updatePost(post: Post): void;
  getPostsByUserName(userName: string): Post[];
}
