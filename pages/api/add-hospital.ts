import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../class/database";
import System from "../../class/system";

export default async function addHospital(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const database = new Connection();
      const system = new System();

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const { hospitalName, hospitalPhoneNumber, hospitalConvince,
          hospitalAddress, hospitalLocationLat, hospitalLocationLong,
          hospitalStatus } = req.body;

        // use method login from userlogin class
        const loginData = await system.addHospital(hospitalName, hospitalPhoneNumber, hospitalConvince, hospitalAddress, hospitalLocationLat, hospitalLocationLong, hospitalStatus);
        res.status(loginData.http).json(loginData.data);
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
