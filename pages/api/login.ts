import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../class/database";
import User from "../../class/user";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") { 
    try {
      const database = new Connection();
      const user = new User();
      // can connect database or not
      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const { username, password } = req.body;

        //OOP
        console.log(username)
        const loginData = await user.login(username, password)

        res.status(loginData.http).json(loginData.data)
        //end OOP
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
