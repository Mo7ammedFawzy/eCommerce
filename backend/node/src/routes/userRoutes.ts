import express from "express";
import {userController} from "../controllers/userController";

const router = express().router;

// PUT /api/users/:id → Update user (name, email, password)
router.put("/:id", userController.update)
//(Admin) DELETE /api/users/:id → Delete user
router.delete("/:id", userController.delete)
// (Admin) GET /api/users → List all users
router.delete("/", userController.listAllUsers)

export const userRouter = router;