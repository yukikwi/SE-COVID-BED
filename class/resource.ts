import Database from "./database";

class Resource {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  //Method for add new resource.
  async addResource(
    resourceName: string,
    resourceCode: string,
    maximum: number,
    available: number,
    remark: string,
    resourceHospital: any
  ) {
    const newResource = {
      resourceName,
      resourceCode,
      maximum,
      available,
      remark,
      resourceHospital,
    };

    //Add new resource data
    await this.database.addResource(newResource);

    return {
      //When add resource data successful return status 201, success message and resource data.
      http: 201,
      data: {
        code: "Success to add resource",
        resourceData: newResource,
      },
    };
  }

  //Method for get all resource data by hospital id.
  async getResource(hospitalId: string) {
    try {
      //Get resource data by hospital id.
      const rawResource = await this.database.getResource({
        resourceHospital: hospitalId,
      });

      return {
        //When get resource data successful return status 200, success message and resource data.
        http: 200,
        data: rawResource,
      };
    } catch (error) {
      return {
        //When get resource data fail return status 400 and error message.
        http: 400,
        data: {
          error: "Fail to query resource",
        },
      };
    }
  }

  //Method for get one resource by resourceId.
  async getAResource(id: string) {
    try {
      const rawResource = await this.database.getAResource(id);

      return {
        //When get resource data successful return status 200 and resource data.
        http: 200,
        data: rawResource,
      };
    } catch (error) {
      return {
        //When get resource data failed return status 400 and error message.
        http: 400,
        data: {
          error: "Fail to query resource",
        },
      };
    }
  }

  //Method for delete resource data
  async deleteResource(id: string) {
    try {
      //Call database class for connect mongoDB
      await this.database.deleteResource(id);

      return {
        //When delete resource data successful return status 200 and code message.
        http: 200,
        data: {
          code: "Success to delete Resource",
        },
      };
    } catch (error) {
      return {
        //When delete resource data failed return status 500 and error message.
        http: 500,
        data: {
          error: "Fail to delete Resource",
        },
      };
    }
  }

  //Method for edit or update resource data
  async editResource(id: string, newData: any) {
    try {
      //Call database class for connect mongoDB
      await this.database.editResource(id, newData);

      return {
        //When update resource data successful return status 200 and code message.
        http: 200,
        data: {
          code: "Success to edit Resource",
        },
      };
    } catch (error) {
      return {
        //When update resource data failed return status 500 and error message.
        http: 500,
        data: {
          error: "Fail to edit Resource",
        },
      };
    }
  }
}

export default Resource;
