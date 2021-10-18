// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Schema } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../../class/database";
import Hospital from "../../../class/hospital";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const database = new Connection();

      const isDatabaseConnected = await database.connectDatabase();

      if (isDatabaseConnected === true) {
        const hospitalData = await database.getAHospital(id as string);
        console.log("hospital::", hospitalData);

        res.status(200).json(hospitalData);
      } else {
        // database connection fail
        res.status(500).json({ error: "fail to connect to database" });
      }
    } catch (err) {
      console.log("err", err);
      res.status(400).end();
    }
  } else {
    console.log("method");

    res.status(400).end();
  }
}
