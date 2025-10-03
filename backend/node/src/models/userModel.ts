import {Document, model, Schema} from "mongoose";
import {Roles} from "../utils/constants/common";

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  roles: Roles[],
  isVerified: boolean,
  refreshTokens: string[],
  resetTokenHash: string,
  resetExpires: Date,
  verifyTokenHash: string,
  createdAt: Date,
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: Object.values(Roles),
    default: [Roles.User]
  },
  isVerified: {type: Boolean, default: false},
  refreshTokens: [{type: String}],
  resetTokenHash: {type: String},
  resetExpires: {type: Date},
  verifyTokenHash: {type: String}
}, {timestamps: true})

export const User = model<IUser>("User", userSchema);



