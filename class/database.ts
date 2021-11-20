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
import mongoose, { ObjectId } from "mongoose";
import { ISeverity } from "./data_struct/patient";
// load data_struct and model
import { TUser } from "./data_struct/user";
import {
  UserModel,
  HospitalModel,
  PatientModel,
  PatientSeverityLogModel,
  ResourceSchemaModel,
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
      return false;
    }
  }

  //Method for get a user data from database. 
  async getAUser(condition: TUser) {
    //Use command findOne to query a data by condition.
    return await UserModel.findOne(condition).lean();
  }

  //Method for get hospital staff data that role hospital from database.
  async getHospitalStaff(condition = {}) {
    //Use command find to query only _id and username of all hospital staff data by condition and hospital role.
    return await UserModel.find({...condition, role: "hospital"}, {_id: 1, username: 1});
  }

  //Method for get all hospital data from database.
  async getHospitals(condition = {}) {
    //Use command find to query all hospital data by condition and staff data except password and token that referenced.
    return await HospitalModel.find(condition).populate("staff", {
      password: 0,
      token: 0,
    });
  }

  //Method for get a hospital data from database.
  async getAHospital(id: string) {
    //Use command find to query a hospital data by condition and staff data except password and token that referenced.
    return await HospitalModel.findById(id).populate("staff", {
      password: 0,
      token: 0,
    });
  }

  //Method for add new hospital data to database.
  async addHospital(newHospitalData: Object) {
    const newHospital = new HospitalModel(newHospitalData);
    try {
      //Use command save to add new hospital data to database.
      await newHospital.save();
      return newHospital;
    } catch (e) {
      //When add new hospital data fail return status 500.
      return 500;
    }
  }

  //Method for add new hospital data to database.
  async deleteHospital(id: string) {
    try {
      //Use getAHospital method to get hospital data by id.
      let getHospitalData = await this.getAHospital(id);
      //Hospital data is null return 404.
      if (!getHospitalData) return 404;
      //Hospital data exists then use command findByIdAndUpdate by id and update isDelete to true.
      else return await HospitalModel.findByIdAndUpdate(id, { isDelete: true });
    } catch (e) {
      //When error return 500.
      return 500;
    }
  }

  //Method for edit hospital data to database.
  async editHospital(id: string, newData: Object) {
    //Use command findByIdAndUpdate to update new data of hospital data by id to database.
    return await HospitalModel.findByIdAndUpdate(id, newData);
  }

  //Method for get all patient data by hospital id from database.
  async getPatients(hospitalId: string) {
    //Use command find to query all patients data by hospital id from database.
    return await PatientModel.find({ patientHospital: hospitalId });
  }

  //Method for get a pateint data by patient id from database.
  async getAPatient(id: string) {
    //Use command findById to query a patient data by patient id from database.
    return await PatientModel.findById(id);
  }

  //Method for add new pateint data to database.
  async addPatient(newPatientData: Object) {
    const newPatient = new PatientModel(newPatientData);
    try {
      //Use command save to add new patient data to database.
      await newPatient.save();
      return newPatient._id;
    } catch (e) {
      //When add new patient data fail return status 500.
      return 500;
    }
  }

  //Method for add patients severity for new patient to database.
  async addSeverityLog(newPatientSeverityLog: Object) {

    //create new severity log document
    const newSeverity = new PatientSeverityLogModel(newPatientSeverityLog);
    try {
      return newSeverity.save();
    } catch (e) {
      return 500;
    }
  }

  //Method for query active patients severity by patient document id from database.
  async getActiveSeverity(patientId: string) {

    //query active patient severity log by patient id and DateEnd = "9999-12-31 00:00:00"
    return await PatientSeverityLogModel.findOne({
      patient: patientId,
      patientSeverityDateEnd: "9999-12-31 00:00:00",
    });
  }

  //Method for update patient severity by patient document id from database.
  async editActiveSeverity(newPatientSeverityLog: ISeverity) {
    
    //terminate old patient severity log by patient id 
    await PatientSeverityLogModel.findOneAndUpdate(
      {
        patient: newPatientSeverityLog.patient,
        patientSeverityDateEnd: "9999-12-31 00:00:00",//time to active
      },
      { patientSeverityDateEnd: newPatientSeverityLog.patientSeverityDateStart }//set time at now for terminate
    );

    //add new severity log document
    const newSeverity = new PatientSeverityLogModel(newPatientSeverityLog);
    try {
      return newSeverity.save();
    } catch (e) {
      return 500;
    }
  }

  //Method for approve patient to hospital by patient document id from database.
  async approvePatient(id: string) {

    //update documents by document id and status is "In progress", By mongoose command findByIdAndUpdate
    return await PatientModel.findByIdAndUpdate(
      id,
      { patientStatus: "In progress" },
      { upsert: true }
    );
  }

  //Method for update a patient data by document id from database.
  async editPatient(id: string, newData: Object) {
    
    //update documents by document id, By mongoose command findByIdAndUpdate
    return await PatientModel.findByIdAndUpdate(id, newData, { upsert: true });
  }

  //Method for find a hospital data by staffId from database.
  async getAHospitalByUser(userId: ObjectId) {

    //find documents by some condition, By mongoose command find
    return await HospitalModel.findOne({ staff: userId }, { _id: 1 });
  }

  //------------Manage Resource--------------

  //Method for add new resource to database.
  async addResource(newResource: Object) {

    //create new document
    const result = new ResourceSchemaModel(newResource);
    try {
      return result.save();
    } catch (e) {
      return 500;
    }
  }

  //Method for find resources data by condition from database.
  async getResource(condition: any) {

    //find documents by some condition, By mongoose command find
    return await ResourceSchemaModel.find(condition);
  }

  //Method for find a resource data by document id from database.
  async getAResource(id: string) {

    //find document by document id, By mongoose command findById
    return await ResourceSchemaModel.findById(id);
  }

  //Method for delete a resource data by document id from database. 
  async deleteResource(id: string) {

    //delete document by document id, By mongoose command findByIdAndDelete
    return await ResourceSchemaModel.findByIdAndDelete(id);
  }

  //Method for edit a resource data by document id from database. 
  async editResource(id: string, newData: any) {

    //update document by document id, By mongoose command findByIdAndUpdate
    return await ResourceSchemaModel.findByIdAndUpdate(id, newData);
  }

  async dischargePatient(id: string) {
    //change patient status to Discharged
    try{
      return await PatientModel.findByIdAndUpdate(
        id,
        { patientStatus: "Discharged" },
        { upsert: false }
      );
    }catch(e){
      console.log("err",e);
    }
    
  }
}
