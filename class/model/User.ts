import mongoose, { model, Model, Schema } from "mongoose"
import { IUser } from '../data_struct/user'


const UserSchema: Schema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
  role: {
    type: String
  }
})


export const UserModel: Model<IUser> = mongoose.models.User || model("User", UserSchema, "User")