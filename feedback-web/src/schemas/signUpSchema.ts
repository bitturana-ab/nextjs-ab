import {z} from 'zod';
import { email } from 'zod/v4';

// This schema validates the username for a sign-up form
export const usernameValidation = 
    z.string()
    .min(3,"Username must be at least 3 characters long")
    .max(20,"Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");

export const signUpSchema = z.object({
        username: usernameValidation,
        email: z.string().email({message:"enter a valid email"}),
        password: z.string().min(6,{message:"password must be at least 6 characters long"}),
    })