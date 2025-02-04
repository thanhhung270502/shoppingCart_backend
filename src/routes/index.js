const siteRouter = require('./site');
const usersRouter = require('./users');
const sessionsRouter = require('./sessions');
const authRouter = require('./auth');
const addressesRouter = require('./addresses');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const { isTeacher } = require('../app/middlewares/authMiddlewares');
const { isTeacherInClass } = require('../app/middlewares/authClass');

function route(app) {
    app.use('/categories', categoriesRouter);
    app.use('/products', productsRouter);
    app.use('/addresses', addressesRouter);
    app.use('/auth', authRouter);
    app.use('/sessions', sessionsRouter);
    app.use('/users', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
