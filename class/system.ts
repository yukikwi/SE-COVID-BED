import { THospital } from "./data_struct/hospital";
import Database from "./database";

class System {
  private newHospitalData: THospital;
  private database: Database;

  constructor() {
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
    staff: String
  ) {
    this.newHospitalData = {
      hospitalName: `${hospitalName}`,
      hospitalPhoneNumber: `${hospitalPhoneNumber}`,
      hospitalConvince: `${hospitalConvince}`,
      hospitalAddress: `${hospitalAddress}`,
      hospitalLocation: {
        lat: `${hospitalLocationLat}`,
        long: `${hospitalLocationLong}`,
      },
      isAvailable: true,
      isDelete: false,
      staff: `${staff}`
    };

    console.log(this.newHospitalData);
    if (this.newHospitalData) {
      this.database.addHospital(this.newHospitalData);
      return {
        http: 201,
        data: {
          code: "Success to add hospital",
          hospitalData: this.newHospitalData,
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

  async deleteHospital(id: string) {
    try {
      let deleteStatus = await this.database.deleteHospital(id);
      if (deleteStatus === 404) {
        return {
          http: 404,
          data: {
            code: "Hospital not found",
          },
        };
      } else if (deleteStatus === 500) {
        return {
          http: 500,
          data: {
            code: "Invalid id",
          },
        };
      } else {
        return {
          http: 200,
          data: {
            code: "Success to delete hospital",
          },
        };
      }
    } catch (error) {
      return {
        http: 500,
        data: {
          error: "Fail to delete hospital",
        },
      };
    }
  }

  async editHospital(id: string, newData: object) {
    try {
      this.database.editHospital(id, newData);

      return {
        http: 200,
        data: {
          code: "Success to edit hospital",
        },
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

export default System;
