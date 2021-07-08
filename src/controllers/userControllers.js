const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signupUser = (req, res) => {
  res.render('user/signupForm')
}

const loginUser = (req, res) => {
  res.render('user/loginForm')
}


const createUser = async (req, res) => {

  try {
    const { userName, email, password } = req.body;
    console.log('password inside cotroller', password)
    const user = new User({ userName, email, password });
    // user.password = await encryptePassword(password);
    await user.save();
    res.send('user created')
  } catch (error) {
    res.redirect('/signup')
    console.log(error)
  }
}

const getUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email });



  if (user) {
    const correctPassword = await user.passwordMatch(password)
    if (correctPassword) {
      req.session.userId = user._id
      res.redirect('/tasks');
    }
    res.redirect('/login');
  } else {
    res.redirect('/login');
  }


}


const logoutUser = (req, res) => {
  req.session.userId = null
  res.redirect('/login')
}




module.exports = { createUser, loginUser, signupUser, getUser, logoutUser }