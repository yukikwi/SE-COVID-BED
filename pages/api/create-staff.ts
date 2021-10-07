import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../class/connection";
import { UserModel } from "../../class/model/index";
import { hash } from "bcrypt";

type Data = {
  code?: string,
  error?: string;
};

export default async function createStaff(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
      const database = new connection()
      // can connect database or not
      const isDatabaseConnected = await database.connectDatabase()
      if(isDatabaseConnected === true){
        // const {username, password} = req.body;
        const username = "capybara"
        const password = "123456"
        const hashpassword = await hash(password, 12);
        console.log("isDatabaseConnected")
        const newUser = new UserModel({username: username, password: hashpassword})
        const userdata = await newUser.save()
        
        console.log("success", userdata)
        //compare password
        
        res.status(200).json({ code: "Success" });
      }
      else{
        // database connection fail
        res.status(500).json({ error: 'fail to connect to database' })
      }
  } catch (error) {
    console.log(error)
  }
  res.status(400).end();
}
