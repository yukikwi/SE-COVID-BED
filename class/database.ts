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
import {
  UserModel,
  HospitalModel,
  PatientModel,
  PatientSeverityLogModel,
} from "./model/index";
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

  async getHospitals(condition = {}) {
    return await HospitalModel.find(condition).populate("staff", {
      password: 0,
      token: 0,
    });
  }

  async getAHospital(id: string) {
    return await HospitalModel.findById(id).populate("staff", {
      password: 0,
      token: 0,
    });
  }

  async addHospital(newHospitalData: Object) {
    const newHospital = new HospitalModel(newHospitalData);
    try {
      return await newHospital.save();
    } catch (e) {
      return 500;
    }
  }

  async deleteHospital(id: string) {
    try {
      let getHospitalData = await this.getAHospital(id);
      if (!getHospitalData) return 404;
      else return await HospitalModel.findByIdAndUpdate(id, { isDelete: true });
    } catch (e) {
      return 500;
    }
  }

  async editHospital(id: string, newData: Object) {
    return await HospitalModel.findByIdAndUpdate(id, newData, { upsert: true });
  }

  async getPatients() {
    return await PatientModel.find();
  }

  async getAPatient(id: string) {
    return await PatientModel.findById(id);
  }

  async addPatient(newPatientData: Object) {
    const newPatient = new PatientModel(newPatientData);
    try {
      await newPatient.save();
      return newPatient._id;
    } catch (e) {
      return 500;
    }
  }

  async addSeverityLog(newPatientSeverityLog: Object) {
    const newSeverity = new PatientSeverityLogModel(newPatientSeverityLog);
    console.log("kuy =" + newSeverity);
    console.log("kuy23 = " + newPatientSeverityLog);
    try {
      return newSeverity.save();
    } catch (e) {
      return 500;
    }
  }

  async getActiveSeverity(patientId: string) {
    return await PatientSeverityLogModel.findOne({
      patient: patientId,
      patientSeverityDateEnd: "9999-12-31 00:00:00",
    });
  }
}
