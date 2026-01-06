import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
            userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                        unique: true
            },
            name: {
                        type: String,
                        required: true,
                        lowercase: true,
                        trim: true
            },
            bio: {
                        type: String,
                        required: true,
                        trim: true,
                        maxlength: 500
            },
            userImage: {
                        type: String,
                        required: true,
            }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;