import mongoose, { model, Model, Schema } from "mongoose";
import { IHospital } from "../data_struct/hospital";

const HospitalSchema: Schema = new Schema({
  hospitalName: {
    type: String,
  },
  hospitalPhoneNumber: {
    type: String,
  },
  hospitalConvince: {
    type: String,
  },
  hospitalAddress: {
    type: String,
  },
  hospitalLocation: {
    type: Object,
  },
  isAvailable: {
    type: Boolean,
  },
  isDelete: {
    type: Boolean,
  },
});

export const HospitalModel: Model<IHospital> =
  mongoose.models.Hospital || model("Hospital", HospitalSchema, "Hospital");
