const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const server = "http://localhost:3001";
chai.use(chaiHttp);

describe("API Routes", () => {
  describe("User Routes", () => {
    it("can get 1 user", done => {
      chai
        .request(server)
        .get("/user/8")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.any.keys("id");
          done();
        });
    });
    it("can get login", done => {
      chai
        .request(server)
        .post("/user/login")
        .send({
          email: "nadia@test.com",
          password: "passwordn"
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe("Task Routes", () => {
    it("can get 1 task", done => {
      chai
        .request(server)
        .get("/task/1")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.any.keys("task_id");
          done();
        });
    });
  });

  describe("Events Routes", () => {
    it("can get 1 event", done => {
      chai
        .request(server)
        .get("/event/3")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.any.keys("event_id");
          done();
        });
    });
  });
});
