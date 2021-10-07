import { TUser } from "./data_struct/user";
import { compare } from "bcrypt";
import DatabaseConnection from "./connection";

class User {
  private user: TUser;
  private database: DatabaseConnection;

  constructor() {
    this.user = {};
    this.database = new DatabaseConnection();
  }

  getUser() {
    return this.user;
  }

  async login(username: string, password: string) {
    //query userData by username
    const userData = await this.database.getAUser({ username });
    //compare password
    if (userData && userData.password) {
      const isUser = await compare(password, userData.password);
      if (isUser) {
        this.user = userData;
        return {
          http: 200,
          data: {
            code: "Success",
            userData,
          },
        };
      } else {
        return {
          http: 401,
          data: {
            error: "fail to login",
          },
        };
      }
    } else {
      return {
        http: 404,
        data: {
          error: "username not found",
        },
      };
    }
  }
}

export default User;
