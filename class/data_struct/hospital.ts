import { Document } from "mongoose";

// export interface
export interface IHospital extends Document {
  hospitalName: string;
  hospitalPhoneNumber: string;
  hospitalAddress: string;
  hospitalSubDistrict: string;
  hospitalDistrict: string;
  hospitalProvince: string;
  hospitalLocation: object;
  isAvailable: boolean;
  isDelete: boolean;
  staff: any;
}

export type THospital = {
  _id?: string;
  hospitalName?: string;
  hospitalPhoneNumber?: string;
  hospitalAddress?: string;
  hospitalSubDistrict?: string;
  hospitalDistrict?: string;
  hospitalProvince?: string;
  hospitalLocation?: {
    lat?: number | Number;
    long?: number | Number;
  };
  isAvailable?: boolean;
  isDelete?: boolean;
  staff?: any;
};
