const prefix = '/api/v1';

module.exports = app => {
  app.use(`${prefix}/login`, app.oauth.token());
  app.use(`${prefix}/users`, app.oauth.authenticate(), app.acl, require('./users'));
  app.use(`${prefix}/superheroes`, app.oauth.authenticate(), app.acl, require('./superheroes'));
  app.use(`${prefix}/superpowers`, app.oauth.authenticate(), app.acl, require('./superpowers'));
};