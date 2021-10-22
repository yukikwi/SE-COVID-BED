import mongoose, { model, Model, Schema } from "mongoose";
import { ISeverity } from "../data_struct/patient";

const PatientSeverityLogSchema: Schema = new Schema({
  patientSeverityLabel: {
    type: String,
  },
  patientSeverityDateStart: {
    type: String,
  },
  patientSeverityDateEnd: {
    type: String,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
});

export const PatientSeverityLogModel: Model<ISeverity> =
  mongoose.models.PatientSeverityLog || model("PatientSeverityLog", PatientSeverityLogSchema, "PatientSeverityLog");
