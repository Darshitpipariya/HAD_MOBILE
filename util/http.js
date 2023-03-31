import axios from 'axios';
import { BASE_URL } from './config';

const axoisOpen = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': "application/json"
    }
}
)


export async function loginhttp(username, password) {
    try {
        const response = await axoisOpen
            .post(
                '/common/login',
                {
                    "loginId": username,
                    "password": password
                },
                {
                    timeout: 4000,
                }
            )
        return response;
    } catch (error) {
        console.log("LOGIN ERROR ",error);
        throw error;
    }

}

export async function syncFollowUps(followUpList, userTocken) {
    try {
        const response = await axios.post(
            `${BASE_URL}/fhw/sync`,
            {
                "followUps":followUpList,
            },
            {
                timeout: 10000,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userTocken}`
                }
            },
        )
        console.log(JSON.stringify(response));
        return response;
    } catch (error) {
        console.log("SERVER "+JSON.stringify(error));
        throw error;
    }
}
