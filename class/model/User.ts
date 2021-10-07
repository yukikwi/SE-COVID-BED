import mongoose, { Document, model, Model, Schema } from "mongoose"
import { IUser } from '../interface/user'

const UserSchema: Schema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})


export const UserModel: Model<IUser> = mongoose.models.User || model("User", UserSchema, "User")