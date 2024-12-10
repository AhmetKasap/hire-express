import mongoose, { Schema, Document, Types } from "mongoose";
import { UserEntity } from "../entities/UserEntity";



const UserSchema: Schema = new Schema<UserEntity>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model<UserEntity>("User", UserSchema);
