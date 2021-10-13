import { THospital } from "./data_struct/hospital"
import Database from "./database";

class System {
  private newHospitalData: THospital;
  private database: Database;

  constructor(){
    this.database = new Database();
    this.newHospitalData = {};
  }

  async addHospital(
    hospitalName: String,
    hospitalPhoneNumber: String,
    hospitalConvince: String,
    hospitalAddress: String,
    hospitalLocationLat: String,
    hospitalLocationLong: String,
    hospitalStatus: String,
  ) {

    this.newHospitalData = {
      hospitalName: `${hospitalName}`,
      hospitalPhoneNumber: `${hospitalPhoneNumber}`,
      hospitalConvince: `${hospitalConvince}`,
      hospitalAddress: `${hospitalAddress}`,
      hospitalLocation: {
        lat: `${hospitalLocationLat}`, 
        long: `${hospitalLocationLong}`
      },
      hospitalStatus: `${hospitalStatus}`,
      isDelete: false
    }
    
    console.log(this.newHospitalData);
    if(this.newHospitalData){
      this.database.addHospital(this.newHospitalData);
      return {
        http: 201,
        data: {
          code: "Success to add hospital",
          hospitalData: this.newHospitalData
        },
      };
    } else {
      return {
        http: 400,
        data: {
          error: "Fail to add hospital",
        },
      };
    }
    

  }

  async deleteHospital(id: string){
    try{
      this.database.deleteHospital(id);
      return {
        http: 200,
        data: {
          code: "Success to delete hospital"
        },
      };
    } catch(error) {
      return {
        http: 500,
        data: {
          error: "Fail to delete hospital",
        },
      };
    }
  }
}

export default System;