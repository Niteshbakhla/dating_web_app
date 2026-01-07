import { Router } from "express";
import { findMatches } from "../controllers/matchController.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);
router.route("/").get(findMatches);

export default router;