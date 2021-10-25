import mongoose, { model, Model, Schema } from "mongoose";
import { IPatient } from "../data_struct/patient";

const PatientSchema: Schema = new Schema({
  patientName: {
    type: String,
  },
  patientHospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  patientAddress: {
    type: String,
  },
  patientPhoneNumber: {
    type: String,
  },
  patientStatus: {
    type: String,
  },
});

export const PatientModel: Model<IPatient> =
  mongoose.models.Patient || model("Patient", PatientSchema, "Patient");
