import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { likeProfile } from "../controllers/likeController.js";

const router = Router();

router.route("/").post(protect, likeProfile)


export default router;