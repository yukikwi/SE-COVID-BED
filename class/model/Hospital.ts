import mongoose, { model, Model, Schema } from "mongoose";
import { IHospital } from "../data_struct/hospital";

const HospitalSchema: Schema = new Schema({
  hospitalName: {
    type: String,
  },
  hospitalPhoneNumber: {
    type: String,
  },
  hospitalAddress: {
    type: String,
  },
  hospitalSubDistrict: {
    type: String,
  },
  hospitalDistrict: {
    type: String,
  },
  hospitalProvince: {
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
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

export const HospitalModel: Model<IHospital> =
  mongoose.models.Hospital || model("Hospital", HospitalSchema, "Hospital");
