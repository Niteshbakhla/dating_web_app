import api from "./axios";

export const googleAuthLogin = async (idToken) => {
            const { data } = await api.post("/auth/google", { idToken })
            return data;
}

export const fetchProfiles = async () => {
            const { data } = await api.get("/profile");
            return data.profiles;
};

export const logout = async () => {
            const { data } = await api.post("/auth/logout");
            return data;
}


export const likeProfile = async (profile) => {

            const { data } = await api.post("/likes", { likedTo: profile.userId })
            console.log(data);
            return data
}

export const createProfile = async (profileData) => {
            const { data } = await api.post("/profile", profileData);
            return data;
}

export const fetchMe = async () => {
            const { data } = await api.get("/auth/me");
            return data;
}