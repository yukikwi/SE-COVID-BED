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

  async getResource(hospitalId: string) {
    try {
      console.log("hospitalId", hospitalId);
      const rawResource = await this.database.getResource({resourceHospital: hospitalId});

      console.log("rawResource", rawResource);

      return {
        http: 200,
        data: rawResource,
      };
    } catch (error) {
      return {
        http: 400,
        data: {
          error: "Fail to query resource",
        },
      };
    }
  }

  async getAResource(id: string) {
    try {
      console.log("id", id);
      const rawResource = await this.database.getAResource(id);

      console.log("rawResource", rawResource);

      return {
        http: 200,
        data: rawResource,
      };
    } catch (error) {
      return {
        http: 400,
        data: {
          error: "Fail to query resource",
        },
      };
    }
  }

  async deleteResource(id: string) {
    try {
      let deleteResource = await this.database.deleteResource(id);
      return {
        http: 200,
        data: {
          code: "Success to delete Resource",
        },
      };
    } catch (error) {
      return {
        http: 500,
        data: {
          error: "Fail to delete Resource",
        },
      };
    }
  }

  async editResource(id: string, newData: any) {
    try {
      let editResource = await this.database.editResource(id, newData);
      return {
        http: 200,
        data: {
          code: "Success to edit Resource",
        },
      };
    } catch (error) {
      return {
        http: 500,
        data: {
          error: "Fail to edit Resource",
        },
      };
    }
  }
}

export default Resource;
