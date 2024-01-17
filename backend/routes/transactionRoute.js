const express = require('express');
const router = express.Router();

const { transfer, deposit, withdraw, getTransactions } = require('../controllers/transactionController');

router.route('/').get(getTransactions)
router.route('/transfer').post(transfer)
router.route('/deposit').post(deposit)
router.route('/withdraw').post(withdraw)

module.exports = router;