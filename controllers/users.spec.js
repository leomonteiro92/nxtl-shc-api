const app = require('../app');
const {
    randomBytes
} = require('crypto');
const {
    hashSync
} = require('bcrypt');
const moment = require('moment');
const db = require('../models');
const request = require('supertest')(app);
const chai = require('chai');
const should = chai.should();
const {
    Op
} = db.Sequelize;

describe('# Users', () => {
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

    afterEach(async () => {
        /**
         * Remove all Users, excepts for the admin, after each test
         */
        await db.User.destroy({
            where: {
                id: {
                    [Op.ne]: 1
                }
            }
        });
    });

    it('shoud add an user', () => {
        return request.post('/api/v1/users')
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({
                username: 'User 1',
                password: '123456',
                role: 'standard'
            })
            .expect(res => {
                res.body.should.have.property('data');
                res.body.data.should.equal('User added successfully');
            })
            .expect(201);
    });

    it('should not add an user if the username alredy exists', () => {
        return request.post('/api/v1/users')
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({
                username: 'User 2',
                password: '123456',
                role: 'standard'
            })
            .expect(201)
            .then(() => {
                return request.post('/api/v1/users')
                    .set('Authorization', `Bearer ${accessToken.accessToken}`)
                    .send({
                        username: 'User 2',
                        password: '123456',
                        role: 'standard'
                    })
                    .expect(400)
                    .expect(res => {
                        res.body.should.have.property('error');
                        res.body.error.should.equal('Validation error');
                    })
            });
    });

    it('should not add a user if no data was sent', () => {
        return request.post('/api/v1/users')
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({})
            .expect(400)
            .expect(res => {
                res.body.should.have.property('error');
                res.body.error.should.equal('Missing attribute \'username\'');
            });
    });

    it('should update an user', () => {
        let user = {
            username: 'testing',
            password: hashSync('123456', 10).toString('hex')
        };
        return db.User.create(user).then(user => {
            return request.put(`/api/v1/users/${user.id}`)
                .set('Authorization', `Bearer ${accessToken.accessToken}`)
                .send({
                    username: 'updatedUser'
                })
                .expect(204)
                .then(() => {
                    return request.get(`/api/v1/users/${user.id}`)
                        .set('Authorization', `Bearer ${accessToken.accessToken}`)
                        .expect(200)
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('username');
                    res.body.data.username.should.equal('updatedUser');
                })
        })

    });

    it('should return bad request if the id of url is malformed', () => {
        const fakeId = 3405;
        return request.put(`/api/v1/users/${fakeId}`)
            .set('Authorization', `Bearer ${accessToken.accessToken}`)
            .send({
                username: 'updatedUser'
            })
            .expect(400)
            .expect(res => {
                res.body.should.have.property('error');
                res.body.error.should.equal(`User not found with id:${fakeId}`);
            });
    });

    it('should count and list the users already in the database', () => {

    });

    it('should get one user by id', () => {

    });

    it('should not get one if the id is malformed or not found', () => {

    });

    it('should delete an user by id', () => {

    });

    it('should not delete and user if the id is malformed', () => {

    });
});