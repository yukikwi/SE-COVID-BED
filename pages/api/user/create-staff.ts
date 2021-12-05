import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../../class/database";
import { UserModel } from "../../../class/model/index";
import { hash } from "bcrypt";

export default async function createStaff(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
      const database = new connection()
      // can connect database or not
      const isDatabaseConnected = await database.connectDatabase()
      if(isDatabaseConnected === true){
        const {username, password} = req.body;
        const hashpassword = await hash(password, 12);
        const newUser = new UserModel({username: username, password: hashpassword})
        await newUser.save()
        
        res.status(200).json({ code: "Success" });
      } else {
        // database connection fail
        res.status(500).json({ error: 'fail to connect to database' })
      }
  } catch (error) {
    console.log(error)
  }
  res.status(400).end();
}
