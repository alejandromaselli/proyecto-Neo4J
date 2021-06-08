const { check } = require('express-validator');

exports.userSignupValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email address is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

exports.userSigninValidator = [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

exports.forgotPasswordValidator = [
    check('email').not().isEmpty().isEmail().withMessage('It must be a valid email'),
];

exports.resetPasswordValidator = [
    check('newPassword').not().isEmpty().isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
];