var fs = require("fs");

const sendmail = require("sendmail")();
const requestCall = require("request");

const createDirectReports = (manager_id, direct_reports) => {
  console.log("data from helper", manager_id, direct_reports);

  requestCall.post(
    "http://localhost:3000/manager/",
    {
      json: {
        manager_id,
        direct_reports
      }
    },
    function (err, httpResponse, body) {
      if (err) {
        console.log("error  from helper for manager", err);
      }
    }
  );
};

const sendEmail = async (email, managerID) => {
  try {
    const resultFromSentEmail = sendmail(
      {
        from: "nneal@friendshipchristian.net",
        to: email,
        subject: `test sendmail ${Date.now()}`,
        html: `
      <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box; min-width: 100% !important;" width="100%">
        <tr>
          <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;" valign="top" bgcolor="#3498db" align="center"> 
                <a href="http://localhost:3001/signup/${managerID}" class="btn btn-primary">Click Here To Create An Account</a>
                 </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      `
      }

      // ,
      // function(err, reply) {
      //   if (err) {
      //     console.log("error from sending email", err);
      //   }

      //   // console.dir(reply);
      // }
    );

    // console.log(
    //   "direct_reports have arrived",
    //   direct_reports,
    //   typeof direct_reports,
    //   typeof resultFromSentEmail,
    //   resultFromSentEmail
    // );
    // const dbData = Object.assign({}, oneUserData[0]);
    return resultFromSentEmail;
  } catch (error) {
    console.log("errof from sending email", error);
    return error;
  }
};

const imageUpload = function (
  imagePath,
  targetPath,
  originalFileName,
  email
) {
  console.log(imagePath, targetPath, originalFileName);
  fs.mkdirSync(targetPath + email + "/");
  var dest = fs.createWriteStream(targetPath + email + "/" + originalFileName);
};

const checkValues = (value1, value2, value3) => {
  if (!value1 || !value2 || !value3) {
    return false;
  }
  return true;
};
module.exports = {
  imageUpload,
  checkValues,
  sendEmail,
  createDirectReports
};
