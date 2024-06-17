const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
const { encode } = require('../helper/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/authMiddlewares');

class SessionsController {
    // [POST] /
    async create(req, res) {
        try {
            const { phone_number, password } = req.body;

            if (!phone_number || !password)
                return res.status(400).json({ message: 'Invalid phone_number or password' });

            const query = 'SELECT * FROM users WHERE phone_number = $1 AND provider = $2';
            const response = await pool.query(query, [phone_number, 'manual']);

            if (response.rows.length === 0) {
                return res.status(400).json({ message: 'Account not found', code: 400 });
            }

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
                            phone_number: response.rows[0].phone_number,
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
