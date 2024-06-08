const router = require('express').Router();
const passport = require('passport');
const authService = require('../app/services/AuthService');
const { verifyToken } = require('../app/middlewares/authMiddlewares');

/**
 * @swagger
 * /auth/login/success:
 *   get:
 *     summary: Handle successful login with Google
 *     tags: [Authorization]
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - properties:
 *                     error:
 *                       type: boolean
 *                   example:
 *                     error: false
 *                 - $ref: '#/components/schemas/LoginResponse'
 *       403:
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - properties:
 *                     error:
 *                       type: boolean
 *                 - $ref: '#/components/schemas/Response'
 *               example:
 *                  error: true
 *                  message: Not Authorized
 *                  code: 403
 *       500:
 *          description: Internal Server Error
 */
router.get('/login/success', authService.create_or_update);

/**
 * @swagger
 * /auth/login/failed:
 *   get:
 *     summary: Handle failed login with Google
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Log in failed
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - properties:
 *                     error:
 *                       type: boolean
 *                 - $ref: '#/components/schemas/Response'
 *               example:
 *                  error: true
 *                  message: Log in failed
 *                  code: 401
 */
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Log in failed',
        code: 401,
    });
});

/**
 * @swagger
 * /auth/google:
 *  get:
 *     summary: Initiate Google login
 *     tags: [Authentication]
 *     responses:
 *       '302':
 *         description: Redirect to Google login page
 */
router.get('/google', passport.authenticate('google', ['profile', 'email']));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback URL after Google login
 *     tags: [Authentication]
 *     parameters:
 *       - name: code
 *         in: query
 *         description: Authorization code received from Google
 *         required: true
 *         schema:
 *           type: string
 *       - name: state
 *         in: query
 *         description: State parameter received from Google
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '302':
 *         description: Redirect to success or failure URL
 */
router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:4000',
        failureRedirect: '/login/failed',
    }),
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       '302':
 *         description: Redirect to homepage
 */
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('http://localhost:4000');
    });
});

/**
 * @swagger
 * /auth/checkAuthentication:
 *   get:
 *     summary: Check user authentication
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - properties:
 *                     login:
 *                       type: boolean
 *               example:
 *                  message: Authenticated
 *                  code: 200
 *                  login: true
 *       '401':
 *         description: User is not authenticated or token is invalid
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - properties:
 *                     login:
 *                       type: boolean
 *               example:
 *                 message: Not authenticated. Please try again
 *                 code: 401
 *                 login: false
 *       '403':
 *         description: Token is missing
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - properties:
 *                     login:
 *                       type: boolean
 *               example:
 *                 message: We need a token. Please provide it for next time
 *                 code: 403
 *                 login: false
 */
router.get('/checkAuthentication', authService.verifyJwt, (req, res) => {
    return res.json({
        message: 'Authenticated',
        code: 200,
        login: true,
    });
});

//
router.get('/checkRole', verifyToken, authService.checkRole);

module.exports = router;
