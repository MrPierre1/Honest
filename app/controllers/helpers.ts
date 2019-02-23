var fs = require("fs");

const imageUpload = function(
  imagePath: string,
  targetPath: string,
  originalFileName: string,
  email: string
) {
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

const checkValues = (value1: any, value2: any, value3: any) => {
  if (!value1 || !value2 || !value3) {
    return false;
  }
  return true;
};
module.exports = {
  imageUpload,
  checkValues
};
