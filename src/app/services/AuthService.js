const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middlewares/authMiddlewares');

class AuthController {
    async create_or_update(req, res) {
        if (req.user) {
            console.log(req.user);
            try {
                // Flow: 0 - create, 1 - get
                var index = -1;
                const getUser = await pool.query(
                    'SELECT * FROM users WHERE email = $1 AND (provider = $2 OR provider = $3)',
                    [req.user._json.email, req.user.provider, 'both'],
                );

                if (getUser.rows.length === 0) {
                    const id = await bcrypt.hash(req.user._json.email, 10);
                    const getCurrentUser = await pool.query(
                        `INSERT INTO users (id, email, password, name, provider, role, avatar_url) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                        [
                            id,
                            req.user._json.email,
                            '',
                            req.user._json.name,
                            req.user.provider,
                            'normal',
                            req.user._json.picture,
                        ],
                    );

                    // const getCurrentUser = await pool.query(
                    //     'SELECT * FROM users WHERE email = $1 AND provider = $2',
                    //     [req.user._json.email, req.user.provider],
                    // );

                    return res.status(201).json({
                        message: 'User created successfully',
                        code: 201,
                        body: {
                            accessToken: generateToken(
                                getCurrentUser.rows[0].id,
                                getCurrentUser.rows[0].role,
                            ),
                            user: {
                                id: getCurrentUser.rows[0].id,
                                role: getCurrentUser.rows[0].role,
                                email: getCurrentUser.rows[0].email,
                                name: getCurrentUser.rows[0].name,
                                avatar_url: getCurrentUser.rows[0].avatar_url,
                                phone_number: getUser.rows[0].phone_number,
                                gender: getUser.rows[0].gender,
                                date_birth: getUser.rows[0].date_birth,
                            },
                        },
                    });
                } else {
                    return res.status(201).json({
                        message: 'User created successfully',
                        code: 201,
                        body: {
                            accessToken: generateToken(getUser.rows[0].id, getUser.rows[0].role),
                            user: {
                                id: getUser.rows[0].id,
                                role: getUser.rows[0].role,
                                email: getUser.rows[0].email,
                                name: getUser.rows[0].name,
                                avatar_url: getUser.rows[0].avatar_url,
                                phone_number: getUser.rows[0].phone_number,
                                gender: getUser.rows[0].gender,
                                date_birth: getUser.rows[0].date_birth,
                            },
                        },
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json('Internal Server Error');
            }
        } else {
            return res.status(403).json({ error: true, message: 'Not Authorized', code: 403 });
        }
    }

    async verifyJwt(req, res, next) {
        const token = req.headers['access-token'];
        if (!token) {
            return res.status(403).json({
                message: 'We need token please provide it for next time',
                code: 403,
                login: false,
            });
        } else {
            jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: 'Not authenticated. Please try again',
                        code: 401,
                        login: false,
                    });
                } else {
                    req.userID = decoded.id;
                    next();
                }
            });
        }
    }

    async checkRole(req, res) {
        const userRole = req.userRole;
        if (userRole === 'teacher') {
            return res.status(202).json({
                code: 202,
                message: 'You are a teacher',
                body: {
                    role: userRole,
                },
            });
        } else if (userRole === 'admin') {
            return res.status(202).json({
                code: 202,
                message: 'You are a administrator',
                body: {
                    role: userRole,
                },
            });
        } else if (userRole === 'student') {
            return res.status(202).json({
                code: 202,
                message: 'You are a student',
                body: {
                    role: userRole,
                },
            });
        } else {
            return res.status(202).json({
                code: 202,
                message: 'You are a normal person',
                body: {
                    role: userRole,
                },
            });
        }
    }
}

module.exports = new AuthController();
