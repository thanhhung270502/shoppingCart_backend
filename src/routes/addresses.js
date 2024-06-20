const express = require('express');
const router = express.Router();

const addressService = require('../app/services/AddressService');
const { verifyToken } = require('../app/middlewares/authMiddlewares');

router.post('/create', verifyToken, addressService.create);

router.get('/wards/:district_code', addressService.getWardsByDistrictCode);
router.get('/districts/:province_code', addressService.getDistrictsByProvinceCode);
router.get('/provinces', addressService.getAllProvinces);

router.put('/user/default/update', verifyToken, addressService.updateAddressDefault);
router.put('/user/update', verifyToken, addressService.updateAddress);

router.post('/user/get', verifyToken, addressService.getAddressByID);

router.get('/user/default', verifyToken, addressService.getAddressDefault);
router.get('/user/all', verifyToken, addressService.getAllAddressByUserID);
router.delete('/user/:address_id', verifyToken, addressService.deleteAddress);

module.exports = router;
