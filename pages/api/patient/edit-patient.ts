import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../class/database";
import Patient from "../../../class/patient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const database = new Database();
      const patient = new Patient();

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const { id, newData, newPatientSeverityLog } = req.body;
        const dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:SS");

        // use method login from userlogin class
        if (newData && newPatientSeverityLog) {
          console.log("both");
          const newSeverity: any = {
            patientSeverityLabel: newPatientSeverityLog.patientSeverityLabel,
            patientSeverityDateStart: dateNow,
            patientSeverityDateEnd: "9999-12-31 00:00:00",
            patient: newPatientSeverityLog.patient,
          };

          const editPatient = await patient.editPatient(id, newData);
          const editActiveSeverity = await patient.editActiveSeverity(
            newSeverity
          );

          res.status(editPatient.http).json(editPatient.data);
        } else if (newData) {
          console.log("data");
          const editPatient = await patient.editPatient(id, newData);

          res.status(editPatient.http).json(editPatient.data);
        } else {
          console.log("else");
          const newSeverity: any = {
            patientSeverityLabel: newPatientSeverityLog.patientSeverityLabel,
            patientSeverityDateStart: dateNow,
            patientSeverityDateEnd: "9999-12-31 00:00:00",
            patient: newPatientSeverityLog.patient,
          };
          const editActiveSeverity = await patient.editActiveSeverity(
            newSeverity
          );

          res.status(editActiveSeverity.http).json(editActiveSeverity.data);
        }
      } else {
        // database connection fail
        res.status(500).json({ error: "fail to connect to database" });
      }
    } catch (err) {
      console.log("error", err);

      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
}
