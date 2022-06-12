/**
 * This file is used to signin API's routes.
 * Created by CodeMonk on 25/10/2021.
 * @name authRoutes
 */
const router = require('express').Router();

const SignUpTalentController = require('../../services/v2/signupTalent/signUpTalentController');

const SignUpRecruiterController = require('../../services/v2/signupRecruiter/signUpRecruiterController');


// Talent auth Routes
router.post('/talent/signup', SignUpTalentController.signUp);
router.post('/recruiter/signup', SignUpRecruiterController.signUp);

module.exports = router;
