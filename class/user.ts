import { TUser } from './data_struct/user'
import { UserModel } from './model/index'
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
        return {
          http: 200,
          data: {
            code: "Success",
            userData
          }
        }
      } else {
        return {
          http: 401,
          data: {
            error: "fail to login"
          }
        }
      }
    } else {
      return {
        http: 404,
        data: {
          error: "username not found"
        }
      }
    }
  }
}

export default User