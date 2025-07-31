import express from 'express';
import { apiRouter } from "./routes/appRouter.js";
import { UserServiceEmbeddedImpl } from "./services/UserServiceEmbeddedImpl.js";
import { UserController } from "./controllers/UserController.js";
import { PostServiceEmbeddedImpl } from "./services/PostServiceEmbeddedImpl.js";
import { PostController } from "./controllers/PostController.js";
export const service = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);
export const launchServer = () => {
    const app = express();
    app.listen(3005, () => console.log("Server runs at http://localhost:3005"));
    app.use('/api', apiRouter);
};
export const postService = new PostServiceEmbeddedImpl(service);
export const postController = new PostController(postService);
