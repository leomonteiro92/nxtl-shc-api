const ACL = require('acl');
const redis = require('redis');
const acl = new ACL(new ACL.redisBackend(redis.createClient()));

acl.allow([{
    roles: 'admin',
    allows: [{
        resources: 'users',
        permissions: '*'
    }, {
        resources: 'superheroes',
        permissions: '*'
    }, {
        resources: 'superpowers',
        permissions: '*'
    }]
}, {
    roles: 'standard',
    allows: [{
        resources: 'users',
        permissions: 'get'
    }, {
        resources: 'superheroes',
        permissions: 'get'
    }, {
        resources: 'superpowers',
        permissions: 'get'
    }]
}]);

acl.addUserRoles(1, 'admin');

module.exports.acl = acl;

module.exports.middleware = app => {
    app.acl = (req, res, next) => {
        const user = res.locals.oauth.token.user;
        const method = req.method.toLowerCase();
        const resource = req.originalUrl.split('/')[3];
        return acl.isAllowed(user.id, resource, method, (err, isAllowed) => {
            if (err) {
                return res.status(500).send({
                    error: err.message
                });
            } else if (!isAllowed) {
                return res.status(403).send({
                    error: 'User has no access to this resource'
                })
            } else {
                next();
            }
        });
    }
};