// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../../class/database";
import Resource from "../../../class/resource";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const database = new Connection();
      const resource = new Resource();

      const isDatabaseConnected = await database.connectDatabase();

      if (isDatabaseConnected === true) {
        // const patientData = await database.getAPatient(id as string);
        const resourceData = await resource.getAResource(id as string);

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