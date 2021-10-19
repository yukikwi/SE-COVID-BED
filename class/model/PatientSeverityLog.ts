import mongoose, { model, Model, Schema } from "mongoose";
import { ISeverity } from "../data_struct/patient";

const PatientSeverityLogSchema: Schema = new Schema({
  patientSeverityLabel: {
    type: String,
  },
  patientSevertiyDateTime: {
    type: Date,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
});

export const PatientSeverityLogModel: Model<ISeverity> =
  mongoose.models.Patient || model("PatientSeverityLog", PatientSeverityLogSchema, "PatientSeverityLog");
