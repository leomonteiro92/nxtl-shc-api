const app = require('../app');
const {
    randomBytes
} = require('crypto');
const moment = require('moment');
const db = require('../models');
const request = require('supertest')(app);
const chai = require('chai');
const should = chai.should();

describe('# Superheroes', () => {
    let accessToken = {
        accessToken: randomBytes(16).toString('hex'),
        accessTokenExpiresOn: moment().add(1, 'day').toDate(),
        clientId: 1,
        refreshToken: randomBytes(16).toString('hex'),
        refreshTokenExpiresOn: moment().add(1, 'day').toDate(),
        userId: 1
    };

    before(async () => {
        /**
         * Create a default accessToken to authorize endpoints
         */
        accessToken = await db.OAuthToken.create(accessToken);
    });

    after(async () => {
        /**
         * Remove default accessToken
         */
        await db.OAuthToken.destroy({
            where: {
                accessToken: accessToken.accessToken
            }
        });
    });

    beforeEach(async () => {
        /**
         * Remove all Superheroes after test
         */
        await db.Superhero.destroy({
            where: {}
        });
    });

    it('shoud add some superhero', () => {
        return request.post('/api/v1/superheroes')
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({
                alias: 'Peter Parker',
                name: 'Spiderman',
                protectionAreaId: 5
            })
            .expect(res => {
                res.body.should.have.property('data');
                res.body.data.should.equal('Superhero added successfully');
            })
            .expect(201);
    });

    it('should not add a superhero if the name is already taken', () => {
        return request.post('/api/v1/superheroes')
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({
                alias: 'Clark Kent',
                name: 'Superman',
                protectionAreaId: 5
            })
            .expect(201)
            .then(() => {
                return request.post('/api/v1/superheroes')
                    .set('Authorization', `Bearer ${accessToken.accessToken}`)
                    .send({
                        alias: 'Clark Kent',
                        name: 'Superman',
                        protectionAreaId: 5
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