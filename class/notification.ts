import React from 'react'
import Database from "./database";
import Patient from './patient';

import { IPatient, ISeverity } from "./data_struct/patient";

import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

class Notification{

  async sendNotification(patientData: any) {

    //Destructuring patientData
    const {patientName, patientHospital, patientAddress, patientSubDistrict, patientProvince, patientPhoneNumber, patientEmail, patientSeverity} = patientData.data as any;

    // check is mail setup?
    if(process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_PORT && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD){
    //config email
      const transport = nodemailer.createTransport({
        host: 'bara',
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
        html: `<div
        style="
        margin: 0;
        background: #2F3E46;
        width: 100%;
        color: #84A98C;
        text-align: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        "
    >
        <h1>COVID-19</h1>
        <h2>Manage hospital resouce</h2>
    </div>
    <div
        style="
        margin: 0;
        background: #84A98C;
        color: #354F52;
        padding: 2rem;
        "
    >
        <h2 style="text-align: center;">Your bed request has been approved</h2>
        <p style="line-height: 1.5;">
            Bed request information <br />
            <ul>
                <li>Name:    ${patientName}</li>
                <li>Address:    ${patientAddress}</li>
                <li>Subdistrict:    ${patientSubDistrict}</li>
                <li>Province:    ${patientProvince}</li>
                <li>Phone number:    ${patientPhoneNumber}</li>
                <li>Serverity level:    ${patientSeverity}</li>
            </ul>
        </p>
        <h2 style="text-align: center;">
            You've been confirmed by ${patientHospital}<br />
            Please prepare and wait for the hospital staff to contact you.
        </h2>
    </div>
    <div
        style="
        margin: 0;
        background: #2F3E46;
        width: 100%;
        color: #84A98C;
        text-align: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        "
    >
        <span>If you have any question please contact system admin Pachara</span>
    </div>
    `,
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

}

export default Notification

