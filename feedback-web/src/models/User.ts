import mongoose,{Schema,Document} from "mongoose";

// typescript interface for message
export interface Message extends Document {
    content: string;
    createdAt: Date;
}
// create messageSchema of message schema type for type safety
const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required:true,
        default: Date.now(),
    }

})


export interface User extends Document {
    username: string;
    password: string;
    email: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date
    isAcceptingMessage : boolean;
    messages: Message[];
}

export const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [6,"password must be at least 6 characters"],
        trim: true,
    },
    email: {
        type: String,
        required:[true,"Email is required"],
        unique: true,
        trim: true,
        // regexr for validation
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    verifyCode: {
        type: String,
        required: [true,"Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true,"Verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]

})

// create user type model by mogoose through typescript
export const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;
