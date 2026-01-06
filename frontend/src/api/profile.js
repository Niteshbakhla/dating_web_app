import api from "./axios";

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