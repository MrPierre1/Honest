"use strict";
var jwt = require("jwt-simple");
// const secret = "thesecretkey";
var secret = process.env.SECRET;
var encode = function (user) {
    try {
        var token = jwt.encode(user, secret);
        return token;
    }
    catch (error) {
        return error;
    }
};
var decodeToken = function (token) {
    try {
        var decoded = jwt.decode(token, secret);
        return decoded;
    }
    catch (error) {
        return error;
    }
};
module.exports = {
    encode: encode,
    decodeToken: decodeToken
};
