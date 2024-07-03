const pool = require('../../config/db');
const bcrypt = require('bcrypt');

class ProductService {
    async getAllProductsByShopId(req, res) {
        try {
            const shop_id = req.params.shop_id;
            const response = await pool.query(`SELECT * FROM products WHERE shop_id = $1`, [
                shop_id,
            ]);

            return res.status(200).json({
                message: 'Get all products successfully',
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
}

module.exports = new ProductService();
