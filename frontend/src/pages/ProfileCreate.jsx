import { createProfile } from "@/api/profile";
import {
            Box,
            Button,
            TextField,
            Typography,
            Avatar
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function CreateProfile() {
            const fileInputRef = useRef(null);
            const navigate = useNavigate();

            const [profileData, setProfileData] = useState({
                        name: "",
                        bio: "",
                        userImage: ""
            });

            const handleImageClick = () => {
                        fileInputRef.current.click();
            }

            const handleChange = (e) => {
                        const { name, value } = e.target;
                        setProfileData(prev => ({ ...prev, [name]: value }));
            }

            const handleImage = (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const userImage = URL.createObjectURL(file);
            
                        setProfileData(prev => ({ ...prev, userImage }))
            }

            const createUserProfile = useMutation({
                        mutationFn: createProfile,
                        onSuccess: (data) => {
                                    toast.success(data.message);
                                    navigate("/profile");

                        },
                        onError: (error) => {
                                    console.error("Error creating profile", error);
                                    toast.error(error.response.data?.message);
                                    setProfileData({ name: "", bio: "" })
                        },
            });



            return (
                        <Box
                                    sx={{
                                                minHeight: "100vh",
                                                background: "linear-gradient(135deg, #fff1f2, #ffe4e6)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                px: 2,
                                    }}
                        >
                                    <Box
                                                sx={{
                                                            width: "100%",
                                                            maxWidth: 420,
                                                            backgroundColor: "#fff",
                                                            borderRadius: 3,
                                                            p: 4,
                                                            boxShadow: 3,
                                                }}
                                    >
                                                {/* Title */}
                                                <Typography
                                                            variant="h5"
                                                            fontWeight="bold"
                                                            textAlign="center"
                                                            mb={3}
                                                            sx={{ color: "#e11d48" }}
                                                >
                                                            Create Your Profile
                                                </Typography>

                                                {/* Profile Image */}
                                                <Box sx={{ textAlign: "center", mb: 3 }}>
                                                            <Avatar
                                                                        sx={{
                                                                                    width: 96,
                                                                                    height: 96,
                                                                                    margin: "0 auto",
                                                                                    bgcolor: "#fda4af",
                                                                        }}
                                                            />
                                                            <Button
                                                                        onClick={handleImageClick}
                                                                        variant="text"
                                                                        sx={{ mt: 1, color: "#e11d48" }}
                                                            >
                                                                        Upload Photo
                                                            </Button>
                                                            <input
                                                                        type="file"
                                                                        name="userImage"
                                                                        accept="image/*"
                                                                        ref={fileInputRef}
                                                                        style={{ display: "none" }}
                                                                        onChange={handleImage}
                                                            />
                                                </Box>

                                                {/* Name */}
                                                <TextField
                                                            label="Name"
                                                            fullWidth
                                                            margin="normal"
                                                            name="name"
                                                            value={profileData.name}
                                                            onChange={handleChange}
                                                />

                                                {/* Bio */}
                                                <TextField
                                                            label="Bio"
                                                            multiline
                                                            rows={4}
                                                            fullWidth
                                                            margin="normal"
                                                            helperText="Max 500 characters"
                                                            name="bio"
                                                            value={profileData.bio}
                                                            onChange={handleChange}
                                                />

                                                {/* Submit Button */}
                                                <Button
                                                            onClick={() => createUserProfile.mutate(profileData)}
                                                            fullWidth
                                                            size="large"
                                                            variant="contained"
                                                            sx={{
                                                                        mt: 3,
                                                                        backgroundColor: "#e11d48",
                                                                        "&:hover": {
                                                                                    backgroundColor: "#be123c",
                                                                        },
                                                            }}
                                                >
                                                            Create Profile
                                                </Button>
                                    </Box>
                        </Box>
            );
}
