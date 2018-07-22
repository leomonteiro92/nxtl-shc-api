const ACL = require('acl');
const acl = new ACL(new ACL.memoryBackend());

acl.allow([{
    roles: 'admin',
    allows: [{
        resources: '/users',
        permissions: '*'
    }, {
        resources: '/superheroes',
        permissions: '*'
    }, {
        resources: '/superpowers',
        permissions: '*'
    }]
}, {
    roles: 'standard',
    allows: [{
        resources: '/users',
        permissions: 'get'
    }, {
        resources: '/superheroes',
        permissions: 'get'
    }, {
        resources: '/superpowers',
        permissions: 'get'
    }]
}]);

module.exports = acl;