import mongoose,{Schema,Document} from "mongoose";

// typesript interface for message
export interface Message extends Document {
    content: string;
    createdAt: Date;
}
// create messageSchema of message schema type
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
    message: Message[];
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
        required: [true,"password is required"],
        minlength: [6,"password must be at least 6 characters"],
        trim: true,
    },
    email: {
        type: String,
        required:[true,"email is required"],
        unique: true,
        trim: true,
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
    message: [MessageSchema]

})


export const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;
