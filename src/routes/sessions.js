const express = require('express');
const router = express.Router();

const sessionsService = require('../app/services/SessionsService');
/**
 * @swagger
 * /sessions/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '401':
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example: 
 *               message: Account not found
 *               code: 401
 *       '500':    
 *          description: Internal Server Error
 */
router.post('/login', sessionsService.create);

module.exports = router;
