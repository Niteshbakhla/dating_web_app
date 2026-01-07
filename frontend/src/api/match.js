import api from "./axios"


export const fetchMatchUser = async () => {
            const { data } = await api.get("/matches")
            return data;
}