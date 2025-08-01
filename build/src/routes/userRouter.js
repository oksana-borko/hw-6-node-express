var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { userController } from "../server.js";
export const userRouter = express.Router();
// GET /api/users?id=122
userRouter.get('/', (req, res) => {
    if (req.query.id)
        userController.getUserById(req, res);
    else
        userController.getAllUsers(req, res);
});
// POST /api/users
userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.addUser(req, res);
}));
// DELETE /api/users?id=122
userRouter.delete('/', (req, res) => {
    userController.removeUser(req, res);
});
// PUT /api/users
userRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.updateUser(req, res);
}));
