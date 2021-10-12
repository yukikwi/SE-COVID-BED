/* database/connection.ts
 *
 * This does a create connection to mongoose database.
 *
 * Created by Pachara Chantawong, 04 October 2021 as part of the SE COVID BED
 *
 * Revision 1.0 2021/10/04 17:54:00 pachara
 * initial DatabaseConnection with method getConnection: Boolean
 */

// load mongoose dependency
import mongoose from "mongoose";
// load data_struct and model
import { TUser } from "./data_struct/user";
import { UserModel, HospitalModel } from "./model/index";
// load dotenv for load environment variable from .env file
require("dotenv").config();

export default class Database {
  // class variable
  private mongoDbUri: string;

  constructor() {
    if (process.env.MONGODB_URI) {
      this.mongoDbUri = process.env.MONGODB_URI;
    } else {
      // if not specific MONGODB_URI then throw error.
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
      );
    }
  }

  // get database connection
  async connectDatabase() {
    // try connect to mongodb
    try {
      await mongoose.connect(this.mongoDbUri);
      return true;
    } catch (e) {
      console.log("mongoose: connection failed");
      console.log(e);
      return false;
    }
  }

  async getAUser(condition: TUser) {
    return await UserModel.findOne(condition);
  }

  async getHospitals() {
    return await HospitalModel.find({});
  }

  async editHospital(id: string, newdata: any) {
    return await HospitalModel.updateOne({ _id: id }, newdata);
  }

  async addHospital(newHospitalData: Object) {
    const newHospital = new HospitalModel(newHospitalData);
    return await newHospital.save();
  }
}
