const express = require('express');
const router = express.Router();

const siteService = require('../app/services/SiteService');

// newsController.index
router.get('/services', siteService.services);
router.get('/contact', siteService.contact);
router.get('/about', siteService.about);
router.get('/', siteService.index);

module.exports = router;
