import Database from "./database";
import { THospital } from "./data_struct/hospital";

class Hospital {
  private newHospitalData: THospital;
  private database: Database;

  constructor() {
    this.database = new Database();
    this.newHospitalData = {};
  }

  //Method that used to send hospital data to database class for add new hospital to database.
  async addHospital(
    hospitalName: string,
    hospitalPhoneNumber: string,
    hospitalConvince: string,
    hospitalAddress: string,
    hospitalSubDistrict: string,
    hospitalDistrict: string,
    hospitalProvince: string,
    hospitalLocationLat: number,
    hospitalLocationLong: number,
    staff: string
  ) {
    //Assign data into object newHospitalData
    this.newHospitalData = {
      hospitalName: hospitalName,
      hospitalPhoneNumber: hospitalPhoneNumber,
      hospitalConvince: hospitalConvince,
      hospitalAddress: hospitalAddress,
      hospitalSubDistrict: hospitalSubDistrict,
      hospitalDistrict: hospitalDistrict,
      hospitalProvince: hospitalProvince,
      hospitalLocation: {
        lat: hospitalLocationLat,
        long: hospitalLocationLong,
      },
      isAvailable: true,
      isDelete: false,
      staff: staff,
    };

    if (this.newHospitalData) {
      //Send newHospitalData to database class
      const result = await this.database.addHospital(this.newHospitalData);
      return {
        //When add hospital data successful return status 201, code message and hospital data that recently added.
        http: 201,
        data: {
          code: "Success to add hospital",
          hospitalData: result,
        },
      };
    } else {
      return {
        //When add hospital data fail return status 400 and code message.
        http: 400,
        data: {
          error: "Fail to add hospital",
        },
      };
    }
  }

  //Method for deactivate hospital
  async deleteHospital(id: string) {
    try {

      //Call database class for connect to mongoDB
      let deleteStatus = await this.database.deleteHospital(id);
      
      if (deleteStatus === 404) {
        return {
          //Id doens't exist in database return status 404, error message.
          http: 404,
          data: {
            error: "Invalid id",
          },
        };
      } else if (deleteStatus === 500) {
        return {
          //Has problem when update data return status 500, error message.
          http: 500,
          data: {
            error: "Fail to delete hospital",
          },
        };
      } else {
        return {
          //When delete hospital data successful return status 200 and code message
          http: 200,
          data: {
            code: "Success to delete hospital",
          },
        };
      }
    } catch (error) {
      return {
        //When delete hospital data fail return status 500, code message.
        http: 500,
        data: {
          error: "Fail to delete hospital",
        },
      };
    }
  }

  //Method for edit or update hospital data
  async editHospital(id: string, newData: object) {
    try {
      //Call database class for connect to mongoDB
      await this.database.editHospital(id, newData);

      return {
        //When edit hospital data successful return status 200 and code message
        http: 200,
        data: {
          code: "Success to edit hospital",
        },
      };
    } catch (error) {
      return {
        //When edit hospital data failed return status 500 and error message
        http: 500,
        data: {
          error: "Fail to edit hospital",
        },
      };
    }
  }
}

export default Hospital;
