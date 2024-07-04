const express = require('express');
const router = express.Router();

const usersService = require('../app/services/UsersService');

router.put('/update/profile', usersService.updateProfile);
router.put('/update/phone', usersService.updatePhone);
router.put('/update/email', usersService.updateEmail);
router.put('/update/password', usersService.updatePassword);
router.post('/avatar', usersService.getAvatar);
router.delete('/', usersService.deleteUser);

/**
 * @swagger
 * /users/{slug}:
 *  get:
 *      summary: Get specific user by ID
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: slug
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the user
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                        allOf:
 *                          - $ref: '#/components/schemas/Response'
 *                          - properties:
 *                              body:
 *                                  type: object
 *                                  properties:
 *                                      user:
 *                                        allOf:
 *                                          - $ref: '#/components/schemas/Id'
 *                                          - $ref: '#/components/schemas/Authentication'
 *                                          - $ref: '#/components/schemas/User'
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/Response'
 *                      example:
 *                        message: User not found
 *                        code: 404
 *          500:
 *              description: Internal Server Error
 */
router.get('/:slug', usersService.show);

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get a list of all users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/Id'
 *                                  - $ref: '#/components/schemas/Authentication'
 *                                  - $ref: '#/components/schemas/User'
 *          500:
 *              description: Internal Server Error
 */
router.get('/', usersService.index);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/Authentication'
 *               - $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *                  message: User created successfully
 *                  code: 201
 *                  body:
 *                      accessToken: ab.cd.ef
 *                      user:
 *                          id: 1
 *                          role: normal
 *                          name: NormalUser
 *                          avatar: https://example.com/avatar.png
 *       '409':
 *           description: This email already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Response'
 *               example:
 *                 message: This email already exists
 *                 code: 409
 *                 body: ''
 *       '500':
 *         description: Internal Server Error
 */
router.post('/', usersService.create);

module.exports = router;
