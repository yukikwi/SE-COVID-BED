import Database from "./database";
import Notification from "./notification";
import { IPatient, ISeverity } from "./data_struct/patient";
import { IHospital } from "./data_struct/hospital";
import axios from "axios";

class Patient {
  private database: Database;
  private notification: Notification

  constructor() {
    this.database = new Database();
    this.notification = new Notification()
  }

  //Method for get one patient by id.
  async getAPatient(id: string) {
    try {
      //Get a patient data filter by id form database with database class.
      const rawPatientData = await this.database.getAPatient(id as string);

      //Get a severity data of current patient filter by id form database with database class.
      const rawServerity = await this.database.getActiveSeverity(
        rawPatientData?._id as string
      );

      //Get a hospital data that current patient is related filter by hospital id form database with database class.
      const hospitalData = await this.database.getAHospital(
        rawPatientData?.patientHospital as string
      );

      const patientData = {
        _id: rawPatientData?._id,
        patientName: rawPatientData?.patientName,
        patientHospital: hospitalData?.hospitalName,
        patientAddress: rawPatientData?.patientAddress,
        patientSubDistrict: rawPatientData?.patientSubDistrict,
        patientDistrict: rawPatientData?.patientDistrict,
        patientProvince: rawPatientData?.patientProvince,
        patientLocation: rawPatientData?.patientLocation,
        patientPhoneNumber: rawPatientData?.patientPhoneNumber,
        patientStatus: rawPatientData?.patientStatus,
        patientEmail: rawPatientData?.patientEmail,
        patientSeverity: rawServerity?.patientSeverityLabel,
      };
      return {
        //When get patient data successful return status 200 and patient data.
        http: 200,
        data: patientData,
      };
    } catch (error) {
      return {
        //When get patient data fail return status 400 and error message.
        http: 400,
        data: {
          error: "Fail to query patient",
        },
      };
    }
  }

  //Method for get all patient by hospital id.
  async getPatients(hospitalId: string) {
    let patientData: any = [];
    try {

      //Get all patient data filter by id form database with database class.
      const rawPatientData: any = await this.database.getPatients(hospitalId);

      await Promise.all(
        rawPatientData.map(async (patient: IPatient) => {
          //Map and get last severity data of each patient filter by patient id form database with database class.
          const rawServerity = await this.database.getActiveSeverity(
            patient?._id as string
          );

          //Map and get hospital data of each patient filter by hospital id form patient data form database with database class.
          const hospitalData = await this.database.getAHospital(
            patient?.patientHospital as string
          );

          //Add all patient data to array.
          patientData = [
            ...patientData,
            {
              _id: patient?._id,
              patientName: patient?.patientName,
              patientHospital: hospitalData?.hospitalName,
              patientAddress: patient?.patientAddress,
              patientSubDistrict: patient?.patientSubDistrict,
              patientDistrict: patient?.patientDistrict,
              patientProvince: patient?.patientProvince,
              patientLocation: patient?.patientLocation,
              patientPhoneNumber: patient?.patientPhoneNumber,
              patientStatus: patient?.patientStatus,
              patientSeverity: rawServerity?.patientSeverityLabel,
              patientEmail: patient?.patientEmail,
            },
          ];
        })
      );
      return {
        //When get all patient data successful return status 200 and array of all patient data.
        http: 200,
        data: patientData,
      };
    } catch (error) {
      return {
        //When get all patient data fail return status 400 and error message.
        http: 400,
        data: {
          error: "Fail to query patient",
        },
      };
    }
  }

