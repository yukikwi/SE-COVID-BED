// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");

class Notification{

  async sendApproveNotification(patientData: any) {

    //Destructuring patientData
    const {patientName, patientHospital, patientAddress, patientSubDistrict, patientProvince, patientPhoneNumber, patientEmail, patientSeverity} = patientData.data as any;
    
    // check is mail setup?
    if(process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_PORT && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD){
    //config email
      const transport = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      //content email
      const mailOptions = {
        from: `"Se Covid-19 Bed" <${process.env.EMAIL_SERVER_USER}>`,
        to: patientEmail,
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
    <div style="text-align: center; font-weight: normal; font-size: 24;">Your bed request has been <span style="font-weight: 900">approved</span></div>
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
        <div style="text-align: center; font-weight: normal; font-size: 24;">
            You've been confirmed by <span style="font-weight: 900">${patientHospital}</span><br />
            Please prepare and wait for the hospital staff to contact you.
        </div>
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
      await transport.sendMail(mailOptions, async function (error: any, info: any) {
        transport.close();
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

  async sendDischargeNotification(patientData: any) {

    //Destructuring patientData
    const {patientName, patientHospital, patientAddress, patientSubDistrict, patientProvince, patientPhoneNumber, patientEmail, patientSeverity} = patientData.data as any;
    
    // check is mail setup?
    if(process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_PORT && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD){
    //config email
      const transport = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      //content email
      const mailOptions = {
        from: `"Se Covid-19 Bed" <${process.env.EMAIL_SERVER_USER}>`,
        to: patientEmail,
        subject: "Sorry, Your bed request has been discharge",
        html: `<div
        style="
        margin: 0;
        background: #462F2F;
        width: 100%;
        color: #A98484;
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
        background: #A98484;
        color: #462F2F;
        padding: 2rem;
        "
    >
    <div style="text-align: center; font-weight: normal; font-size: 24;">Your bed request has been <span style="font-weight: 900">discharged</span></div>
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
        <div style="text-align: center; font-weight: normal; font-size: 24;">
            You've been discharged by <span style="font-weight: 900">${patientHospital}</span><br />
            Please prepare and wait for the hospital staff to contact you.
        </div>
    </div>
    <div
        style="
        margin: 0;
        background: #462F2F;
        width: 100%;
        color: #A98484;
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
      await transport.sendMail(mailOptions, async function (error: any, info: any) {
        transport.close();
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

