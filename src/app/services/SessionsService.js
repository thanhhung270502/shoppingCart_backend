const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/authMiddlewares');

class SessionsController {
    // [POST] /
    async create(req, res) {
        try {
            const { phone_number, email, password } = req.body;

            if (!password)
                return res.status(400).json({ message: 'Missing password. Please try again' });
            if (!phone_number && !email)
                return res
                    .status(400)
                    .json({ message: 'Missing phone_number or email. Please try again' });
            if (phone_number && email)
                return res.status(400).json({ message: 'Invalid. Please try again' });
            let condition;
            if (phone_number) condition = { key: 'phone_number', value: phone_number };
            else condition = { key: 'email', value: email };

            const query = `SELECT * FROM users WHERE ${condition['key']} = $1 and (provider = $2 or provider = $3)`;
            const response = await pool.query(query, [condition['value'], 'manual', 'both']);

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
                            phone_number: response.rows[0].phone_number,
                            date_birth: response.rows[0].date_birth,
                            gender: response.rows[0].gender,
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
