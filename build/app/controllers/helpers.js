"use strict";
var fs = require("fs");
var imageUpload = function (imagePath, targetPath, originalFileName, email) {
    // var tmp_path = request.file.path;
    // /** The original name of the uploaded file
    //     stored in the variable "originalname". **/
    // var target_path = "uploads/" + request.file.originalname;
    // var src = fs.createReadStream(tmp_path);
    // var dest = fs.createWriteStream(target_path);
    console.log(imagePath, targetPath, originalFileName);
    //   var target_path = targetPath + originalFileName;
    //   const target_path =
    fs.mkdirSync(targetPath + email + "/");
    //   var src = fs.createReadStream(targetPath + email + "/");
    var dest = fs.createWriteStream(targetPath + email + "/" + originalFileName);
    // src.pipe(dest);
    //   src.on("end", function() {
    //     console.log("image saved");
    //     return { message: "image uploaded" };
    //   });
    //   src.on("error", function(err) {
    //     console.log("image errpr.", err);
    //     return { message: "image failed ot upload", error: err };
    //   });
};
module.exports = {
    imageUpload: imageUpload
};
