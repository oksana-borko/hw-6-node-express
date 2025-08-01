import express from 'express';
import { apiRouter } from "./routes/appRouter.js";
import { UserService } from "./services/UserService.js";
import { UserServiceEmbeddedImpl } from "./services/UserServiceEmbeddedImpl.js";
import { UserController } from "./controllers/UserController.js";
import { PostServiceEmbeddedImpl } from "./services/PostServiceEmbeddedImpl.js";
import { PostController } from "./controllers/PostController.js";


export const service: UserService = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);
export const postService = new PostServiceEmbeddedImpl(service);
export const postController = new PostController(postService);


export const launchServer = async () => {

    await (service as UserServiceEmbeddedImpl).restoreDataFromFile();

    const app = express();
    app.listen(3005, () => console.log("Server runs at http://localhost:3005"));
    app.use('/api', apiRouter);
};


launchServer();
