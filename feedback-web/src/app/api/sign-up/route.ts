import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

import bcrypt from 'bcryptjs';

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request:Request){
    await dbConnect();

    try {
        const {username,email,password} = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerifiedByUsername){
            return Response.json(
                {
                    success:false,
                    message:"Username is already taken!"
                },
                {
                    status:400
                }
            )
        }
        const existUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000+Math.random()*900000).toString();

        if(existUserByEmail){
            if (existUserByEmail.isVerified) {
                return Response.json(
                {
                    success:false,
                    message:"User already exist with this email"
                },
                {status:400}
            )
            }
            else{
                const hashPassword = await bcrypt.hash(password,10);
                // update password if forgot
                existUserByEmail.password = hashPassword;
                existUserByEmail.verifyCode = verifyCode;
                existUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
                await existUserByEmail.save();
                // and go to sendVerification email code auto after else part
            }
        }
        else{
            const hashPassword = await bcrypt.hash(password,10);

            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1);

            const newUser = new UserModel({
                username,
                password:hashPassword,
                email,
                verifyCode,
                isVerified: false,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessage : true,
                messages: []
            })

            await newUser.save();
        }

        // sending verification email by resend email api
        const emailResponse = await sendVerificationEmail(
            email,username,verifyCode,
        )
        // success res by resend email api
        if(!emailResponse.success){
            return Response.json(
                {
                    success:false,
                    // message by resend email
                    message:emailResponse.message
                },
                {status:500}
            )
        }

        return Response.json(
            {
                success:true,
                message:"User registered successfully. Please verify your email."
            },{status:201}
        )


    } catch (error) {
        console.error("Error registering user",error)
        return Response.json(
            {
                success:false,
                message:"Error registering user"
            },
            {status:500}
        )
    }
}