import { Document, ObjectId } from 'mongoose'

// export interface
export interface IResource extends Document {
    resourceName: string;
    resourceCode: string;
    maximum: number;
    available: number;
    remark: string;
    status: string;
    resourceHospital: ObjectId | string;
}

// export type
export type TResource = {
    resourceName: string;
    resourceCode: string;
    maximum: number;
    available: number;
    remark: string;
    status: string;
    resourceHospital: ObjectId | string;
}

export type TResourceUI = {
  _id: string;
  key: string;
  resourceName: string;
  resourceCode?: string;
  maximum?: number;
  available?: number;
  remark?: string;
};