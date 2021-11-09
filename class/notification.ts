import React from 'react'
import Database from "./database";
import { IPatient, ISeverity } from "./data_struct/patient";
import { IHospital } from "./data_struct/hospital";
import axios from "axios";

const nodemailer = require("nodemailer");

class Notification {
  private database: Database;
  private patient: IPatient | any;

  constructor() {
    this.database = new Database();
    this.patient = {};
  }

  async sendNotification(patientEmail: any) {



    //config email
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    //content email
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: patientEmail, // FIXME: patient email
      subject: "Your bed request has been approved",
      html: ``,
    }

    //send email
    transport.sendMail(mailOptions, async function (error: any, info: any) {
      if(error) {
        return {
          http: 400,
          data: "Fail to send email",
        };
      } else {
        return {
          http: 200,
          data: "Send email successfully",
        };
      }
    })
  }

}

export default Notification

