"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require("fs");
var sendmail = require("sendmail")();
var requestCall = require("request");
var createDirectReports = function (manager_id, direct_reports) {
    console.log("data from helper", manager_id, direct_reports);
    requestCall.post("http://localhost:3000/manager/", {
        json: {
            manager_id: manager_id,
            direct_reports: direct_reports
        }
    }, function (err, httpResponse, body) {
        if (err) {
            console.log("error  from helper for manager", err);
        }
    });
};
var sendEmail = function (email, managerID) { return __awaiter(_this, void 0, void 0, function () {
    var resultFromSentEmail;
    return __generator(this, function (_a) {
        try {
            resultFromSentEmail = sendmail({
                from: "nneal@friendshipchristian.net",
                to: email,
                subject: "test sendmail " + Date.now(),
                html: "\n      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box; min-width: 100% !important;\" width=\"100%\">\n        <tr>\n          <td align=\"center\" style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;\" valign=\"top\">\n            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\">\n              <tr>\n                <td style=\"font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;\" valign=\"top\" bgcolor=\"#3498db\" align=\"center\"> \n                <a href=\"http://localhost:3001/signup/" + managerID + "\" class=\"btn btn-primary\">Click Here To Create An Account</a>\n                 </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n      </table>\n      "
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
            return [2 /*return*/, resultFromSentEmail];
        }
        catch (error) {
            console.log("errof from sending email", error);
            return [2 /*return*/, error];
        }
        return [2 /*return*/];
    });
}); };
var imageUpload = function (imagePath, targetPath, originalFileName, email) {
    console.log(imagePath, targetPath, originalFileName);
    fs.mkdirSync(targetPath + email + "/");
    var dest = fs.createWriteStream(targetPath + email + "/" + originalFileName);
};
var checkValues = function (value1, value2, value3) {
    if (!value1 || !value2 || !value3) {
        return false;
    }
    return true;
};
module.exports = {
    imageUpload: imageUpload,
    checkValues: checkValues,
    sendEmail: sendEmail,
    createDirectReports: createDirectReports
};
