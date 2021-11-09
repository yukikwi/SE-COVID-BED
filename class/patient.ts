import { TimePicker } from "antd";
import Database from "./database";
import { IPatient, ISeverity } from "./data_struct/patient";
import { IHospital } from "./data_struct/hospital";
import axios from "axios";

class Patient {
  private database: Database;
  private patient: IPatient | any;

  constructor() {
    this.database = new Database();
    this.patient = {};
  }

  async getAPatient(id: string) {
    try {
      const rawPatientData = await this.database.getAPatient(id as string);

      const rawServerity = await this.database.getActiveSeverity(
        rawPatientData?._id as string
      );

      const hospitalData = await this.database.getAHospital(
        rawPatientData?.patientHospital as string
      );

      const patientData = {
        _id: rawPatientData?._id,
        patientName: rawPatientData?.patientName,
        patientHospital: hospitalData?.hospitalName,
        patientAddress: rawPatientData?.patientAddress,
        patientLocation: rawPatientData?.patientLocation,
        patientPhoneNumber: rawPatientData?.patientPhoneNumber,
        patientStatus: rawPatientData?.patientStatus,
        patientSeverity: rawServerity?.patientSeverityLabel,
      };
      console.log("rawPatientData", rawPatientData);
      console.log("rawServerity", rawServerity);
      console.log("hospitalData", hospitalData);
      return {
        http: 200,
        data: patientData,
      };
    } catch (error) {
      return {
        http: 400,
        data: {
          error: "Fail to query patient",
        },
      };
    }
  }

  async getPatients(hospitalId: string) {
    let patientData: any = [];
    try {
      console.log("hospitalId", hospitalId);

      const rawPatientData: any = await this.database.getPatients(hospitalId);
      console.log("rawPatientData", rawPatientData);

      await Promise.all(
        rawPatientData.map(async (patient: IPatient) => {
          const rawServerity = await this.database.getActiveSeverity(
            patient?._id as string
          );

          const hospitalData = await this.database.getAHospital(
            patient?.patientHospital as string
          );

          patientData = [
            ...patientData,
            {
              _id: patient?._id,
              patientName: patient?.patientName,
              patientHospital: hospitalData?.hospitalName,
              patientAddress: patient?.patientAddress,
              patientLocation: patient?.patientLocation,
              patientPhoneNumber: patient?.patientPhoneNumber,
              patientStatus: patient?.patientStatus,
              patientSeverity: rawServerity?.patientSeverityLabel,
            },
          ];
          console.log("patientData", patientData);
        })
      );
      console.log("patientDataaaa", patientData);
      return {
        http: 200,
        data: patientData,
      };
    } catch (error) {
      return {
        http: 400,
        data: {
          error: "Fail to query patient",
        },
      };
    }
  }

  async addPatient(
    patientName: string,
    patientHospital: string,
    patientAddress: string,
    patientLocation: any,
    patientPhoneNumber: string,
    patientStatus: string,
    patientSeverityLabel: string,
    patientSeverityDateStart: string,
    patientEmail: string
  ) {
    console.log("patientLocation",patientLocation)
    const newPatientData = {
      patientName: `${patientName}`,
      patientHospital: `${patientHospital}`,
      patientAddress: `${patientAddress}`,
      patientLocation: {...patientLocation},
      patientPhoneNumber: `${patientPhoneNumber}`,
      patientStatus: `${patientStatus}`,
      patientEmail: `${patientEmail}`,
    };
    if (newPatientData !== null) {
      const patientId = await this.database.addPatient(newPatientData);
      const newPatientSeverityLog = {
        patientSeverityLabel: `${patientSeverityLabel}`,
        patientSeverityDateStart: `${patientSeverityDateStart}`,
        patientSeverityDateEnd: "9999-12-31 00:00:00",
        patient: `${patientId}`,
      };
      await this.database.addSeverityLog(newPatientSeverityLog);
      return {
        http: 201,
        data: {
          code: "Success to add patient",
          patientData: newPatientData,
          patientSeverityLog: newPatientSeverityLog,
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

  async approvePatient(id: string) {
    try {
      await this.database.approvePatient(id);
      return {
        http: 200,
        data: {
          code: "Success to approve patient",
        },
      };
    } catch (e) {
      return {
        http: 400,
        data: {
          error: "Fail to approve patient",
        },
      };
    }
  }

  async editPatient(id: string, newData: object) {
    try {
      await this.database.editPatient(id, newData);
      return {
        http: 200,
        data: {
          code: "Success to edit Patient",
        },
      };
    } catch (error) {
      return {
        http: 500,
        data: {
          error: "Fail to edit Patient",
        },
      };
    }
  }

  async editActiveSeverity(newPatientSeverityLog: ISeverity) {
    try {
      const temp = await this.database.editActiveSeverity(
        newPatientSeverityLog
      );

      return {
        http: 200,
        data: {
          code: "Success to edit severity log",
        },
      };
    } catch (error) {
      return {
        http: 500,
        data: {
          error: "Fail to edit severity log",
        },
      };
    }
  }

  async decisionHospital(hospitalData: IHospital[], patientLocation: any) {
    const hospitalLocation = hospitalData.map((hospital: any) => {
      return (
        `${hospital.hospitalLocation?.lat}, ${hospital.hospitalLocation?.long}`
    )})        
    console.log("hospitalLocation", hospitalLocation);
    const destinationLocation = hospitalLocation.join('|');
    const originLocation = `${patientLocation.lat}, ${patientLocation.long}`
    console.log("destinationLocation", destinationLocation);
    
    const result = await axios.get(`${process.env.NEXT_PUBLIC_GOOGLE_API}/json?destinations=${destinationLocation}&origins=${originLocation}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`) as any
    const distance = result.data.rows[0].elements.map((item: any, i: number) => {
      return({...item, index: i})
    })
    distance.sort((a: any, b: any) => {
      return(a.distance.value - b.distance.value)
    })
    
    return(distance[0].index);
  }
}

export default Patient;
