const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth'); //helperfuncs
const { User } = require('../../db/models'); //model

const router = express.Router();

//checking properties on the req.body
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors //package that checks crediential property and if fail stores errors messages, then pw, after all checks we go to the middleware

  ];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body; //credential can be a username or email

      const user = await User.unscoped().findOne({ //get around defaultscope
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' }; //do not want to volunteer any clear helpful info in our error message
        return next(err);
      }
      //if we pass the checks then we're gonna create this object with this data that's safe, excluding both hashed and pt text which is passed into our setTokenCookie function which generates our token for the user
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

// Log out
//clearcookie is built in method
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );


// Restore session user route
//checking to see if we have a user on our req. obj
//if we passed through the restore user global middleware and found a user identified by the jwt and applied that user to the req obj,
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );




module.exports = router;
