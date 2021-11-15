import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../class/database";
import Patient from "../../../class/patient";

export default async function dischargePatient(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const database = new Database();
      const patient = new Patient();

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const {
          id
        } = req.body;

        const discharge = await patient.dischargePatient(id);
        res.status(discharge.http).json(discharge.data);
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
