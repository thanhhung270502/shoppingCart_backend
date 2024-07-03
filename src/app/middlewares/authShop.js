const pool = require('../../config/db');

const belongToShop = async (req, res, next) => {
    const user_id = req.userID;
    const shop_id = req.params.shop_id;
    const response = await pool.query(
        `SELECT * FROM shop_users WHERE shop_id = $1 AND user_id = $2`,
        [shop_id, user_id],
    );

    if (response.rows.length === 0) {
        return res.status(400).json({
            message: 'You do not belong to this shop',
            code: 400,
        });
    } else {
        next();
    }
};

const isAdmin = async (req, res, next) => {
    const user_id = req.userID;
    const shop_id = req.params.shop_id;
    const response = await pool.query(`SELECT * FROM shop_users WHERE shop_id = $1, user_id = $2`, [
        shop_id,
        user_id,
    ]);

    if (response.rows.length === 0) {
        return res.status(400).json({
            message: 'You do not belong to this shop',
            code: 400,
        });
    }
    if (response.rows[0].role !== 'admin') {
        return res.status(400).json({
            message: 'You are not an admin of this shop',
            code: 400,
        });
    }
    next();
};

const isManagement = async (req, res, next) => {
    const user_id = req.userID;
    const shop_id = req.params.shop_id;
    const response = await pool.query(`SELECT * FROM shop_users WHERE shop_id = $1, user_id = $2`, [
        shop_id,
        user_id,
    ]);

    if (response.rows.length === 0) {
        return res.status(400).json({
            message: 'You do not belong to this shop',
            code: 400,
        });
    }
    if (response.rows[0].role === 'member') {
        return res.status(400).json({
            message:
                'You are only a member of this shop. You do not have permission to use this service',
            code: 400,
        });
    }
    next();
};

module.exports = { belongToShop, isAdmin, isManagement };
