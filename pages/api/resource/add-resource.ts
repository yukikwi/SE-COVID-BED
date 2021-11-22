import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../class/database";
import Resource from "../../../class/resource";

export default async function addResource(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const database = new Database();
      const resource = new Resource();
      if (req.body) {
        const isDatabaseConnected = await database.connectDatabase();
        if (isDatabaseConnected === true) {
          const {
            resourceName,
            resourceCode,
            maximum,
            available,
            remark,
            resourceHospital,
          } = req.body;

          const addResource = await resource.addResource(
            resourceName,
            resourceCode,
            maximum,
            available,
            remark,
            resourceHospital
          );
          res.status(addResource.http).json(addResource.data);
        } else {
          // database connection fail
          res.status(500).json({ error: "fail to connect to database" });
        }
      } else {
        res.status(400).json({ error: "New data is null" });
      }
    } catch (err) {
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }
}
