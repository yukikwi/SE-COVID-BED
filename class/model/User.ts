import mongoose, { Document, model, Model, Schema } from "mongoose"
import { IUser } from '../data_struct/user'

// create mongoose.schema
const UserSchema: Schema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})

// create mongoose.model
export const UserModel: Model<IUser> = mongoose.models.User || model("User", UserSchema, "User")