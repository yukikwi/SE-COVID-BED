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
        //TODO
        //1 Query by resource "Bed" > 0
        const availableResource = await database.getResource({ resourceName: "Bed", available: { $gte: 0 }});
        console.log("availableResource", availableResource);

        const availableHospitalId = availableResource.map((resource) => resource.resourceHospital as string)

        console.log("availableHospitalId", availableHospitalId);
        
        
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
        console.log("hospitalData", hospitalData);
        //2. calculate distance (google map api)
        //https://maps.googleapis.com/maps/api/d
        // destiny : 13.081805, 99.966332|13.081805, 99.966340
        // origin : 13.081805, 99.966340
        /**
         * [
         *  "13.081805, 99.966332", "13.081805, 99.966332"
         * ]
         */

        const hospitalLocation = hospitalData.map((hospital: any) => {
          return (
            `${hospital.hospitalLocation?.lat}, ${hospital.hospitalLocation?.long}`
        )})        
        console.log("hospitalLocation", hospitalLocation);
        const destinationLocation = hospitalLocation.join('|');
        const originLocation = `${patientLocation.lat}, ${patientLocation.long}`
        console.log("destinationLocation", destinationLocation);
        
        const result = await axios.get(`${process.env.NEXT_PUBLIC_GOOGLE_API}/json?destinations=${destinationLocation}&origins=${originLocation}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`) as any
        const distance = result.data.rows[0].elements.map((item: any, i: number) => {
          return({...item, index: i})
        })
        distance.sort((a: any, b: any) => {
          return(a.distance.value - b.distance.value)
        }
        )
        const shortestHospitalIndex = distance[0].index;
      
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
