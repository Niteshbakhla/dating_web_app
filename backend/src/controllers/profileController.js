import asyncHandler from "../middlewares/asyncHandler.js";
import {
            createProfileService, getMyProfileService, getProfileByUserIdService, updateProfileService, deleteProfileService, getProfilesService,
} from "../services/profileService.js";

export const createProfile = asyncHandler(async (req, res) => {
            const profile = await createProfileService(req.user.id, req.body);

            res.status(201).json({
                        success: true,
                        message: "Profile created successfully",
                        profile,
            });
});

export const getMyProfile = asyncHandler(async (req, res) => {
            const profile = await getMyProfileService(req.user.id);

            res.status(200).json({
                        success: true,
                        message: "Profile fetched successfully",
                        profile,
            });
});

export const getProfileByUserId = asyncHandler(async (req, res) => {
            const profile = await getProfileByUserIdService(req.params.userId);

            res.status(200).json({
                        success: true,
                        message: "Profile fetched successfully",
                        profile,
            });
});

export const updateMyProfile = asyncHandler(async (req, res) => {
            const profile = await updateProfileService(req.user.id, req.body);

            res.status(200).json({
                        success: true,
                        message: "Profile updated successfully",
                        profile,
            });
});

export const deleteMyProfile = asyncHandler(async (req, res) => {
            await deleteProfileService(req.user.id);

            res.status(200).json({
                        success: true,
                        message: "Profile deleted successfully",
            });
});


export const getProfiles = asyncHandler(async (req, res) => {
            const profiles = await getProfilesService(req.user.id);

            res.status(200).json({
                        success: true,
                        profiles,
            });
});