  //Method for add new patient.
  async addPatient(
    patientName: string,
    patientHospital: string,
    patientAddress: string,
    patientSubDistrict: string,
    patientDistrict: string,
    patientProvince: string,
    patientLocation: any,
    patientPhoneNumber: string,
    patientStatus: string,
    patientSeverityLabel: string,
    patientSeverityDateStart: string,
    patientEmail: string
  ) {
    const newPatientData = {
      patientName: patientName,
      patientHospital: patientHospital,
      patientAddress: patientAddress,
      patientSubDistrict: patientSubDistrict,
      patientDistrict: patientDistrict,
      patientProvince: patientProvince,
      patientLocation: {...patientLocation},
      patientPhoneNumber: patientPhoneNumber,
      patientStatus: patientStatus,
      patientEmail: patientEmail,
    };
    if (newPatientData !== null) {
      
      //Add new patient data
      const patientId = await this.database.addPatient(newPatientData);
      
      const newPatientSeverityLog = {
        patientSeverityLabel: patientSeverityLabel,
        patientSeverityDateStart: patientSeverityDateStart,
        patientSeverityDateEnd: "9999-12-31 00:00:00",
        patient: patientId,
      };
      
      //Add new severity data of this patient
      await this.database.addSeverityLog(newPatientSeverityLog);
      
      return {
        //When add patient data successful return status 201, success message, patient data and severity of this patient.
        http: 201,
        data: {
          code: "Success to add patient",
          patientData: newPatientData,
          patientSeverityLog: newPatientSeverityLog,
        },
      };
    } else {
      return {
        //When add patient data fail return status 400 and error message.
        http: 400,
        data: {
          error: "Fail to add patient",
        },
      };
    }
  }

  //Method for approve patient to hospital
  async approvePatient(id: string) {
    try {

      //Call database class for connect mongoDB
      await this.database.approvePatient(id);
      //get patient data
      const fullPatientData = await this.getAPatient(id);
      
      //send email notification to patient
      const notificationRes = await this.notification.sendApproveNotification(fullPatientData);
      console.log("notificationRes", notificationRes);
      
      return {
        //When approve patient to hospital successful return status 200 and code message.
        http: 200,
        data: {
          code: "Success to approve patient",
        },
      };
    } catch (e) {
      return {
        //When approve patient to hospital failed return status 500 and error message.
        http: 400,
        data: {
          error: "Fail to approve patient",
        },
      };
    }
  }

  //Method for edit or update patient data
  async editPatient(id: string, newData: object) {
    try {

      //Call database class for connect mongoDB
      await this.database.editPatient(id, newData);

      return {
        //When update patient data successful return status 200 and code message.
        http: 200,
        data: {
          code: "Success to edit Patient",
        },
      };
    } catch (error) {
      return {
        
        //When update patient data failed return status 500 and error message.
        http: 500,
        data: {
          error: "Fail to edit Patient",
        },
      };
    }
  }

  //Method for edit or update patient severity status
  async editActiveSeverity(newPatientSeverityLog: ISeverity) {
    try {

      //Call database class for connect mongoDB
      await this.database.editActiveSeverity(
        newPatientSeverityLog
      );

      return {
        //When update patient severity status successful return status 200 and code message.
        http: 200,
        data: {
          code: "Success to edit severity log",
        },
      };
    } catch (error) {
      return {
        //When update patient severity status failed return status 500 and error message.
        http: 500,
        data: {
          error: "Fail to edit severity log",
        },
      };
    }
  }

  //Method for make a tentative decision for hospital suggestion 
  async decisionHospital(hospitalData: IHospital[], patientLocation: any) {

    //get location from active hospitals
    const hospitalLocation = hospitalData.map((hospital: any) => {
      return (
        `${hospital.hospitalLocation?.lat}, ${hospital.hospitalLocation?.long}`
    )})        
  
    //set hospitals location format prepare for calculate distance by google map API
    const destinationLocation = hospitalLocation.join('|');

    //set patient location format prepare for calculate distance by google map API
    const originLocation = `${patientLocation.lat}, ${patientLocation.long}`
    
    //call google API for calculate distance from patient to active hospitals
    const result = await axios.get(`${process.env.NEXT_PUBLIC_GOOGLE_API}/json?destinations=${destinationLocation}&origins=${originLocation}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`) as any
    
    //sort all distance for find nearest hospital 
    const distance = result.data.rows[0].elements.map((item: any, i: number) => {
      return({...item, index: i})
    })
    distance.sort((a: any, b: any) => {
      return(a.distance.value - b.distance.value)
    })
    
    //return nearest hospital data
    return(distance[0].index);
  }

  async dischargePatient(id: string) {
    try {
      await this.database.dischargePatient(id);

      //get patient data
      const fullPatientData = await this.getAPatient(id);
      
      //send email notification to patient
      const notificationRes = await this.notification.sendDischargeNotification(fullPatientData);
      console.log("notificationRes", notificationRes);
      
      return {
        http: 200,
        data: {
          code: "Success to discharge patient",
        },
      };
    } catch (e) {
      return {
        http: 400,
        data: {
          error: "Fail to discharge patient",
        },
      };
    }
  }
}

export default Patient;
