const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//checking if we have x existing w. x constraints middleware
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('firstname')
      .exists({ checkFalsy: true })
      .withMessage('First name must not contain numbers or special characters'),
    check('lastname')
      .exists({ checkFalsy: true })
      .withMessage('Last name must not contain numbers or special characters'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up route
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstname, lastname, email, password, username } = req.body; //remember we need to destructure our body
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ firstname, lastname, email, username, hashedPassword }); //need to create firstname and lastname

      const safeUser = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser); //generate a jwt to sign the user in

      return res.json({
        user: safeUser
      });
    }
  );



module.exports = router;
