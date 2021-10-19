import { Document, Date } from "mongoose";

// export interface
export interface IPatient extends Document {
  patientName: string;
  patientHospital: any;
  patientAddress: string;
  patientPhoneNumber: string;
  patientStatus: string;
}

export type TPatient = {
  patientName?: string;
  patientHospital?: any;
  patientAddress?: string;
  patientPhoneNumber?: string;
  patientStatus?: string;
};

export interface ISeverity extends Document {
  patientSeverityLabel: string;
  patientSevertiyDateTime: Date;
  patient: any;
}

export type TSeverity = {
  patientSeverityLabel?: string;
  patientSevertiyDateTime?: Date;
  patient?: any;
};

