import Database from "./database";
import { IHospital } from "./data_struct/hospital";

class Hospital {
  private hospital: IHospital | any;
  private database: Database;

  constructor() {
    this.hospital = {};
    this.database = new Database();
  }

  async getHospital() {
    return this.hospital;
  }

  async editHospital() {}
}

export default Hospital;
