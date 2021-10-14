import { Document } from "mongoose";

// export interface
export interface IHospital extends Document {
  hospitalName: string;
  hospitalPhoneNumber: string;
  hospitalConvince: string;
  hospitalAddress: string;
  hospitalLocation: object;
  isAvaliable: boolean;
  isDelete: boolean;
}

export type THospital = {
  hospitalName?: string,
  hospitalPhoneNumber?: string,
  hospitalConvince?: string,
  hospitalAddress?: string,
  hospitalLocation?: object,
  isAvaliable?: boolean,
  isDelete?: boolean;
}