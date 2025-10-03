import express from "express";
import {authController} from "../controllers/authController";

const router = express().router;

// POST /api/auth/register → Register new user
router.post("/register", authController.register)
// POST /api/auth/login → Login user, return token
router.post("/login", authController.login)
// GET /api/auth/me → Get logged-in user profile
router.get("/me", authController.getCurrentUser)
//post refresh
router.post("/refresh", authController.refresh)
//post Logout
router.post("/logout", authController.logout)
//post Logout
router.post("/forgot", authController.logout)
//post Logout
router.post("/reset", authController.logout)
//post Logout
router.post("/update", authController.logout)
//post Logout
router.post("/verify/:token", authController.logout)

export const authRouter = router;