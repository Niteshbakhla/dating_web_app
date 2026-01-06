import { Router } from "express"
import { googleAuth, logout } from "../controllers/authController.js";

const router = Router();

router.route("/google").post(googleAuth);
router.route("/logout").post(logout);

export default router;


