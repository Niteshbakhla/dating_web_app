import api from "./axios";


export const fetchMessages = async (matchId) => {
            const res = await api.get(`/messages/${matchId}`);
            return res.data;
};

export const sendMessage = () => {

}