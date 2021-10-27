import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../../class/database";
import Resource from "../../../class/resource";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const database = new Connection();
      const resource = new Resource();

      const { id, newData } = req.body;

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const resourceData = await resource.editResource(id, newData);

        res.status(resourceData.http).json(resourceData.data);
      } else {
        // database connection fail
        res.status(500).json({ error: "fail to connect to database" });
      }
    } catch (err) {
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }
}
