const pool = require('../../config/db');

class CategoryService {
    async getAllCategory1(req, res) {
        try {
            const response = await pool.query('SELECT * FROM category_1');

            return res.status(200).json({
                message: 'Get all category 1 successfully',
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

    async getAllCategory2(req, res) {
        try {
            const category_1_id = req.params.category_1_id;
            const response = await pool.query('SELECT * FROM category_2 WHERE category_1_id = $1', [
                category_1_id,
            ]);

            return res.status(200).json({
                message: 'Get all category 2 successfully',
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

    async getAllCategory3(req, res) {
        try {
            const category_2_id = req.params.category_2_id;
            const response = await pool.query('SELECT * FROM category_3 WHERE category_2_id = $1', [
                category_2_id,
            ]);

            return res.status(200).json({
                message: 'Get all category 3 successfully',
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

    async getAllCategory4(req, res) {
        try {
            const category_3_id = req.params.category_3_id;
            const response = await pool.query('SELECT * FROM category_4 WHERE category_3_id = $1', [
                category_3_id,
            ]);

            return res.status(200).json({
                message: 'Get all category 4 successfully',
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

    async getAllCategory5(req, res) {
        try {
            const category_4_id = req.params.category_4_id;
            const response = await pool.query('SELECT * FROM category_5 WHERE category_4_id = $1', [
                category_4_id,
            ]);

            return res.status(200).json({
                message: 'Get all category 5 successfully',
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
}

module.exports = new CategoryService();
