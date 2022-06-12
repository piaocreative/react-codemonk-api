const TwitterBot = require('../services/twitter/twitterBotController');
const router = require('express').Router();

router.get('/auth', TwitterBot.auth);
router.get('/callback', TwitterBot.callbackProcessor);
router.get('/testAuth', TwitterBot.testAuth);

module.exports = router;
