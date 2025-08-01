import express from "express";
import { userController } from "../server.js";

export const userRouter = express.Router();

// GET /api/users?id=122
userRouter.get('/', (req, res) => {
    if (req.query.id) userController.getUserById(req, res);
    else userController.getAllUsers(req, res);
});

// POST /api/users
userRouter.post('/', async (req, res) => {
    await userController.addUser(req, res);
});

// DELETE /api/users?id=122
userRouter.delete('/', (req, res) => {
    userController.removeUser(req, res);
});

// PUT /api/users
userRouter.put('/', async (req, res) => {
    await userController.updateUser(req, res);
});
