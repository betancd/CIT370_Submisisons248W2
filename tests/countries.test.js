const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

    
chai.use(chaiHttp);

const token = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMyNjgyNDEwLCJleHAiOjE3MzI3Njg4MTB9.c4cTZA99BKHrDWX5Oxe6jV3bCveXW9EAzFtp07S-N18';

describe('Countries API service', () => {


     
    it('should GET a logged in user\'s unique id, username, and password', (done) => {
        chai
            .request('http://localhost:3000')
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`)
            .end((err, resp) => {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.have.property('body');
                done();
            });
    });
    

    it('should GET a single country', (done) => {
        const expected = [
            {
                Countryid: 1,
                nation: 'Singapore',
                status: 'visited',
                Visit_date: 'May 2024'
            },
        ];
        chai
            .request('http://localhost:3000')
            .get('/api/countries/1')
            .set('Authorization', `Bearer ${token}`)
            .end((err, resp) => {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.not.be.eql(0);
                expect(resp.body).to.eql(expected);
                done();
            });
    });

    it ('should POST a single country', (done) => {
        const newCountry = {
            nation: 'Testonia',
        };
        const expected = { message: 'Created successfully.' };

        chai
            .request('http://localhost:3000')
            .post('/api/countries')
            .set('Authorization', `Bearer ${token}`)
            .send(newCountry)
            .end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.eql(expected);
                done();
            });
    });
});