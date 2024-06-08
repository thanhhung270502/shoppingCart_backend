const pool = require('../../config/db');

const isTeacherInClass = async (req, res, next) => {
    const teacherId = req.userID;
    const classId = req.body.class_id;
    const query = `
    select * 
    from teacher_classes
    where teacher_id = $1 and class_id = $2;
    `;
    const response = await pool.query(query, [teacherId, classId]);
    if (response.rows.length === 0) {
        return res.status(200).json({
            message: `Teacher ${teacherId} does not teach class ${classId}.`,
        });
    } else {
        next();
    }
};

const isStudentInClass = async (req, res, next) => {
    const studentId = req.userID;
    const classId = req.body.class_id;
    const query = `
    select * 
    from student_classes
    where student_id = $1 and class_id = $2;
    `;
    const response = await pool.query(query, [studentId, classId]);
    if (response.rows.length === 0) {
        return res.status(200).json({
            message: `Srudent ${studentId} does not study in class ${classId}.`,
        });
    } else {
        next();
    }
};

module.exports = { isTeacherInClass, isStudentInClass };