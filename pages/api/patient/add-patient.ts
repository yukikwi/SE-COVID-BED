import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../class/database";
import Patient from "../../../class/patient";

export default async function addPatient(
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
          patientName,
          patientHospital,
          patientAddress,
          patientLocation,
          patientPhoneNumber,
          patientStatus,
          patientSeverityLabel,
        } = req.body;

        const dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:SS");

        const addPatient = await patient.addPatient(
          patientName,
          patientHospital,
          patientAddress,
          patientLocation,
          patientPhoneNumber,
          patientStatus,
          patientSeverityLabel,
          dateNow
        );
        res.status(addPatient.http).json(addPatient.data);
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
