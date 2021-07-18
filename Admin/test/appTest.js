const request = require("supertest");
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.should();
chai.use(chaiHttp)
const server = require("../index");
var app = request.agent(server.app);
var adminModel = require("../../Admin/models/admin");


describe("GET Request", function () {
    describe("Getting all the admin from the admins collection of the D&C Admin Database.",function(){
    it("A successful get request should return status code equal to 200 and all admin.", (done) => {
      chai.request(server.app).get("/a/admin").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return all admin.", (done) => {
            chai.request(server.app).get("/a/admins").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

 describe("POST Request.", function(){
    describe("Adding a admmin into the admins collection of the Admin Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
             let res = await chai
         	.request(server.app)
         	.post('/a/admin').send({
                 name: "swaroop",
                 email: "swaroop@gmail.com",
                 phone: "1234"
            })

     expect(res.status).to.equal(200);
     res.body.should.be.a('object');
     res.body.should.have.property('_id');
     res.body.should.have.property('name').eq("swaroop");
     res.body.should.have.property('email').eq("swaroop@gmail.com");
     res.body.should.have.property('phone').eq("1234");
      });
      afterEach(async () => {
     	await adminModel.deleteOne({name: "swaroop"})
 	    });
    });
});

 describe("PUT Request.", function(){
     describe("Updating a admin in the admins collection of the D&C Admin Database.",function(){
         it("Successful updation should return status code equal to 200 and the updated admin.", async function(){
             const id = "60e1802e3715db6084e17533";
             let res = await chai
         	.request(server.app)
         	.put('/a/admin/' + id).send({
                 name: "talif",
                 phone: "54321"
     })

     expect(res.status).to.equal(200);
    // expect(res).to.be.an('object');
     res.body.should.be.a('object');
     res.body.should.have.property('_id');
     res.body.should.have.property('name').eq("talif");
     res.body.should.have.property('email').eq("ram@gmail.com");
     res.body.should.have.property('phone').eq("54321");
      });
      it("If the id doesn't exists.", async function(){
         const id = "360";
         let res = await chai
         .request(server.app)
         .put('/a/admin/' + id).send({
             name: "talif",
             phone: 54321
 });

     expect(res.status).to.equal(404);
     expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a admin in the admins collection of the D&C Admin Database.",function(){
        it("Successful deletion should delete a admin and return status code equal to 200.", async function(){
            const id = "60d33422565f4b22b01c426a";
            let res = await chai
        	.request(server.app)
        	.delete('/a/admin/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/a/admin/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});