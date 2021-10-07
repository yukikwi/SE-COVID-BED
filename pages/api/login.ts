import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../database/connection";
import User from "../../database/user";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const database = new Connection();
    const user = new User();
    // can connect database or not
    const isDatabaseConnected = await database.connectDatabase();
    if (isDatabaseConnected === true) {
      // const {username, password} = req.body;
      
      //test variable
      const password = "123456";
      const username = "capybara";

      //OOP
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
}
