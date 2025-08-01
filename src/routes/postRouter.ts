import express from "express";
import { postController } from "../server.js";

export const postRouter = express.Router();

postRouter.get("/", (req, res) => postController.getAllPosts(req, res));
postRouter.post("/", (req, res) => postController.addPost(req, res));
postRouter.delete("/", (req, res) => postController.removePost(req, res));
postRouter.put("/", (req, res) => postController.updatePost(req, res));
postRouter.get("/user", (req, res) => postController.getPostsByUserName(req, res));
