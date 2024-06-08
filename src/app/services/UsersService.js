const pool = require('../../config/db');
const { encode } = require('../helper/user');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middlewares/authMiddlewares');
const bcrypt = require('bcrypt');

class UsersController {
    // [GET] /
    async index(req, res, next) {
        try {
            const query = 'SELECT * FROM users';
            const response = await pool.query(query);
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    async show(req, res, next) {
        try {
            const id = parseInt(req.params.slug);
            const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            if (response.rows.length > 0) {
                return res.status(200).json({
                    message: 'Found user successfully',
                    code: 200,
                    body: {
                        user: response.rows[0],
                    },
                });
            } else {
                return res.status(404).json({
                    message: 'User not found',
                    code: 404,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
    // 201: successful, 409: User exists
    async create(req, res) {
        try {
            const { email, password, name, provider, avatar } = req.body;
            const role = 'normal';

            // Check if the user already exists
            const query = 'SELECT * FROM users WHERE email = $1 AND provider = $2';
            var getUser = await pool.query(query, [email, 'manual']);
            if (getUser.rows.length > 0) {
                res.status(409).json({
                    message: 'Email existed',
                    code: 409,
                    body: '',
                });
            } else {
                // var newPassword = encode(password);
                const hashedPassword = await bcrypt.hash(password, 10);

                const response = await pool.query(
                    'INSERT INTO users (email, password, name, provider, role, avatar) VALUES ($1, $2, $3, $4, $5, $6)',
                    [email, hashedPassword, name, provider, role, avatar],
                );

                getUser = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2 AND provider = $3', [
                    email,
                    hashedPassword,
                    'manual',
                ]);

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
                            avatar: getUser.rows[0].avatar,
                        },
                    },
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new UsersController();
