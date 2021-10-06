import mongoose, { Document, model, Model, Schema } from "mongoose"

export interface IUser extends Document {
  username?: string,
  password?: string
}

const UserSchema: Schema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})


export const User: Model<IUser> = mongoose.models.User || model("User", UserSchema, "User")