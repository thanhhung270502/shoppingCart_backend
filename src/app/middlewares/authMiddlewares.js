const jwt = require('jsonwebtoken');

// Student: 0
// Community Leader : 1
// University Admin: 2

const generateToken = (userId, userRole) => {
    return jwt.sign({ userId, userRole }, 'jwtSecretKey', {
        expiresIn: '30d',
    });
};

const verifyToken = async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(200).json({
            message: 'We need token please provide it for next time',
            login: false,
            code: 400,
        });
    } else {
        jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
            if (err) {
                res.json({
                    message: 'Not authenticated. Please try again',
                    login: false,
                });
            } else {
                req.userID = decoded.userId;
                req.userRole = decoded.userRole;
                next();
            }
        });
    }
};

const isTeacher = async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(400).json({
            message: 'We need token please provide it for next time',
            login: false,
        });
    } else {
        jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    message: 'Not authenticated. Please try again',
                    login: false,
                });
            } else {
                if (decoded.userRole !== 'teacher') {
                    return res.status(200).json({
                        message: 'Only teachers have the authority to do this.',
                    });
                }
                req.userID = decoded.userId;
                next();
            }
        });
    }
};

const isAdmin = async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(400).json({
            message: 'We need token please provide it for next time',
            login: false,
        });
    } else {
        jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    message: 'Not authenticated. Please try again',
                    login: false,
                });
            } else {
                if (decoded.userRole !== 'admin') {
                    return res.status(200).json({
                        message: 'Only administrations have the authority to do this.',
                    });
                }
                req.userID = decoded.userId;
                next();
            }
        });
    }
};

const isStudent = async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(400).json({
            message: 'We need token please provide it for next time',
            login: false,
        });
    } else {
        jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    message: 'Not authenticated. Please try again',
                    login: false,
                });
            } else {
                if (decoded.userRole !== 'student') {
                    return res.status(200).json({
                        message: 'Only Students have the authority to do this.',
                    });
                }
                req.userID = decoded.userId;
                next();
            }
        });
    }
};

module.exports = { generateToken, verifyToken, isTeacher, isAdmin, isStudent };
