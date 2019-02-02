const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
let server = "http://localhost:3001";

chai.use(chaiHttp);

describe("API Routes", function() {
  describe("User Routes", function() {
    it("can get 1 user", function(done) {
      chai
        .request(server)
        .get("/user/8")
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.any.keys("id");
          done();
        });
    });
    it("can get login", function(done) {
      chai
        .request(server)
        .post("/user/login")
        .send({
          email: "nadia@test.com",
          password: "passwordn"
        })
        .end(function(err, res) {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
});
