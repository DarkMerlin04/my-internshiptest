const express = require('express');
const router = express.Router();

const { transfer, deposit, withdraw, getTransactions, deleteTransactions } = require('../controllers/transactionController');

router.route('/').get(getTransactions)
router.route('/transfer').post(transfer)
router.route('/deposit').post(deposit)
router.route('/withdraw').post(withdraw)
router.route('/:id').delete(deleteTransactions)

module.exports = router;