const router = require('express').Router();
const Sharing = require('../services/sharing/sharingController');

router.get('/:code', Sharing.profile);

module.exports = router;
