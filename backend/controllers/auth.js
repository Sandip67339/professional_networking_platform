const User = require("../models/user");
const Company = require("../models/company");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const { sendVerificationMailUser } = require("./userEmailVerification");
const { sendVerificationMailCompany } = require("./companyEmailVerification");

// user registration
const userRegistration = catchAsync(async (req, res, next) => {
  const { name, username, email, password, cpassword } = req.body;

  if (!name || !username || !email || !password || !cpassword) {
    return next(new ErrorHandler("Please fill all the fields properly", 400));
  }

  if (password != cpassword) {
    return next(new ErrorHandler("Passowrd's doesn't match", 406));
  }

  //for saving user's image in database
  const file = req.file;
  if (!file) {
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
    });
    newUser.save();

    if (!newUser) {
      return next(
        new ErrorHandler("Something went wrong, User not created!", 500)
      );
    }

    // send verification mail
    sendVerificationMailUser(req.body.name, req.body.email, newUser._id);
  } else {
    const filename = file.filename;
    const basepath = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/userImages/`;

    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
      image: `${basepath}${filename}`,
    });

    newUser.save();

    if (!newUser) {
      return next(
        new ErrorHandler("Something went wrong, User not created!", 500)
      );
    }

    // send verification mail
    sendVerificationMailUser(req.body.name, req.body.email, newUser._id);
  }

  res.status(201).json({
    success: true,
    msg: "An email has been sent. Please verify your account.",
  });
});

// company registration
const companyRegistration = catchAsync(async (req, res, next) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return next(new ErrorHandler("Please fill all the fields properly", 400));
  }

  if (password != cpassword) {
    return next(new ErrorHandler("Passowrd's doesn't match", 406));
  }

  //for saving company's image in database
  const file = req.file;
  if (!file) {
    const newUser = await Company.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
    });
    newUser.save();

    if (!newUser) {
      return next(
        new ErrorHandler("Something went wrong, User not created!", 500)
      );
    }

    // send verification mail
    sendVerificationMailCompany(req.body.name, req.body.email, newUser._id);
  } else {
    const filename = file.filename;
    const basepath = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/userImages/`;

    const newUser = await Company.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
      image: `${basepath}${filename}`,
    });

    newUser.save();

    if (!newUser) {
      return next(
        new ErrorHandler("Something went wrong, User not created!", 500)
      );
    }

    // send verification mail
    sendVerificationMailCompany(req.body.name, req.body.email, newUser._id);
  }

  res.status(201).json({
    success: true,
    msg: "An email has been sent. Please verify your account.",
  });
});

// login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the credentials", 400));
  }

  //   to determine if the credentials are of a user or a company
  const isUser = await User.findOne({ email: email });
  const isCompany = await Company.findOne({ email: email });

  if (isUser) {
    if (!isUser.isVerified) {
      return next(
        new ErrorHandler("Email is not verified. Please verify your email", 406)
      );
    }

    // comparing hashed password
    const comparePassword = await isUser.comparePassword(password);

    if (!comparePassword) {
      return next(new ErrorHandler("Invalid user credentials", 401));
    }

    const token = await isUser.getJwt();

    return res
      .status(200)
      .json({ msg: "Logged in successfully", token: token });
  }

  if (isCompany) {
    if (!isCompany.isVerified) {
      return next(
        new ErrorHandler("Email is not verified. Please verify your email", 406)
      );
    }

    // comparing hashed password
    const comparePassword = await isCompany.comparePassword(password);

    if (!comparePassword) {
      return next(new ErrorHandler("Invalid user credentials", 401));
    }

    const token = await isCompany.getJwt();

    return res
      .status(200)
      .json({ msg: "Logged in successfully", token: token });
  }

  return next(new ErrorHandler("Invalid Credentials", 401));
});

module.exports = { userRegistration, companyRegistration, login };
