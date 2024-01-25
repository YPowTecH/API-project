const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth'); //helperfuncs
const { User } = require('../../db/models'); //model

const router = express.Router();
// Log in
router.post(
    '/',
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







module.exports = router;
