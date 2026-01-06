import Profile from "../models/profileModel.js";
import CustomError from "../utilis/customError.js";


export const createProfileService = async (userId, data) => {
            const existingProfile = await Profile.findOne({ userId });
            if (existingProfile) {
                        throw new CustomError("Profile already exists", 409);
            }


            return await Profile.create({
                        userId,
                        ...data,
            });
};

export const getMyProfileService = async (userId) => {
            const profile = await Profile.findOne({ userId });
            if (!profile) {
                        throw new CustomError("Profile not found", 404);
            }

            return profile;
};

export const getProfileByUserIdService = async (userId) => {
            const profile = await Profile.findOne({ userId });
            if (!profile) {
                        throw new CustomError("Profile not found", 404);
            }

            return profile;
};

export const updateProfileService = async (userId, updates) => {
            const updatedProfile = await Profile.findOneAndUpdate(
                        { userId },
                        updates,
                        {
                                    new: true,
                                    runValidators: true,
                        }
            );

            if (!updatedProfile) {
                        throw new CustomError("Profile not found", 404);
            }

            return updatedProfile;
};


export const deleteProfileService = async (userId) => {
            const profile = await Profile.findOneAndDelete({ userId });
            if (!profile) {
                        throw new CustomError("Profile not found", 404);
            }

            return;
};




export const getProfilesService = async (userId) => {
            const data = await Profile.find()
            console.log(data)
            return data;
            // return await Profile.find({
            //             userId: { $ne: userId }, 
            // }).select("name bio userImage");
};
