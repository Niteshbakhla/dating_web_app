import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { googleAuthLogin } from "@/api/profile";
import toast from "react-hot-toast";

export default function DatingLandingPage() {
            const navigate = useNavigate();

            useEffect(() => {
                        if (!window.google) return;

                        google.accounts.id.initialize({
                                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                                    callback: handleGoogleResponse,
                        });

                        google.accounts.id.renderButton(
                                    document.getElementById("google-btn"),
                                    {
                                                theme: "outline",
                                                size: "large",
                                                shape: "pill",
                                    }
                        );
            }, []);

            const handleGoogleResponse = async (response) => {
                        try {
                                    const idToken = response.credential;

                                    const data = await googleAuthLogin(idToken);
                                    toast.success(data.message)

                                    if (data.hasProfile) navigate("/profile")
                                    else navigate("/create-profile");
                        } catch (error) {
                                    console.error(
                                                "Google login failed",
                                                error.response || error.message || error
                                    );
                        }
            };

            return (
                        <Box
                                    sx={{
                                                height: "100vh",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background:
                                                            "linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #faf5ff 100%)",
                                                overflow: "hidden",
                                    }}
                        >
                                    <Box
                                                sx={{
                                                            textAlign: "center",
                                                            px: 2,
                                                            maxWidth: 700,
                                                            width: "100%",
                                                }}
                                    >
                                               
                                                <Box
                                                            sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        gap: 2,
                                                                        mb: 6,
                                                            }}
                                                >
                                                            <Box
                                                                        component="svg"
                                                                        width={48}
                                                                        height={48}
                                                                        viewBox="0 0 24 24"
                                                                        fill="#ec4899"
                                                            >
                                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                            </Box>

                                                            <Typography
                                                                        variant="h4"
                                                                        fontWeight="bold"
                                                                        sx={{
                                                                                    background: "linear-gradient(90deg, #ec4899, #9333ea)",
                                                                                    WebkitBackgroundClip: "text",
                                                                                    WebkitTextFillColor: "transparent",
                                                                        }}
                                                            >
                                                                        LoveConnect
                                                            </Typography>
                                                </Box>

                                           
                                                <Typography
                                                            variant="h2"
                                                            fontWeight="bold"
                                                            sx={{ mb: 3, lineHeight: 1.1 }}
                                                >
                                                            Where Real Connections
                                                            <Box
                                                                        component="span"
                                                                        sx={{
                                                                                    display: "block",
                                                                                    background: "linear-gradient(90deg, #ec4899, #9333ea)",
                                                                                    WebkitBackgroundClip: "text",
                                                                                    WebkitTextFillColor: "transparent",
                                                                        }}
                                                            >
                                                                        Begin
                                                            </Box>
                                                </Typography>

                                          
                                                <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
                                                            Join thousands of singles finding meaningful relationships
                                                </Typography>

                                            
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                            <Box id="google-btn" />
                                                </Box>

                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                                                            Free to join • No credit card required
                                                </Typography>
                                    </Box>
                        </Box>
            );
}
