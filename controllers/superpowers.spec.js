const app = require('../app');
const {
    randomBytes
} = require('crypto');
const moment = require('moment');
const db = require('../models');
const request = require('supertest')(app);
const chai = require('chai');
const should = chai.should();

describe('# Superpowers', () => {
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
    })

    beforeEach(async () => {
        /**
         * Remove all Superheroes after test
         */
        await db.Superpower.destroy({
            where: {}
        });
    });

    it('shoud add a superpower', () => {
        return request.post('/api/v1/superpowers')
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({
                name: 'Freeze vision',
                description: 'Freezes the foe',
            })
            .expect(res => {
                res.body.should.have.property('data');
                res.body.data.should.equal('Superpower added successfully');
            })
            .expect(201);
    });

    it('should not add a superpower if the name already exists', () => {
        return request.post('/api/v1/superpowers')
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({
                name: 'Burn vision',
                description: 'Burns the foe',
            })
            .expect(201)
            .then(() => {
                return request.post('/api/v1/superpowers')
                    .set('Authorization', `Bearer ${accessToken.accessToken}`)
                    .send({
                        name: 'Burn vision',
                        description: 'Burns the foe',
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