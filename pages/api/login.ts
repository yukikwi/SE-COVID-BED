import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../database/connection";
import { User, IUser } from "../../database/model/index";
import { compare } from "bcrypt";

type Data = {
  name?: string;
  error?: string;
  data?: IUser | null;
  code?: string;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const database = new connection();
    // can connect database or not
    const isDatabaseConnected = await database.connectDatabase();
    if (isDatabaseConnected === true) {
      // const {username, password} = req.body;
      
      //test variable
      const password = "123456";
      const username = "capybara";

      //query userData by username
      const userData = await User.findOne({ username });
      //compare password
      if (userData && userData.password) {
        const isUser = await compare(password, userData.password);
        if (isUser) {
          res.status(200).json({ code: "Success" });
        } else {
          res.status(401).json({ error: "fail to login" });
        }
        console.log(userData);
      } else {
        res.status(404).json({ error: "username not found" });
      }
    } else {
      // database connection fail
      res.status(500).json({ error: "fail to connect to database" });
    }
  } catch (err) {
    res.status(400).end();
  }
}
