import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    res.setHeader('Set-Cookie', serialize('auth_token', '', { maxAge: -1, path: '/' }));
    res.status(200).json({status: 'bye'});
  }
}