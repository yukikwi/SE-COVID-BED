import type { NextApiRequest, NextApiResponse } from "next";
import Connection from "../../class/database";
import User from "../../class/user";
import { serialize } from 'cookie'

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const database = new Connection();
  const user = new User();
  if (req.method === "POST") {
    try {
      // can connect database or not
      const isDatabaseConnected = await database.connectDatabase();
      if (isDatabaseConnected === true) {
        const { username, password } = req.body;
        
        // use method login from userlogin class
        const loginData = await user.login(username, password);

        // set auth token if get userData
        if(loginData.data.userData && typeof(loginData.data.userData.token) === 'string'){
          // set cookie to store token
          res.setHeader('Set-Cookie', serialize('auth_token', loginData.data.userData.token, { path: '/' }));
          // remove sensitive data
          loginData.data.userData.token = undefined
          loginData.data.userData.password = undefined
        }
        res.status(loginData.http).json(loginData.data);

      } else {
        // database connection fail
        res.status(500).json({ error: "fail to connect to database" });
      }
    } catch (err) {
      res.status(400).end();
    }
  } else {
    // if already login
    if(req.cookies.auth_token){
      try {
        // can connect database or not
        const isDatabaseConnected = await database.connectDatabase();
        if (isDatabaseConnected === true) {// use method login from userlogin class
          const token = req.cookies.auth_token
          const loginData = await user.loginFromToken(token);
          // remove sensitive data
          if(loginData.data.userData && typeof(loginData.data.userData.token) === 'string'){
            // remove sensitive data
            loginData.data.userData.token = undefined
            loginData.data.userData.password = undefined
          }

          res.status(loginData.http).json(loginData.data);
        }
        else {
          // database connection fail
          res.status(500).json({ error: "fail to connect to database" });
        }
      } catch (err) {
        res.status(400).end();
      }
    }

    res.status(400).end();
  }
}
