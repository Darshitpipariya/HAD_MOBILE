import axios from 'axios';
import { BASE_URL } from './config';



export async function loginhttp(username, password) {
    try {
        const response = await axios.post(
                `${BASE_URL}/common/login`,
                {
                    "loginId": username,
                    "password": password
                },
                {
                    timeout: 4000,
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
            )
        return response;
    } catch (error) {
        console.log("LOGIN ERROR ",error);
        throw error;
    }

}

export async function syncFollowUps(followUpList, userTocken) {
    console.log("Followups to Upload ", JSON.stringify(followUpList));
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

export async function getOtp(loginId){
    try{
        const response=await axios.get(
            `${BASE_URL}/blackbox/getOtp?loginId=${loginId}`,
            {
                timeout:10000,
            }
        )
        console.log("GET OTP RESPONSE "+JSON.stringify(response));
        return response;
    }
    catch(error){
        console.log(JSON.stringify(error));
        if(error.response){
            console.log(" GET OTP invalid user "+JSON.stringify(error.response))
        }else{
            console.log("GET OTP SERVER UNREACHBLE");
        }
        console.log("");
        throw error;
    }
}

export async function validateOtp(loginId,otp){
    try {
        const response=axios.post(
            `${BASE_URL}/blackbox/validateOtp`,
            {
                'loginId':loginId,
                'otp':otp
            },
            {
                timeout: 10000,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        console.log("Validate response "+JSON.stringify(response));
        return response;
    } catch (error) {
        
        console.log("validateOtp ERROR"+JSON.stringify(error));
        throw error;
    }
}

export async function resetPassword(loginId,password,secret){
    try {
        const response=axios.post(
            `${BASE_URL}/blackbox/resetPassword`,
            {
                'loginId':loginId,
                'password':password,
            },
            {
                timeout: 10000,
                headers: {
                    'secret': secret,
                    'Content-Type': 'application/json'
                },
            }
            
        )
        console.log("resetPassword "+JSON.stringify(response));
        return response;
    } catch (error) {
        console.log("resetPassword ERROR "+JSON.stringify(error));
        throw error;
    }
}