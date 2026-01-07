import { Router } from "express";
import {
            createProfile,
            getMyProfile,
            getProfileByUserId,
            updateMyProfile,
            deleteMyProfile,
            getProfiles,
} from "../controllers/profileController.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router
            .route("/")
            .post(createProfile)
            .get(getProfiles)

router.route("/me")
            .get(getMyProfile)
            .put(updateMyProfile)
            .delete(deleteMyProfile);

router
            .route("/:userId")
            .get(getProfileByUserId);

router
            .route("/match")

export default router;
