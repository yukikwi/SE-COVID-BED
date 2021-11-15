import { TUser } from "./data_struct/user";
import { compare } from "bcrypt";
import Database from "./database";

class User {
  private user: TUser;
  private database: Database;

  constructor() {
    this.user = {};
    this.database = new Database();
  }

  getUser() {
    return this.user;
  }

  async loginFromToken(token: string){
    //query userData by username
    let userData = await this.database.getAUser({ token });
    //compare password
    if (userData && userData.password) {
      if(userData.role === "hospital"){
        const hospital = await this.database.getAHospitalByUser(userData._id)
        if(hospital){
          userData.hospitalId = hospital._id;
        }
      }
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
  }

  async login(username: string, password: string) {
    //query userData by username
    const userData = await this.database.getAUser({ username });
    //compare password
    if (userData && userData.password) {
      const isUser = await compare(password, userData.password);
      if (isUser) {
        if(userData.role === "hospital"){
          const hospital = await this.database.getAHospitalByUser(userData._id)
          if(hospital){
            userData.hospitalId = hospital._id;
          }
        }
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
  
  async getAllHospitalStaff() {
    try {
      const result = await this.database.getHospitalStaff();

      return {
        http: 200,
        data: result,
      };
    } catch (error) {
      return {
        http: 500,
        data: {
          error: "Fail to edit hospital",
        },
      };
    }
  }
}

export default User;
