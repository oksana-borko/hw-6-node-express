import { Post } from "../model/postTypes.js";
import { PostService } from "./PostService.js";
import { UserService } from "./UserService.js";

export class PostServiceEmbeddedImpl implements PostService {
  private posts: Post[] = [];

  constructor(private userService: UserService) {}

  getAllPosts(): Post[] {
    return [...this.posts];
  }

  getPostById(id: string): Post {
    const post = this.posts.find(p => p.id === id);
    if (!post) throw "404";
    return post;
  }

  addPost(post: Post): boolean {
    if (this.posts.findIndex(p => p.id === post.id) === -1) {
      this.posts.push(post);
      return true;
    }
    return false;
  }

  removePost(id: string): Post {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) throw "404";
    const removed = this.posts[index];
    this.posts.splice(index, 1);
    return removed;
  }

  updatePost(newPost: Post): void {
    const index = this.posts.findIndex(p => p.id === newPost.id);
    if (index === -1) throw "404";
    this.posts[index] = newPost;
  }

  getPostsByUserName(userName: string): Post[] {
    const user = this.userService.getAllUsers()
        .find(u => u.userName === userName);
    if (!user) throw "404";
    return this.posts.filter(p => p.userId === String(user.id));
  }
}
