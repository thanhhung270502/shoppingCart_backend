const express = require('express');
const cors = require('cors');
const route = require('./routes');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const passport = require('passport');
const passportStrategy = require('./passport');
require('dotenv').config();

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '',
            version: '',
            description: '',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/routes/swagger/*.js'],
};

const specs = swaggerJsDoc(options);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:4000',
        credentials: true,
    }),
);

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET',
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
route(app);

module.exports = app;
