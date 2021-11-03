import { Document } from "mongoose";

// export interface
export interface IPatient extends Document {
  patientName: string;
  patientHospital: any;
  patientAddress: string;
  patientLocation: any;
  patientPhoneNumber: string;
  patientStatus: string;
  patientEmail: string;
}

export type TPatient = {
  patientName?: string;
  patientHospital?: any;
  patientAddress?: string;
  patientLocation?: any;
  patientPhoneNumber?: string;
  patientStatus?: string;
  patientEmail?: string;
};

export interface ISeverity extends Document {
  patientSeverityLabel: string;
  patientSeverityDateStart: string;
  patientSeverityDateEnd: string;
  patient: any;
}

export type TSeverity = {
  patientSeverityLabel?: string;
  patientSeverityDateStart?: string;
  patientSeverityDateEnd?: string;
  patient?: any;
};
