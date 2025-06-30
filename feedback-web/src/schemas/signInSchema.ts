import {z} from 'zod'

export const signInSchema = z.object({
    // email or username is identifier
    identifier: z.string(),
    password: z.string(),
    
})