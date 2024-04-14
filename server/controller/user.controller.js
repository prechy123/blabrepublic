require('dotenv').config();
const BaseController = require('./base.controller');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const CustomError = require('../middleware/error/customError');
const { formatUser } = require('../utils/user.utils');
jwt = require('jsonwebtoken');


class UserController extends BaseController {
  constructor() {
    super(User);
  }

  createItem = (req, res) => {
    res.status(200).json({message: 'This method is disabled for User class'})
  }

  updateItem = (req, res) => {
    res.status(200).json({messag: 'This method is disabled for User class'})
  }

  // Register User route
  registerUser = async (req, res, next) => {
    try {
      let {firstname, password, username, lastname, email, role} = req.body;
      if (!firstname || !password || !username || !lastname || !email) {
        throw new CustomError('Some filelds are missing', 400);
      }
      const email_exist = await User.find({ email });
      console.log(email_exist);
      const username_exist = await User.find({ username });
      if (email_exist.length !== 0) {
        throw new CustomError('Email already in use', 409);
      }
      if (username_exist.length !== 0) {
        throw new CustomError('Username already in use', 409);
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      password = hashedPassword;
      const new_user_data = {
        firstname,
        password,
        username,
        lastname,
        email
      }
      if (req.file) {
        new_user_data.img = req.file.path;
      }
    
      const new_user = await this.model.create(new_user_data);
      const user_data = formatUser(new_user)
      res.status(201).json({message: 'User created successfully', user: user_data});
    } catch (error) {
      next(error)
    }
  }

  // User login
  loginUser = async (req, res, next) => {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
       throw new CustomError('Username or password cannot be empty', 401);
      }
      const regex = new RegExp(email, 'i')  // case insensitivity
      const user = await User.findOne({ email: regex });
      if (!user) {
       throw new CustomError('User does not exist', 404);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
       throw new CustomError('Invalid email or password', 401)
      }
      const accessToken = jwt.sign({id: user._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'});
      const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
      res.cookie('accessToken', accessToken, { maxAge: 60000 });
      res.cookie('refreshToken', refreshToken, { maxAge: 259200000, httpOnly: true, secure: true, sameSite: 'strict' }); // maxage in 3days
      const user_data = formatUser(user);
      res.status(200).json({message: 'User logged in successfully', user: user_data});
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  // Logout a user
  logoutUser = (req, res, next) => {
    try {
      const accessToken = jwt.sign({id:'1'}, process.env.JWT_ACCESS_SECRET, { expiresIn: '0.5s' });
      const refreshToken = jwt.sign({id:'1'}, process.env.JWT_REFRESH_SECRET, { expiresIn: '0.5s' });
      res.cookie('accessToken', accessToken, { maxAge: 1 });
      res.cookie('refreshToken', refreshToken, { maxAge: 1, httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({message: 'User logged out successfully'});
    } catch (err) {
      next(err)
    }
  }

  // Curent user
  currentUser = async (req, res, next) => {
    try {
      const id = await req.id;
      if (!id) {
        throw new CustomError('You are not verified', 403);
      }
      const user = await User.findById(id);
      if (!user) {
        throw new CustomError('No user found', 404);
      }
      const current_user = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role
      }
      res.status(200).json({user: current_user});
    } catch(err) {
      next(err);
    }
  }

  // Update a user role
  updateUserRole = async (req, res, next) => {
    try {
      const { userId, newRole } = req.query.userID;
      if (!userId || !newRole) {
        throw new CustomError('No user id or role passed', 400);
      }
      const validRoles = ['admin', 'user', 'editor'];
      if (!validRoles.includes(newRole)) {
        throw new CustomError('Invalid role passed', 400);
      }
      const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
      if (!user) {
        throw new CustomError('No user found', 404);
      }
      res.status(200).json({message: 'Role updated successfully'});
    } catch (error) {
      next(error)
    }
  }

  // update user password
  updateUserPassword = async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = await req.id;
      if (!oldPassword || !newPassword) {
        throw new CustomError('No old password and new password passed', 400);
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new CustomError('No user found', 404);
      }
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        throw new CustomError('Old password is incorrect', 401)
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
      res.status(200).json({message: 'Password updated successfully'});
    } catch (error) {
      next(error)
    }
  }
}


module.exports = new UserController();