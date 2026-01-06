import { Heart, X } from 'lucide-react';

export default function ProfileCard({ profile, onLike, onPass }) {
            if (!profile) return null;

            return (
                        <div className="w-full max-w-sm">
                                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                                                {/* Profile Image */}
                                                <div className="relative h-80">
                                                            <img
                                                                        src={profile.userImage}
                                                                        alt={profile.name}
                                                                        className="w-full h-full object-cover"
                                                            />

                                                            {/* Gradient Overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                                            {/* Profile Info Overlay */}
                                                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                                                        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg capitalize">
                                                                                    {profile.name}
                                                                        </h3>
                                                                        <p className="text-sm leading-relaxed opacity-95 line-clamp-3 drop-shadow-md">
                                                                                    {profile.bio}
                                                                        </p>
                                                            </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="p-5 bg-gradient-to-b from-white to-gray-50">
                                                            <div className="flex items-center justify-center gap-6">
                                                                        {/* Pass Button */}
                                                                        <button
                                                                                    onClick={() => onPass(profile)}
                                                                                    className="group p-4 bg-white border-2 border-gray-200 rounded-full shadow-md hover:shadow-lg hover:scale-110 hover:border-red-300 transition-all duration-300"
                                                                                    aria-label="Pass"
                                                                        >
                                                                                    <X className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-all" />
                                                                        </button>

                                                                        {/* Like Button */}
                                                                        <button
                                                                                    onClick={() => onLike(profile)}
                                                                                    className="group p-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-md hover:shadow-xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300"
                                                                                    aria-label="Like"
                                                                        >
                                                                                    <Heart className="w-8 h-8 text-white fill-white group-hover:scale-110 transition-transform" />
                                                                        </button>
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            );
}
