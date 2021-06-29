const request = require("supertest");
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.should();
chai.use(chaiHttp)
const server = require("../index");
var app = request.agent(server.app);
var dealsModel = require("../../Deals/models/deals&coupons");


describe("GET Request", function () {
    describe("Getting all the deals from the deals Database.",function(){
    it("A successful get request should return status code equal to 200 and all merchants.", (done) => {
      chai.request(server.app).get("/d/deals").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return all deals.", (done) => {
            chai.request(server.app).get("/d/deal").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

describe("POST Request.", function(){
    describe("Adding a deal into the deals Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
             let res = await chai
         	.request(server.app)
         	.post('/d/deals').send({
                 lmd_id: "123",
                 store: "pro-software developer",
                 offer_text: "ewew",
                 offer_value: "233",
                 title:"tech",
                 code:"2211"
            })

         expect(res.status).to.equal(201);
         res.body.should.be.a('object');
         res.body.should.have.property('_id');
         res.body.should.have.property('lmd_id').eq("123");
         res.body.should.have.property('store').eq("pro-software developer");
         res.body.should.have.property('offer_text').eq("ewew");
         res.body.should.have.property('offer_value').eq("233");
         res.body.should.have.property('title').eq("tech");
         res.body.should.have.property('code').eq("2211");
        });
      afterEach(async () => {
     	 await  dealsModel.deleteOne({lmd_id: "123"})
 	    });
    });
});

 describe("PUT Request.", function(){
     describe("Updating a deal in the deals collection of the D&C Database.",function(){
         it("Successful updation should return status code equal to 200 and the update deal.", async function(){
             const id = "60d3a00443d18e3c9c5f8d3e";
             let res = await chai
         	.request(server.app)
         	.put('/d/deals/' + id).send({
                 store: "ali-baba",
                 title: "$23 off"
     })

     expect(res.status).to.equal(200);
     expect(res).to.be.an('object');
     res.body.should.be.a('object');
     res.body.should.have.property('_id');
     res.body.should.have.property('store').eq("ali-baba");
     res.body.should.have.property('title').eq("$23 off");

      });
      it("If the id doesn't exists.", async function(){
         const id = "360";
         let res = await chai
         .request(server.app)
         .put('/d/deals/' + id).send({
             store: "ali-baba",
             title: "$23 off"
 });

     expect(res.status).to.equal(404);
     expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a deal in the deals collection of the D&C Database.",function(){
        it("Successful deletion should delete a deal and return status code equal to 200.", async function(){
            const id = "60ced094b2384d2a9c6df1e1";
            let res = await chai
        	.request(server.app)
        	.delete('/d/deals/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "232";
        let res = await chai
        .request(server.app)
        .delete('/d/deal/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});