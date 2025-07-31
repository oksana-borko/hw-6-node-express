import { IncomingMessage, ServerResponse } from "node:http";
import { PostService } from "../services/PostService.js";
import { parseBody } from "../utils/tools.js";
import { baseUrl } from "../config/userServerConfig.js";
import { Post } from "../model/postTypes.js";

export class PostController {
  constructor(private postService: PostService) {}

  getAllPosts(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url!, baseUrl);
    const postId = url.searchParams.get("postId");
    if (postId) {
      try {
        const post = this.postService.getPostById(postId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(post));
      } catch (e) {
        res.writeHead(404).end("Post not found");
      }
    } else {
      const result = this.postService.getAllPosts();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }
  }

  async addPost(req: IncomingMessage, res: ServerResponse) {
    const body = await parseBody<Post>(req);
    const isSuccess = this.postService.addPost(body);
    if (isSuccess) {
      res.writeHead(201).end("Created");
    } else {
      res.writeHead(409).end("Post already exists");
    }
  }

  removePost(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url!, baseUrl);
    const postId = url.searchParams.get("postId");
    if (!postId) {
      res.writeHead(400).end("Missing postId");
      return;
    }
    try {
      const removed = this.postService.removePost(postId);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(removed));
    } catch (e) {
      res.writeHead(404).end("Post not found");
    }
  }

  async updatePost(req: IncomingMessage, res: ServerResponse) {
    const body = await parseBody<Post>(req);
    try {
      this.postService.updatePost(body);
      res.writeHead(200).end("Updated");
    } catch (e) {
      res.writeHead(404).end("Post not found");
    }
  }

  getPostsByUserName(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url!, baseUrl);
    const userName = url.searchParams.get("userName");
    if (!userName) {
      res.writeHead(400).end("Missing userName");
      return;
    }
    try {
      const posts = this.postService.getPostsByUserName(userName);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(posts));
    } catch (e) {
      res.writeHead(404).end("User not found");
    }
  }
}
