// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../class/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const user = new User();
      const userData = await user.getAllHospitalStaff()
      res.status(200).json(userData);
    } catch (err) {
      console.log("err", err);
      res.status(400).end();
    }
  } else {
    console.log("method");

    res.status(400).end();
  }
}
