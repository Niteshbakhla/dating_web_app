import { OAuth2Client } from "google-auth-library";
import config from "../config/config.js";

const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const verifyGoogleIdToken = async (idToken) => {
            const ticket = await client.verifyIdToken({
                        idToken,
                        audience: GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();
            return payload;
}

