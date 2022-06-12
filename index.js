#!/usr/bin/env node
'use strict';

const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });
const app = require('./server/server');
const jobPost = require('./server/services/jobPostScheduler/jobPostSchedulerService');
const jobPostAutoCount = require('./server/services//JobPostAutoCountScheduler/jobPostAutoCountSchedulerService');
const generateBill = require('./server/services/billScheduler/billSchedulerService');

const cron = require('node-cron');
cron.schedule('0 0 * * *', jobPost);
cron.schedule('0 3 * * 1', generateBill);
cron.schedule('59 23 * * *', jobPostAutoCount);

module.exports = app.listen(process.env.PORT, () => {
    CONSOLE_LOGGER.info('Server is started at : %s', process.env.PORT);
});
