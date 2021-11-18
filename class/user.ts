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

  //Method for get user information.
  getUser() {
    return this.user;
  }

  //Method for automatic login using token.
  async loginFromToken(token: string){
    //Get user information by token.
    let userData = await this.database.getAUser({ token });

    if (userData && userData.password) {
      if(userData.role === "hospital"){
        
        //Get hospital data that this user has been staff.
        const hospital = await this.database.getAHospitalByUser(userData._id)
        
        //Check that staff has been assign to some hospital to protect error then add to user data.
        if(hospital){
          userData.hospitalId = hospital._id;
        }
      }
      this.user = userData;
      return {
        //When login is successful return status 200, code message and user data.
        http: 200,
        data: {
          code: "Success",
          userData,
        },
      };
    } else {
      return {
        //When login is fail return status 401 and error message.
        http: 401,
        data: {
          error: "fail to login",
        },
      };
    }
  }

  //Method for login 
  async login(username: string, password: string) {
    
    //query userData by username
    const userData = await this.database.getAUser({ username });

    //compare password
    if (userData && userData.password) { //if username is available in database
      
      //compare password with hash password in database
      const isUser = await compare(password, userData.password);

      if (isUser) {//if password and username are correct
        if(userData.role === "hospital"){//if this username are hospital username

          //get hospital data by id of hospital
          const hospital = await this.database.getAHospitalByUser(userData._id)
          if(hospital){
            //change hospitalId to _id
            userData.hospitalId = hospital._id;
          }
        }

        //change data in user
        this.user = userData;
        return {
          //when login successful return status 200 and userData
          http: 200,
          data: {
            code: "Success",
            userData,
          },
        };
      } else { //if this username are system admin username

        return {
          //When login fail return status 401 and error message.
          http: 401,
          data: {
            error: "fail to login",
          },
        };
      }
    } else {//if password and username are incorrect
      return {
        //When login fail return status 404 and error message.
        http: 404,
        data: {
          error: "username not found",
        },
      };
    }
  }
  
  //Method for get all hospital staff
  async getAllHospitalStaff() {
    try {

      //Get all hospital staff form database with database class.
      const result = await this.database.getHospitalStaff();

      return {

        //When get hospital staff data successful return status 200 and staff data.
        http: 200,
        data: result,
      };
    } catch (error) {
      return {
        //When get phospital staff failed return status 500 and error message.
        http: 500,
        data: {
          error: "Fail to edit hospital",
        },
      };
    }
  }
}

export default User;
