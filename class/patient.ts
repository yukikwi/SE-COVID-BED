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
    patientStatus: string,
    patientSeverityLabel: string,
    patientSeverityDateStart: string
  ) {
    const newPatientData = {
      patientName: `${patientName}`,
      patientHospital: `${patientHospital}`,
      patientAddress: `${patientAddress}`,
      patientPhoneNumber: `${patientPhoneNumber}`,
      patientStatus: `${patientStatus}`
    }
    if (newPatientData !== null) {
      const patientId = await this.database.addPatient(newPatientData);
      const newPatientSeverityLog = {
        patientSeverityLabel: `${patientSeverityLabel}`,
        patientSeverityDateStart: `${patientSeverityDateStart}`,
        patientSeverityDateEnd: "9999-12-31 00:00:00",
        patient: `${patientId}`
      }
      await this.database.addSeverityLog(newPatientSeverityLog);
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
