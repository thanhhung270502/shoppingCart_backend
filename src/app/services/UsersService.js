const pool = require('../../config/db');
const { encode } = require('../helper/user');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middlewares/authMiddlewares');
const bcrypt = require('bcrypt');
const utils = require('../../utils/index');

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
            const { phone_number, password, name } = req.body;

            // Check if the user already exists
            const query = 'SELECT * FROM users WHERE phone_number = $1 AND provider = $2';
            var getUser = await pool.query(query, [phone_number, 'manual']);

            if (getUser.rows.length > 0) {
                return res.status(400).json({
                    message: 'Phone Number existed',
                    code: 400,
                    body: '',
                });
            }

            // var newPassword = encode(password);
            const hashedPassword = await bcrypt.hash(password, 10);
            const id = await bcrypt.hash(phone_number, 10);
            const currentTime = utils.getCurrentTimeFormatted();

            const response = await pool.query(
                'INSERT INTO users (id, phone_number, password, name, provider, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
                [id, phone_number, hashedPassword, name, 'manual', 'customer', currentTime, currentTime],
            );

            getUser = await pool.query(
                'SELECT * FROM users WHERE phone_number = $1 AND password = $2 AND provider = $3',
                [phone_number, hashedPassword, 'manual'],
            );

            return res.status(201).json({
                message: 'User created successfully',
                code: 201,
                body: {
                    accessToken: generateToken(getUser.rows[0].id, getUser.rows[0].role),
                    user: {
                        id: getUser.rows[0].id,
                        role: getUser.rows[0].role,
                        phone_number: getUser.rows[0].phone_number,
                        name: getUser.rows[0].name,
                        avatar: getUser.rows[0].avatar,
                    },
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
}

module.exports = new UsersController();
