// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../../class/database";
import Patient from "../../../class/patient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const database = new Connection();
      const patient = new Patient();
      const { hospitalId } = req.body;

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const patientData = await patient.getPatients(hospitalId as string);

        res.status(200).json(patientData);
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
