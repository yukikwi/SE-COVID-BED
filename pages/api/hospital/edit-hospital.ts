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

      const { id, newData } = req.body;

      if (req.body) {
        const isDatabaseConnected = await database.connectDatabase();
        if (isDatabaseConnected === true) {
          
          if (!id) {
            res.status(400).json({ error: "Hospital id is null" });
          } else if (!newData) {
            res.status(400).json({ error: "New data is null" });
          } else {
            // use method login from userlogin class
            const editHospital = await hospital.editHospital(id, newData);
            res.status(editHospital.http).json(editHospital.data);
          }
        } else {
          // database connection fail
          res.status(500).json({ error: "fail to connect to database" });
        }
      } else {
        res.status(400).json({ error: "Hospital id and new data is null" });
      }
    } catch (err) {
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
}
