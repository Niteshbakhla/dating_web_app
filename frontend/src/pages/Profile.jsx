import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Heart, X, User, LogOut, MessageCircle } from 'lucide-react'; // Add MessageCircle
import { fetchProfiles, likeProfile, logout } from '@/api/profile';
import ProfileCard from '@/components/ui/common/Card';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


// Main Component with Profile List
export default function ProfileCardList() {
            const [showLogoutMenu, setShowLogoutMenu] = useState(false);
            const navigate = useNavigate();

            const { data: profiles, isLoading, error } = useQuery({
                        queryKey: ['profiles'],
                        queryFn: fetchProfiles
            });

            const handleLike = async (profile) => {
                        try {
                                    const data = await likeProfile(profile)

                                    toast.success(data.message)
                        } catch (error) {
                                    toast.error(error.response.data.message)
                        }
            };

            const handlePass = (profile) => {
                        console.log('Passed:', profile);
                        // Add your pass logic here
                        alert(`You passed on ${profile.name}`);
            };

            const handleUserIconClick = () => {
                        setShowLogoutMenu(!showLogoutMenu);
            };

            const handleLogout = async () => {
                        try {
                                    const data = await logout();
                                    toast.success(data.message)
                                    navigate("/")
                        } catch (error) {

                        }
            }

            // NEW: Handle navigate to matches page
            const handleViewMatches = () => {
                        navigate('/matches'); // Change this to your matches route
            };

            if (isLoading) {
                        return (
                                    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
                                                <div className="text-center">
                                                            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                                            <p className="text-gray-600 text-lg">Loading profiles...</p>
                                                </div>
                                    </div>
                        );
            }

            if (error) {
                        return (
                                    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
                                                <div className="text-center text-red-500">
                                                            <p className="text-xl font-semibold">Error loading profiles</p>
                                                            <p className="text-sm mt-2">{error.message}</p>
                                                </div>
                                    </div>
                        );
            }

            if (!profiles || profiles?.length === 0) {
                        return (
                                    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
                                                <div className="text-center">
                                                            <Heart className="w-20 h-20 text-pink-300 mx-auto mb-4" />
                                                            <p className="text-gray-600 text-xl font-semibold">No profiles available</p>
                                                            <p className="text-gray-500 mt-2">Check back later for new matches!</p>
                                                </div>
                                    </div>
                        );
            }

            return (
                        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                                    {/* Header */}
                                    <header className="bg-white shadow-sm sticky top-0 z-10">
                                                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                        <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                                                                        <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                                                                    LoveConnect
                                                                        </span>
                                                            </div>

                                                            {/* NEW: Right side with Matches button and User menu */}
                                                            <div className="flex items-center gap-3">
                                                                        {/* Matches Button */}
                                                                        <button
                                                                                    onClick={handleViewMatches}
                                                                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                                                                        >
                                                                                    <MessageCircle className="w-5 h-5" />
                                                                                    <span>Matches</span>
                                                                        </button>

                                                                        {/* User Menu */}
                                                                        <div className="relative">
                                                                                    <button
                                                                                                onClick={handleUserIconClick}
                                                                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                                                    >
                                                                                                <User className="w-6 h-6 text-gray-600" />
                                                                                    </button>

                                                                                    {/* Logout Dropdown Menu */}
                                                                                    {showLogoutMenu && (
                                                                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                                                                                            <button
                                                                                                                        onClick={handleLogout}
                                                                                                                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors text-gray-700"
                                                                                                            >
                                                                                                                        <LogOut className="w-5 h-5 text-red-500" />
                                                                                                                        <span className="font-medium">Logout</span>
                                                                                                            </button>

                                                                                                </div>
                                                                                    )}
                                                                        </div>
                                                            </div>
                                                </div>
                                    </header>
                                    {/* Profile Cards Grid */}
                                    <div className="max-w-7xl mx-auto px-4 py-8">
                                                <div className="mb-6 text-center">
                                                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Matches</h1>
                                                            <p className="text-gray-600">
                                                                        {profiles.length} {profiles.length === 1 ? 'profile' : 'profiles'} available
                                                            </p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                                                            {profiles.map((profile) => (
                                                                        <ProfileCard
                                                                                    key={profile._id}
                                                                                    profile={profile}
                                                                                    onLike={handleLike}
                                                                                    onPass={handlePass}
                                                                        />
                                                            ))}
                                                </div>
                                    </div>
                        </div>
            );
}