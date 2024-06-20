const pool = require('../../config/db');
const utils = require('../../utils/index');
const bcrypt = require('bcrypt');

class AddressService {
    async getAllProvinces(req, res) {
        try {
            const response = await pool.query('SELECT * FROM provinces');

            return res.status(200).json({
                message: 'Get all provinces successfully',
                code: 200,
                provinces: response.rows,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async getDistrictsByProvinceCode(req, res) {
        try {
            const province_code = req.params.province_code;
            const response = await pool.query('SELECT * FROM districts WHERE province_code = $1', [
                province_code,
            ]);

            return res.status(200).json({
                message: 'Get all districts successfully',
                code: 200,
                districts: response.rows,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async getWardsByDistrictCode(req, res) {
        try {
            const district_code = req.params.district_code;
            const response = await pool.query('SELECT * FROM wards WHERE district_code = $1', [
                district_code,
            ]);

            return res.status(200).json({
                message: 'Get all wards successfully',
                code: 200,
                wards: response.rows,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async create(req, res) {
        const {
            name,
            phone_number,
            province_code,
            district_code,
            ward_code,
            address_detail,
            isDefault,
        } = req.body;

        const user_id = req.userID;

        if (
            !user_id ||
            !name ||
            !phone_number ||
            !province_code ||
            !district_code ||
            !ward_code ||
            !address_detail
        ) {
            return res.status(400).json({ message: 'Invalid form' });
        }
        try {
            const merge = user_id + phone_number + province_code + district_code + ward_code;
            let hashedID = await bcrypt.hash(merge, 10);
            hashedID = hashedID.replace('/', '');
            const check = await pool.query('SELECT * FROM user_addresses WHERE id = $1', [
                hashedID,
            ]);

            if (check.rows.length > 0) {
                return res.status(400).json({
                    message: 'This user_address is already exists',
                    code: 400,
                });
            }

            const currentTime = utils.getCurrentTimeFormatted();

            const response = await pool.query(
                `INSERT INTO user_addresses (id, user_id, name, phone_number, province_code, 
                district_code, ward_code, address_detail, created_at, updated_at) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
                `,
                [
                    hashedID,
                    user_id,
                    name,
                    phone_number,
                    province_code,
                    district_code,
                    ward_code,
                    address_detail,
                    currentTime,
                    currentTime,
                ],
            );

            if (isDefault) {
                const insertRes = await pool.query(
                    `
                    INSERT INTO user_address(id, user_id, address_id, created_at, updated_at) VALUES
                    ($1, $2, $3, $4, $5)
                    `,
                    [user_id, user_id, response.rows[0].id, currentTime, currentTime],
                );
            }

            return res.status(201).json({
                message: 'User created successfully',
                code: 201,
                body: '',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async getAllAddressByUserID(req, res) {
        try {
            const userID = req.userID;

            const response = await pool.query(
                `
                select ua.id as id, ua."name" as user_name, phone_number, address_detail, 
                p.full_name as province_name, d.full_name as district_name, w.full_name as ward_name 
                from user_addresses ua 
                join provinces p on p.code = ua.province_code  
                join districts d ON d.code = ua.district_code 
                join wards w on w.code = ua.ward_code 
                where user_id = $1
                `,
                [userID],
            );
            return res.status(200).json({
                message: 'Get all address by user_id',
                code: 200,
                body: response.rows,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async getAddressDefault(req, res) {
        const userID = req.userID;

        try {
            const response = await pool.query('SELECT * FROM user_address WHERE user_id = $1', [
                userID,
            ]);

            return res.status(200).json({
                message: 'Get all address by user_id',
                code: 200,
                body: response.rows,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async updateAddressDefault(req, res) {
        const userID = req.userID;
        const { address_id } = req.body;

        try {
            const response = await pool.query(
                `
                UPDATE user_address SET address_id = $1 WHERE user_id = $2
                `,
                [address_id, userID],
            );

            return res.status(200).json({
                message: 'Get all address by user_id',
                code: 200,
                body: '',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async getAddressByID(req, res) {
        const userID = req.userID;
        const { id } = req.body;

        try {
            const response = await pool.query(
                `
                select * , ua."name" as user_name, phone_number 
                from user_addresses ua
                join provinces p on p.code = ua.province_code  
                join districts d ON d.code = ua.district_code 
                join wards w on w.code = ua.ward_code 
                where ua.id = $1 and ua.user_id = $2;
                `,
                [id, userID],
            );
            return res.status(200).json({
                message: 'Get all address by user_id',
                code: 200,
                body: response.rows[0],
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async updateAddress(req, res) {
        const userID = req.userID;
        const { id, name, phone_number, province_code, district_code, ward_code, address_detail } =
            req.body;

        try {
            const response = await pool.query(
                `
                UPDATE user_addresses SET name = $1, phone_number = $2, province_code = $3, 
                district_code = $4, ward_code = $5, address_detail = $6
                WHERE id = $7
                `,
                [name, phone_number, province_code, district_code, ward_code, address_detail, id],
            );

            return res.status(200).json({
                message: 'Get all address by user_id',
                code: 200,
                body: '',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }

    async deleteAddress(req, res) {
        const { address_id } = req.params;

        try {
            const getAddress = await pool.query(
                `
                SELECT * FROM user_address WHERE address_id = $1
                `,
                [address_id],
            );

            if (getAddress.rows.length > 0) {
                const destroy = await pool.query(
                    `
                DELETE FROM user_address WHERE address_id = $1
                `,
                    [address_id],
                );
            }

            const response = await pool.query(
                `
                DELETE FROM user_addresses WHERE id = $1
                `,
                [address_id],
            );

            return res.status(200).json({
                message: 'Delete address by address_id',
                code: 200,
                body: '',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                code: 500,
                error: err,
            });
        }
    }
}

module.exports = new AddressService();
