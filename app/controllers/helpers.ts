var fs = require("fs");

const sendmail = require("sendmail")();

const sendEmail = async () => {
  try {
    const resultFromSentEmail = sendmail(
      {
        from: "nneal@friendshipchristian.net",
        to: "jpieree1fchd@gmail.com",
        subject: `test sendmail ${Date.now()}`,
        html: `
      <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box; min-width: 100% !important;" width="100%">
        <tr>
          <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;" valign="top" bgcolor="#3498db" align="center"> 
                <a href="http://localhost:3001/signup" class="btn btn-primary">Click Here To Create An Account</a>
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
    // const dbData = Object.assign({}, oneUserData[0]);
    return resultFromSentEmail;
  } catch (error) {
    console.log("errof from sending email", error);
    return error;
  }
};

const imageUpload = function(
  imagePath: string,
  targetPath: string,
  originalFileName: string,
  email: string
) {
  console.log(imagePath, targetPath, originalFileName);
  fs.mkdirSync(targetPath + email + "/");
  var dest = fs.createWriteStream(targetPath + email + "/" + originalFileName);
};

const checkValues = (value1: any, value2: any, value3: any) => {
  if (!value1 || !value2 || !value3) {
    return false;
  }
  return true;
};
module.exports = {
  imageUpload,
  checkValues,
  sendEmail
};
