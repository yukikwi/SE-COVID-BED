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

      if (req.body) {
        const isDatabaseConnected = await database.connectDatabase();
        if (isDatabaseConnected === true) {
          const { id } = req.body;

          // use method login from userlogin class
          const deleteHospitalStatus = await hospital.deleteHospital(id);
          res.status(deleteHospitalStatus.http).json(deleteHospitalStatus.data);
        } else {
          // database connection fail
          res.status(500).json({ error: "fail to connect to database" });
        }
      } else {
        res.status(400).json({ error: "Hospital id is null" });
      }
    } catch (err) {
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
}
