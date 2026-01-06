import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
            likedBy: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true
            },
            likedTo: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true
            }
}, { timestamps: true });


const Like = mongoose.model("Liked", likeSchema);
export default Like;