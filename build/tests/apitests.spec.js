"use strict";
var chai = require("chai");
var expect = require("chai").expect;
var chaiHttp = require("chai-http");
var server = "http://localhost:3000";
var fakeData = "../app/controllers/helpers.ts";
var fs = require("fs");
var faker = require("faker");
chai.use(chaiHttp);
describe("API Routes", function () {
    describe("User Routes", function () {
        it("can get 1 user", function (done) {
            chai
                .request(server)
                .get("/user/10")
                .end(function (err, res) {
                expect(res.status).to.equal(200);
                // expect(res.body).to.have.any.keys("id");
                done();
            });
        });
        it("can get login", function (done) {
            chai
                .request(server)
                .post("/user/login")
                .send({
                email: "nadia@test.com",
                password: "passwordn"
            })
                .end(function (err, res) {
                expect(res.status).to.equal(201);
                done();
            });
        });
        it("can get signup", function (done) {
            chai
                .request(server)
                .post("/user/signup")
                .type("form")
                .field({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
                .attach("file", fs.readFileSync(__dirname + "/currentjob.png"), "currentjob.png")
                .end(function (err, res) {
                expect(res.status).to.equal(201);
                done();
            });
        });
    });
    describe("Task Routes", function () {
        it("can get 1 task", function (done) {
            chai
                .request(server)
                .get("/task/1")
                .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
        });
    });
    describe("Events Routes", function () {
        it("can get 1 event", function (done) {
            chai
                .request(server)
                .get("/event/3")
                .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.any.keys("event_id");
                done();
            });
        });
    });
});
