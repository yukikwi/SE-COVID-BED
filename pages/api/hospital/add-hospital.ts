import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../../class/database";
import Hospital from "../../../class/hospital";

export default async function addHospital(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const database = new Connection();
      const hospital = new Hospital();

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const {
          hospitalName,
          hospitalPhoneNumber,
          hospitalAddress,
          hospitalSubDistrict,
          hospitalDistrict,
          hospitalProvince,
          hospitalLocationLat,
          hospitalLocationLong,
          staff,
        } = req.body;

        const addHospitalStatus = await hospital.addHospital(
          hospitalName,
          hospitalPhoneNumber,
          hospitalAddress,
          hospitalSubDistrict,
          hospitalDistrict,
          hospitalProvince,
          hospitalLocationLat,
          hospitalLocationLong,
          staff
        );
        res.status(addHospitalStatus.http).json(addHospitalStatus.data);
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
