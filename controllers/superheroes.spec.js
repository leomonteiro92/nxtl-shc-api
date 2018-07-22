const app = require('../app');
const db = require('../models');
const request = require('supertest')(app);
const chai = require('chai');
const should = chai.should();

describe('# Superheroes', () => {
    before(async ()=> {
        /**
         * Create a default accessToken to authorize endpoints
         */
    });

    beforeEach(async () => {
        /**
         * Remove all Superheroes after test
         */
        await db.Superhero.destroy({where: {}});
    });

    it('shoud add some superhero', () => {
        return request.post('/api/v1/superheroes')
            .send({
                alias: 'Peter Parker',
                name: 'Spiderman',
            })
            .expect(res => {
                res.body.should.have.property('data');
                res.body.data.should.equal('Superhero added successfully');
            })
            .expect(201);
    });

    it('should not add a superhero if the name is already taken', () => {
        return request.post('/api/v1/superheroes')
            .send({
                alias: 'Clark Kent',
                name: 'Superman',
            })
            .expect(201)
            .then(() => {
                return request.post('/api/v1/superheroes')
                    .send({
                        alias: 'Clark Kent',
                        name: 'Superman'
                    })
                    .expect(400)
                    .expect(res => {
                        res.body.should.have.property('error');
                        res.body.error.should.equal('Validation error');
                    })
            });
    });

    it('should not add a superhero if no data was sent', () => {

    });

    it('should update a superhero', () => {});

    it('should not update a superhero if no data was sent', () => {});

    it('should return bad request if the id of url is malformed', () => {});
});