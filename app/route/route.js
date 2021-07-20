const router = require('express').Router();

const AccountRoute = require('./account.route.js');
const TransactionRoute = require('./transactions.route.js');
const BankDetailsRoute = require('./bank_details.route');

router.get('/', (req, res) => {
    res.status(200).send('Welcome to Financial Application !!!');
});

router.use('/account', AccountRoute);
router.use('/transfer', TransactionRoute);
router.use('/bank', BankDetailsRoute);

module.exports = router;


