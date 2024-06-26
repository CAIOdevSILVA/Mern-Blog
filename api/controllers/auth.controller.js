import User from '../models/User.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signUp = async (req, res, next) => {
  const { username, email, password} = req.body;

  if(!username || !email || !password || username === '' || email === '' || password === ''){
   next(errorHandler(400, 'All fields are required'));
  };

  const hashedPassword = bcryptjs.hashSync(password, 10);
  
  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Signup seccessfuly' });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  };

  try {
    const validUser = await User.findOne({ email });
    if(!validUser){
      return next(errorHandler(400, 'Invalid Credentials'));
    };

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) {
      return next(400, 'Invalid Credentials');
    };

    const { password: pass, ...rest } = validUser._doc;

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin},
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user){
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = user._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-3),
        email,
        profilePicture: googlePhotoUrl,
        password: hashedPassword
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = newUser._doc;

      res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    }
  } catch (error) {
    next(error);
  }
};