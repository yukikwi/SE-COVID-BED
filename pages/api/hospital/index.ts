// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../../class/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const database = new Connection();

      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const hospitalData = await database.getHospitals({
          $or:[
            {
              isDelete: { $exists: false }
            },
            {
              isDelete: false
            }
          ]
        });

        res.status(200).json(hospitalData);
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
