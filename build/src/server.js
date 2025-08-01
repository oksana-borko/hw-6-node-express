var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { apiRouter } from "./routes/appRouter.js";
import { UserServiceEmbeddedImpl } from "./services/UserServiceEmbeddedImpl.js";
import { UserController } from "./controllers/UserController.js";
import { PostServiceEmbeddedImpl } from "./services/PostServiceEmbeddedImpl.js";
import { PostController } from "./controllers/PostController.js";
export const service = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);
export const postService = new PostServiceEmbeddedImpl(service);
export const postController = new PostController(postService);
export const launchServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield service.restoreDataFromFile();
    const app = express();
    app.listen(3005, () => console.log("Server runs at http://localhost:3005"));
    app.use('/api', apiRouter);
});
launchServer();
