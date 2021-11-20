import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../../class/database";
import Hospital from "../../../class/hospital";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const database = new Connection();
      const hospital = new Hospital();

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const { id, newData } = req.body;

        // use method login from userlogin class
        const editHospital = await hospital.editHospital(id, newData);
        res.status(editHospital.http).json(editHospital.data);
      } else {
        // database connection fail
        res.status(500).json({ error: "fail to connect to database" });
      }
    } catch (err) {
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
}