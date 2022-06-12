/**
 * @name Server Configuration
 */

const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const talentRoutes = require('./routes/talentRoutes');
const clientRoutes = require('./routes/clientRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const adminRoutes = require('./routes/adminRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');
const timeSheetRoutes = require('./routes/timesheet.route');
const timeSheetRoutesV2 = require('./routes/v2/timesheet.route');
const notificationRoutes = require('./routes/notificationRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const shareRoutes = require('./routes/shareRoutes');
const algoRoutes = require('./routes/algoProxyServerRoute');
const ambassadorRoutes = require('./routes/ambassadorRoutes');
const talentRoutesV2 = require('./routes/v2/talentRoutes');
const configRoutesV2 = require('./routes/v2/configurationRoutes');
const authRoutesV2 = require('./routes/v2/authRoutes');
const jobPostRoutesV2 = require('./routes/v2/jobPostRoutes');
const projectRoutesV2 = require('./routes/v2/projectRoutes');
const userRoutesV2 = require('./routes/v2/userRoutes');
const botRoutesV2 = require('./routes/v2/botRoutes');
const referralRoutesV2 = require('./routes/v2/referralRoutes');
const recruiterJobPostRoutesV2 = require('./routes/v2/recruiter/jobPostRoutes');
const recruiterRoutesV2 = require('./routes/v2/recruiter/recruiterRoutes');
const ambassadorRoutesV2 = require('./routes/v2/ambassador/ambassadorRoutes');
const twitterRoutes = require('./routes/twitterBotRoutes');

const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const i18n = require('i18n');
const morgan = require('morgan');
const helmet = require('helmet');

// Global Variables
global.DB_CONNECTION = require('mongoose');
global.CONSOLE_LOGGER = require('./util/logger');
global.CONSTANTS = require('./util/constants');
global.MOMENT = require('moment');
global._ = require('lodash');
global.CodeMonkError = require('./util/CodeMonkError');

const mongoHost = `${process.env.DB_HOST}`;
const mongoCredetials = process.env.DB_USERNAME ?
    `${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@` : '';
const protocol = process.env.DB_PROTOCOL ? process.env.DB_PROTOCOL : 'mongodb';
const dbUrl = `${protocol}://${mongoCredetials}${mongoHost}`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 10
};
const swaggerRoutes = require('./services/swaggerRoutes');
const connectWithRetry = () => {
    CONSOLE_LOGGER.info('MongoDB connection with retry');
    DB_CONNECTION.connect(dbUrl, options).then(() => {
        CONSOLE_LOGGER.info('MongoDB is connected');
    }).catch((err) => {
        CONSOLE_LOGGER.error(err);
        CONSOLE_LOGGER.error('MongoDB connection unsuccessful, retry after 0.5 seconds.');
        setTimeout(connectWithRetry, 500);
    });
};
connectWithRetry();

if (process.env.LOCAL === 'true') {
    app.use(express.static('../jsdocs/jsdocs'));
    app.use(
        '/auth/coverage',
        express.static(`${__dirname}/../coverage/lcov-report`)
    );
}

const uptime = MOMENT();
app.get('/', (req, res) => {
    res.send({
        status: 'ok',
        date: uptime
    });
});
app.use(express.static(`${__dirname}/public`));

// Configure i18n for multilingual
i18n.configure({
    locales: ['en', 'de'],
    directory: `${__dirname}/locales`,
    extension: '.json',
    prefix: '',
    defaultLocale: 'en',
    header: 'accept-language',
    logDebugFn (msg) {
        if (process.env.LOCAL === 'true') {
            CONSOLE_LOGGER.debug(`i18n::${CONSTANTS.LOG_LEVEL}`, msg);
        }
    }
});

app.use(compression());
app.use(helmet());
app.use(i18n.init);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));

app.use(morgan('dev'));
app.use(methodOverride());
if (process.env.NODE_ENV !== 'production') {
    app.use('/', swaggerRoutes);
}
// Landing Page
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/talent', talentRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
app.use('/agency', agencyRoutes);
app.use('/admin', adminRoutes);
app.use('/interview', interviewRoutes);
app.use('/job-post', jobPostRoutes);
app.use('/quote', quoteRoutes);
app.use('/timesheet', timeSheetRoutes);
app.use('/v2/timesheet', timeSheetRoutesV2);
app.use('/notification', notificationRoutes);
app.use('/ambassador', ambassadorRoutes);
app.use('/c', shareRoutes);
app.use('/algo-api', algoRoutes);
app.use('/twitter', twitterRoutes);
app.use('/v2/talent', talentRoutesV2);
app.use('/v2/config', configRoutesV2);
app.use('/v2/auth', authRoutesV2);
app.use('/v2/job-post', jobPostRoutesV2);
app.use('/v2/project', projectRoutesV2);
app.use('/v2/user', userRoutesV2);
app.use('/v2/bot', botRoutesV2);
app.use('/v2/referral', referralRoutesV2);
app.use('/v2/recruiter/job-post', recruiterJobPostRoutesV2);
app.use('/v2/recruiter', recruiterRoutesV2);
app.use('/v2/ambassador', ambassadorRoutesV2);

module.exports = app;
