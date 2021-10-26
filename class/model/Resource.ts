import mongoose, { model, Model, Schema } from "mongoose";
import { IResource } from "../data_struct/resource";

const ResourceSchema: Schema = new Schema({
  resourceName: {
    type: String
  },
  resourceCode: {
    type: String
  },
  maximum: {
    type: Number
  },
  available: {
    type: Number
  },
  remark: {
    type: String
  },
  status: {
    type: String
  },
  resourceHospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  },
});

export const ResourceSchemaModel: Model<IResource> =
  mongoose.models.Resource || model("Resource", ResourceSchema, "Resource");
