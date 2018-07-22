const {
    Router
} = require('express');
const router = Router();
const {
    users
} = require('../controllers');

/**
 * @swagger
 *  definition:
 *      users:
 *          properties:
 *              password:
 *                  type: string
 *              username:
 *                  type: string
 */

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      description: Returns a list of users
 *  produces:
 *      - application/json
 *  responses:
 *      200:
 *          description: An array of users
 *          schema:
 *              $ref: '#/definitions/users'
 */
router.get('/', users.list);
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      description: Returns a list of users
 *  produces:
 *      - application/json
 *  responses:
 *      200:
 *          description: An array of users
 *          schema:
 *              $ref: '#/definitions/users'
 */
router.get('/:id', users.fetch);
/**
 * @swagger
 * /api/v1/users:
 *  post:
 *      description: Returns a list of users
 *  produces:
 *      - application/json
 *  responses:
 *      200:
 *          description: An array of users
 *          schema:
 *              $ref: '#/definitions/users'
 */
router.post('/', users.create);
/**
 * @swagger
 * /api/v1/users:
 *  put:
 *      description: Returns a list of users
 *  produces:
 *      - application/json
 *  responses:
 *      200:
 *          description: An array of users
 *          schema:
 *              $ref: '#/definitions/users'
 */
router.put('/:id', users.update);
/**
 * @swagger
 * /api/v1/users:
 *  delete:
 *      description: Returns a list of users
 *  produces:
 *      - application/json
 *  responses:
 *      200:
 *          description: An array of users
 *          schema:
 *              $ref: '#/definitions/users'
 */
router.delete('/:id', users.delete);

module.exports = router;