import { Document } from "mongoose";

// export interface
export interface IHospital extends Document {
  hospitalName: string;
  hospitalPhoneNumber: string;
  hospitalConvince: string;
  hospitalAddress: string;
  hospitalLocation: object;
  hospitalStatus: string;
}
