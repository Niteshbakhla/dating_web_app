import { Router } from "express";
import authRoutes from "./authRoutes.js"
import profileRoutes from "./profileRoutes.js"
import likesRoutes from "./likesRoutes.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/likes", likesRoutes);

export default router;