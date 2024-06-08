const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
const { encode } = require('../helper/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/authMiddlewares');

class SessionsController {
    // [POST] /
    async create(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) return res.status(400).json({ message: 'Invalid email or password' });

            const query = 'SELECT * FROM users WHERE email = $1 AND provider = $2';
            const response = await pool.query(query, [email, 'manual']);

            if (response.rows.length === 0) {
                return res.status(400).json({ message: 'Account not found', code: 400 });
            }

            console.log(response.rows[0].password);

            const passwordMatch = await bcrypt.compare(password, response.rows[0].password);

            if (passwordMatch) {
                return res.status(201).json({
                    code: 201,
                    message: 'Login successfully',
                    body: {
                        accessToken: generateToken(response.rows[0].id, response.rows[0].role),
                        user: {
                            id: response.rows[0].id,
                            role: response.rows[0].role,
                            email: response.rows[0].email,
                            name: response.rows[0].name,
                            avatar: response.rows[0].avatar,
                        },
                    },
                });
            } else {
                return res.status(400).json({
                    message: 'Invalid credentials',
                    code: 400,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new SessionsController();
