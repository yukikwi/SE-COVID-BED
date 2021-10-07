import { TUser } from './interface/user'
import { UserModel } from './model/User'
import { compare } from "bcrypt";

class User {
  private user:TUser

  constructor () {
    this.user = {}
  }

  getUser() {
    return this.user
  }

  async login(username:string, password:string){
    //query userData by username
    const userData = await UserModel.findOne({ username });
    //compare password
    if (userData && userData.password) {
      const isUser = await compare(password, userData.password);
      if (isUser) {
        this.user = userData
      } else {
        return { error: "fail to login" }
      }
    } else {
      return { error: "username not found" }
    }
  }
}

export default User
// export const User: Model<IUser> = mongoose.models.User || model("User", UserSchema, "User")