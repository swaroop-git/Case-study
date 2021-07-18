// const expect = require("chai").expect;
const request = require("supertest");
// const prompt = require("prompt-sync")();
// const { helloWorld } = require("../testFunctions");
// const testFunctions = require("../testFunctions");

// helloWorld = testFunctions.helloWorld();
// var a = prompt("Enter number 1: ");
// var b = prompt("Enter number 2: ");
// multiply = testFunctions.multiply(Number(a),Number(b));
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.should();
chai.use(chaiHttp)
const server = require("../index");
var app = request.agent(server.app);
var userModel = require("../../merchants/models/merchant");


describe("GET Request", function () {
    describe("Getting all the merchants from the merchants collection of the DealsandCouponsUsers Database.",function(){
    it("A successful get request should return status code equal to 200 and all merchants.", (done) => {
      chai.request(server.app).get("/m/merchant").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return all merchant.", (done) => {
            chai.request(server.app).get("/m/merchants").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

 describe("POST Request.", function(){
    describe("Adding a merchant into the merchants collection of the DealsandCouponsUsers Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
             let res = await chai
         	.request(server.app)
         	.post('/m/merchant').send({
                 name: "talif",
                 product: "pro-software developer",
                 available: true,
                 price: 123456789
            })

     expect(res.status).to.equal(201);
     res.body.should.be.a('object');
     res.body.should.have.property('_id');
     res.body.should.have.property('name').eq("talif");
     res.body.should.have.property('product').eq("pro-software developer");
     res.body.should.have.property('available').eq(true);
     res.body.should.have.property('price').eq(123456789);
      });
      afterEach(async () => {
     	await userModel.deleteOne({name: "talif"})
 	    });
    });
});

 describe("PUT Request.", function(){
     describe("Updating a user in the users collection of the DealsandCouponsUsers Database.",function(){
         it("Successful updation should return status code equal to 200 and the updated user.", async function(){
             const id = "60cf1ad320fa1b2f1c3e7aa6";
             let res = await chai
         	.request(server.app)
         	.put('/m/merchant/' + id).send({
                 name: "ali-baba",
                 product:"retailer"
     })

     expect(res.status).to.equal(200);
     expect(res).to.be.an('object');
     res.body.should.be.a('object');
     res.body.should.have.property('_id');
     res.body.should.have.property('name').eq("ali-baba");
     res.body.should.have.property('product').eq("retailer");
     res.body.should.have.property('price').eq(50);
      });
      it("If the id doesn't exists.", async function(){
         const id = "360";
         let res = await chai
         .request(server.app)
         .put('/m/merchant/' + id).send({
             name: "ali-baba",
             product: "retailer"
 });

     expect(res.status).to.equal(404);
     expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a merchant in the merchants collection of the D&C merchant Database.",function(){
        it("Successful deletion should delete a merchant and return status code equal to 200.", async function(){
            const id = "60ced094b2384d2a9c6df1e1";
            let res = await chai
        	.request(server.app)
        	.delete('/m/merchant/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/m/merchants/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});