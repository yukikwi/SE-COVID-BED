import Database from "./database";
import { IPatient } from "./data_struct/patient";

class Patient {
  private database: Database;
  private patient: IPatient | any;

  constructor() {
    this.database = new Database();
    this.patient = {};
  }

  async getAPatient() {}

  async getPatient() {}

  async addPatient(
    patientName: string,
    patientHospital: string,
    patientAddress: string,
    patientPhoneNumber: string,
    patientStatus: string
  ) {
    const newPatientData = {
      patientName: `${patientName}`,
      patientHospital: `${patientHospital}`,
      patientAddress: `${patientAddress}`,
      patientPhoneNumber: `${patientPhoneNumber}`,
      patientStatus: `${patientStatus}`
    }
    if (newPatientData !== null) {
      await this.database.addPatient(newPatientData);
      return {
        http: 201,
        data: {
          code: "Success to add patient",
          patientData: newPatientData,
        },
      };
    } else {
      return {
        http: 400,
        data: {
          error: "Fail to add patient",
        },
      };
    }
  }
}

export default Patient;
