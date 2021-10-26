import Database from "./database";
import { TResource, IResource } from "./data_struct/resource";

class Resource {
  private database: Database;
  private resource: TResource | any;

  constructor() {
    this.database = new Database();
    this.resource = {};
  }

  async addResource(
    resourceName: string,
    resourceCode: string,
    maximum: number,
    available: number,
    remark: string,
    status: string,
    resourceHospital: any
  ) {
    const newResource = {
      resourceName,
      resourceCode,
      maximum,
      available,
      remark,
      status,
      resourceHospital,
    };
    console.log("newResource", newResource);

    if (newResource) {
      await this.database.addResource(newResource);
      return {
        http: 201,
        data: {
          code: "Success to add resource",
          resourceData: newResource,
        },
      };
    } else {
      return {
        http: 400,
        data: {
          error: "Fail to add resource",
        },
      };
    }
  }
}

export default Resource;
