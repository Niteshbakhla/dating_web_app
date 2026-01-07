import { Router } from "express"
import { authMe, googleAuth, logout } from "../controllers/authController.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/google").post(googleAuth);
router.route("/logout").post(logout);
router.route("/me").get(protect, authMe);

export default router;


