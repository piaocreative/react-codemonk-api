/**
 * This file is used to signin API's routes.
 * Created by Innovify on 19/04/2018.
 * @name authRoutes
 */
const router = require('express').Router();

const SignUpController = require('../services/signup/signUpController');
const SignInController = require('../services/signin/signInController');
const ForgotPasswordController = require('../services/forgotPasswordDetails/forgotPasswordController');
const UnregisteredUserController = require('../services/unregisteredUser/unregisteredUserController');
const AmbassadorSignUpController = require('../services/ambassador/signUp/ambassadorSignUpController');


// Talent auth Routes
router.post('/signup', SignUpController.signUp);

// User
router.post('/verify-account', SignUpController.verifyAccount);
router.post('/resend-otp', SignUpController.resendOTP);
router.post('/signin', SignInController.login);
router.post('/forgot-password', ForgotPasswordController.forgotPassword);
router.post('/verify-token', ForgotPasswordController.verifyToken);
router.post('/reset-password', ForgotPasswordController.resetPassword);

// client signup Routes
router.post('/client/signup', SignUpController.clientSignUp);

// Agency Talent signup Routes
router.get('/agency/talent/email', SignUpController.getEmailFromToken);

// Agency Talent signup Routes
router.post('/agency/talent/signup', SignUpController.agencyTalentSignUp);
router.get('/unregistered-user', UnregisteredUserController.searchByEmail);

// Ambassador signup Routes
router.post('/ambassador/signup', AmbassadorSignUpController.signUp);

module.exports = router;
