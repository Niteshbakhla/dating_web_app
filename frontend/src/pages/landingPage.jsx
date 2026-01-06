import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


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

                                    await axios.post(
                                                `${import.meta.env.VITE_API_URL}/auth/google`,
                                                { idToken },
                                                { withCredentials: true }
                                    );


                                    // Redirect after successful login
                                    navigate("/profile")
                        } catch (error) {
                                    console.error("Google login failed", error);
                        }
            };



            return (
                        <div className="h-screen w-full bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center overflow-hidden">
                                    <div className="text-center px-4 max-w-2xl w-full">
                                                {/* Logo */}
                                                <div className="flex items-center justify-center gap-3 mb-10">
                                                            <svg
                                                                        width="48"
                                                                        height="48"
                                                                        viewBox="0 0 24 24"
                                                                        fill="#ec4899"
                                                                        stroke="#ec4899"
                                                                        strokeWidth="2"
                                                            >
                                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                            </svg>
                                                            <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                                                        LoveConnect
                                                            </span>
                                                </div>

                                                {/* Headline */}
                                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                                            Where Real Connections
                                                            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                                                        Begin
                                                            </span>
                                                </h1>

                                                {/* Subheadline */}
                                                <p className="text-xl text-gray-600 mb-12">
                                                            Join thousands of singles finding meaningful relationships
                                                </p>

                                                {/* ✅ Google Sign In Button (Rendered by Google) */}
                                                <div className="flex justify-center">
                                                            <div id="google-btn"></div>
                                                </div>

                                                <p className="text-sm text-gray-500 mt-6">
                                                            Free to join • No credit card required
                                                </p>
                                    </div>
                        </div>
            );
}
