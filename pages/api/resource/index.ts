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

      const { hospitalId } = req.body;
      if (req.body) {
        const isDatabaseConnected = await database.connectDatabase();
        if (isDatabaseConnected === true) {
          const resourceData = await resource.getResource(hospitalId as string);

          res.status(resourceData.http).json(resourceData.data);
        } else {
          // database connection fail
          res.status(500).json({ error: "fail to connect to database" });
        }
      } else {
        res.status(400).json({ error: "Hospital id is null" });
      }
    } catch (err) {
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }
}
