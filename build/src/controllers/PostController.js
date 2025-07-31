var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseBody } from "../utils/tools.js";
import { baseUrl } from "../config/userServerConfig.js";
export class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getAllPosts(req, res) {
        const url = new URL(req.url, baseUrl);
        const postId = url.searchParams.get("postId");
        if (postId) {
            try {
                const post = this.postService.getPostById(postId);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(post));
            }
            catch (e) {
                res.writeHead(404).end("Post not found");
            }
        }
        else {
            const result = this.postService.getAllPosts();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        }
    }
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield parseBody(req);
            const isSuccess = this.postService.addPost(body);
            if (isSuccess) {
                res.writeHead(201).end("Created");
            }
            else {
                res.writeHead(409).end("Post already exists");
            }
        });
    }
    removePost(req, res) {
        const url = new URL(req.url, baseUrl);
        const postId = url.searchParams.get("postId");
        if (!postId) {
            res.writeHead(400).end("Missing postId");
            return;
        }
        try {
            const removed = this.postService.removePost(postId);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(removed));
        }
        catch (e) {
            res.writeHead(404).end("Post not found");
        }
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield parseBody(req);
            try {
                this.postService.updatePost(body);
                res.writeHead(200).end("Updated");
            }
            catch (e) {
                res.writeHead(404).end("Post not found");
            }
        });
    }
    getPostsByUserName(req, res) {
        const url = new URL(req.url, baseUrl);
        const userName = url.searchParams.get("userName");
        if (!userName) {
            res.writeHead(400).end("Missing userName");
            return;
        }
        try {
            const posts = this.postService.getPostsByUserName(userName);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(posts));
        }
        catch (e) {
            res.writeHead(404).end("User not found");
        }
    }
}
