require('dotenv').config();
const CustomError = require('../error/customError');
const User = require('../../models/user.model');
jwt = require('jsonwebtoken');

const verify_jwt = async (req, res, next) => {
    try {
      if (!req.cookies) {
        throw new CustomError('No cookies in header', 403);
      }
  
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        const refreshTokenResult = await refresh_access_token(req, res);
        if (refreshTokenResult) {
          return next();
        }
      } else {
        await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
          if (err) {
            throw new CustomError('Invalid access token', 403);
          }
  
          req.id = await decoded.id;

        });
        next();
      }
    } catch (err) {
      next(err); // Pass error to middleware or application logic
    }
  };

  // Refresh access token using the refresh token
const refresh_access_token = async (req, res) => {
    try {
      if (!req.cookies || !req.cookies.refreshToken) {
        throw new CustomError('No token present', 403);
      }
      refreshtoken = req.cookies.refreshToken;
      await jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET, async (err ,decoded) => {
        if (err) {
            throw new CustomError('Invalid token', 403);
        }
        const accessToken = await jwt.sign({id: decoded.id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
        res.cookie('accessToken', accessToken, { maxAge: 600000 }); // 10 minutes
      })
      return true; // Indicate successful refresh
  
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
    }
  };

  // Verify if user is editor or admin
  const verify_editor = async (req, res, next) => {
    try {
      const id = await req.id;
      if (!id) {
        throw new CustomError('You are not verified', 403);
      }
      const user = await User.findById(id);
      if (!user) {
        throw new CustomError('No user found', 404);
      }
      if (user.role != 'admin' && user.role != 'editor') {
        throw new CustomError('Only admins or editors can perform this operation', 403);
      }
      next();
    } catch(err) {
      next(err); // pass err to error handler
    }
  }

    // Verify if user is admin
    const verify_admin = async (req, res, next) => {
      try {
        const id = await req.id;
        if (!id) {
          throw new CustomError('You are not verified', 403);
        }
        const user = await User.findById(id);
        if (!user) {
          throw new CustomError('No user found', 404);
        }
        if (user.role != 'admin') {
          throw new CustomError('Only admin can perform this operation', 403);
        }
        next();
      } catch(err) {
        next(err); // pass err to error handler
      }
    }

    // Check if a user is login
    const isLoggedin = async (req, res, next) => {
      try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
          return next();
        }
        const decoded = await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        if (decoded.id) {
          throw new CustomError('A user is already logged in', 400);
        }
        next()
      } catch(err) {
        next(err);
      }
    }

module.exports = { verify_jwt, verify_editor, verify_admin, isLoggedin }