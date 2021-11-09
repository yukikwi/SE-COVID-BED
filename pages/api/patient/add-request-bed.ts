import axios from "axios";
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
          patientAddress,
          patientLocation,
          patientPhoneNumber,
          patientSeverityLabel,
          patientEmail,
        } = req.body;

        const dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:SS");

        console.log("patientLocation", patientLocation);
        //1 Query by resource "Bed" > 0
        const availableResource = await database.getResource({ resourceName: "Bed", available: { $gte: 0 }});
        const availableHospitalId = availableResource.map((resource) => resource.resourceHospital as string)        
        
        //1.5 query active hospital
        const hospitalData = await database.getHospitals({
          $or:[
            {
              isDelete: { $exists: false },
              isAvailable: true,
              _id: {$in:  availableHospitalId},
            },
            {
              isDelete: false,
              isAvailable: true,
              _id: {$in:  availableHospitalId},
            }
          ]
        });

        //2. calculate distance (google map api)
        const shortestHospitalIndex = await patient.decisionHospital(hospitalData, patientLocation);
        
        //3. call addPatient
        const addPatient = await patient.addPatient(
          patientName,
          hospitalData[shortestHospitalIndex]._id as string,
          patientAddress,
          patientLocation,
          patientPhoneNumber,
          "Request",
          patientSeverityLabel,
          dateNow,
          patientEmail
        );
        res.status(addPatient.http).json(addPatient.data);
        // res.status(200).json({name: "john"});

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
