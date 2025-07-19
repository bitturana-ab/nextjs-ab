import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/verificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    emails:string,
    username:string,
    verifyCode:string,
):Promise<ApiResponse>{
    try {

        await resend.emails.send({
            from: "bittu@gmail.com",
            to:emails,
            subject:"Any ab | verification code",
            react:VerificationEmail({username,otp:verifyCode}),
        });

        return {success:true,message:"verification code send successfully."}
    } catch (emailError) {
        console.error("Error sending verification email.",emailError);
        return {success:false,message:"Failed to send verification email!"}
    }
};