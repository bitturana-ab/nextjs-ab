import {z} from 'zod'

export const signInSchema = z.object({
    // email or username is as identifier name
    identifier: z.string(),
    password: z.string(),
    
})