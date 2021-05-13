require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const Async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Users = require("../../data/models/Users");
const Departments = require("../../data/models/Department");
const News = require("../../data/models/News");

const getBTV = async (idBTV) => {
  if(!idBTV){
    const data  = await Users.findOne({_id: idBTV})
    return data;
  }
  return 0;
}

module.exports.getUsers = async (req, res, next) => {
  const getDepartment = await Departments.find();
  const getBTV = await Users.find();
  let user = await Users.find().sort({power: 1});
  const data = user.map( item => {
    if(item.idBTV){
    return {
      ...item,
      nameDepartment: getDepartment.find( val => String(val._id) === item.department)?.name,
      nameBTV: getBTV.find( val => String(val._id )== item.idBTV)?.username,
    }}else{
      return {
        ...item,
        nameDepartment: getDepartment.find( val => String(val._id) === item.department)?.name,
      }
    }
  })
  return res.status(200).json({
    user: data
  });
};

//sign in user
module.exports.postRegister = async (req, res, next) => {
  // const { username, email, department, password, confirmPassword, phoneNumber, fullName , IdBTV} = req.body;
  // const BTV = await Users.find({$and: [{power: "3"}, {department: department}]})
  // console.log(BTV)

  // if (!username || !password || !department || !confirmPassword || !phoneNumber || !fullName ) {
  //   // console.log(username, password, department, configPassword)
  //   return res.json({ message: "Vui lòng điền đầy đủ thông tin!" });
  // }

  // if (password.length < 6) {
  //   // console.log(username, password, department, configPassword)
  //   return res.json({ message: "Mật khẩu phải lớn hơn 6 ký tự" });
  // }

  // if (password !== confirmPassword) {
  //   return res.json({ message: "Mật khẩu không trùng khớp" });
  // }

  // const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  // console.log(!emailRegexp.test(email))
  // if(!emailRegexp.test(email)){
  //   return res.json({message: "Vui lòng nhập lại email"})
  // }

  // const searchUser = await Users.findOne({ email: email });
  // if (searchUser) {
  //   return res.json({ message: "Tài khoản đã tồn tại" });
  // } else {
  //   const newUser = new Users();
  //   newUser.username = username;
  //   newUser.password = newUser.generateHash(password);
  //   newUser.department = department;
  //   newUser.email = email;
  //   newUser.power = 4;
	// 	newUser.phoneNumber = phoneNumber;
  //   newUser.fullName = fullName;
  //   newUser.idBTV = IdBTV;

  //   await newUser.save();
  //   return res.json({ info: "Đăng kí tài khoản thành công !" });
  // }
};

//create user
module.exports.createUser = async (req, res) => {
  const { username, email, department, password, confirmPassword, phoneNumber, fullName, power, idBTV} = req.body;
  // const BTV = await Users.findOne()
  //                         .where('power').equals("3")
  //                         .where('department').equals(department);
  console.log(idBTV)
  if (!username || !password || !confirmPassword || !fullName) {
    return res.json({ message: "Không được để trống" });
  }

  if(!department || !power){
    return res.json({message: "Bạn chưa chọn phòng ban hoặc vai trò của người dùng!!"})
  }
  
  if (password.length < 6) {
    return res.json({ message: "Mật khẩu phải lớn hơn 6 ký tự" });
  }

  if (password !== confirmPassword) {
    return res.json({ message: "Mật khẩu không trùng khớp" });
  }

  if(!Number(phoneNumber) || phoneNumber.length < 10){
    return res.json({message: "Số điện thoại không đúng. Yêu cầu nhập lại"})
  }

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if(!emailRegexp.test(email)){
    return res.json({message: "Vui lòng nhập lại email"})
  }

  if( power === 4 ){
    if(!idBTV)  
      return res.json({message: "Quản lý không được để trống"})
  }

  const searchUser = await Users.findOne({ email: email });
  if (searchUser) {
    return res.json({ message: "Tài khoản đã tồn tại" });
  } else {
    const newUser = new Users();
    newUser.username = username;
    newUser.password = newUser.generateHash(password);
    newUser.department = department;
    newUser.email = email;
    newUser.power = power;
    newUser.fullName = fullName;
    newUser.phoneNumber = phoneNumber;
    if(power === 4){
      newUser.idBTV = idBTV;
    }

    await newUser.save();
    return res.json({ info: "Tạo tài khoản thành công" });
  }
};

module.exports.postLogIn = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(password, email);
  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.json({
      auth: false,
      token: null,
      message: "Email không tồn tại !",
    });
  }

  if (!user.validPassword(password) || !password) {
    return res.json({
      auth: false,
      token: null,
      message: "Mật khẩu không đúng",
    });
  }

  const token = getSignedToken(user);
  res
    .status(200)
    .json({
      auth: true,
      token: token,
      user: user,
      message: "Đăng nhập thành công !",
    });
};

getSignedToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      department: user.department,
    },
    SECRET_KEY,
    { expiresIn: 86400 }
  );
};

module.exports.logout = (req, res, next) => {
  res.json({ auth: false, token: null, message: "Logout sussecfuly" });
};

module.exports.editInfo = async (req, res, next) => {
  const id = req.params;
  const data = await Users.findById(id);

  return res.json({users: data})
}

module.exports.updateInfoUser = async(req, res) => {
  const {id} = req.params;
  const {username, email, password, confirmPassword, phoneNumber} = req.body;

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  console.log(!emailRegexp.test(email))
  if(!emailRegexp.test(email)){
    return res.json({message: "Vui lòng nhập lại email"})
  }

  if(password.length < 6){
    return res.json({message: "Mật khẩu phải lớn hơn 6 kí tự"})
  }

  if(!password || !confirmPassword){
    return res.json({message: "Mật khẩu không được bỏ trống"})
  }
  const user = await Users.findById(id);

  user.username = username;
  user.phoneNumber = phoneNumber;
  user.email = email;
  user.password = user.generateHash(password);
  if(password === confirmPassword){
    await user.save();
    return res.json({message: "Cập nhật thành công"})
  }else{
    return res.json({message: "Mật khẩu không trùng khớp"})
  }
}

module.exports.forgot = (req, res, next) => {
  const email = req.body.email;
  Async.waterfall(
    [
      (done) => {
        crypto.randomBytes(20, (err, buf) => {
          let token = buf.toString("hex");
          done(err, token);
        });
      },
      (token, done) => {
        Users.findOne({ email: email }, (err, user) => {
          if (!user) {
            //req.flash('info', 'No account with that email address exits');
            return res.json({
              message: "No account with that email address exits",
            });
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save((err) => {
            done(err, token, user);
          });
        });
      },

      (token, user, done) => {
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "testnewpages21@gmail.com",
            pass: "ngoctham99",
          },
        });

        let mailOptionns = {
          to: user.email,
          from: "testnewpages21@gmail.com",
          subject: "Node.js Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://localhost:3000/auth/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        transporter.sendMail(mailOptionns, function (err, response) {
          if (err) {
            console.log("there was an error:", err);
          } else {
            return res.json({
              message:
                "An e-mail has been sent to " +
                user.email +
                " with further instructions.",
              user: user,
            });
          }
        });
      },
    ],
    (err) => {
      if (err) return next(err);
      res.json("none");
    }
  );
};

module.exports.resetPassword = async (req, res, next) => {
  const token = req.params.token;
  console.log(token);
  const user = await Users.findOne({
    resetPasswordToken: token,
  });
  if (user) {
    if (!user) {
      return res.json({
        message: "Password reset link is invalid or has expired",
      });
    } else {
      res.json({
        message: "password reset link a-ok",
        username: user.username,
      });
    }
  }
};

module.exports.updatePasswordViaEmail = (req, res, next) => {
  console.log(req.params.token);
  const { token } = req.params;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  console.log(newPassword);
  Async.waterfall(
    [
      function (done) {
        Users.findOne(
          { resetPasswordToken: req.params.token },
          function (err, user) {
            if (newPassword.length < 6) {
              return res.json({ message: "Must be greater than 6 characters" });
            }

            if (newPassword === confirmPassword) {
              user.password = user.generateHash(newPassword);
              user.resetPasswordExpires = undefined;
              user.resetPasswordToken = undefined;

              user.save((err) => {
                done(err, user);
              });
            } else {
              return res.json({ message: "Password does not match" });
            }
          }
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "testnewpages21@gmail.com",
            pass: "ngoctham99",
          },
        });
        var mailOptions = {
          to: user.email,
          from: "testnewpages21@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello," +
            user.username +
            "\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          // req.flash('result_reset', 'Success! Your password has been changed.');
          done(err);
          return res.json({
            message: "Success! Your password has been changed.",
          });
        });
      },
    ],
    function (err) {
      return res.json({ message: "Success! Your password has been changed." });
    }
  );
};

module.exports.delete = async (req, res, next) => {
  const userBTV = await Users.findOne({idBTV: req.params.id});
  const getNews = await News.findOne({IdUser: req.params.id});

  if(getNews) {
    return res.json({message: "Đã có bài viết thuộc người dùng này"});
  }

  if(userBTV){
    return res.json({message: "Đã có cộng tác viên thuộc quyền quản lý của người dùng này"})
  }
  const data = await Users.findByIdAndDelete(req.params.id)
  if(data) {
      res.json({user: data, message: "Xóa thành công"});
  }
};

module.exports.editUser = (req, res, next) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      res.json({ user: user });
    })
    .catch((err) => res.status(400).json({ err: err }));
};

module.exports.updateUser = async (req, res, next) => {
  const {id} = req.params;
  const {username, email, department, fullName, idBTV, power, phoneNumber, local} = req.body;
  const getBTV = await Users.findOne({idBTV: id});
  const getNewsByLocal = await Users.findOne({_id: local});
  const getUserUpdating = await Users.findOne({_id: id});
  console.log(getNewsByLocal.email)
  console.log(getUserUpdating.email)
  if(power ==="4" && !idBTV) {
    return res.json({message: "Chọn người sơ duyệt bài viết"})
  }
  
  console.log(getNewsByLocal.email === getUserUpdating.email)

  if(getNewsByLocal.email === getUserUpdating.email){
    return res.json({message: "Người dùng đang được sử dụng"})
  }

  if(getBTV){
    return res.json({message: "Đã có cộng tác viên thuộc quyền quản lý của người dùng này"})
  }

  if(!Number(phoneNumber) || phoneNumber.length < 10){
    return res.json({message: "Số điện thoại không đúng. Yêu cầu nhập lại"})
  }

  const user = await Users.findById(id)
  user.username = username;
  user.email = email;
  user.department = department;
  user.power = power;
  user.fullName = fullName;
  user.idBTV = idBTV;
  user.phoneNumber = phoneNumber;

  await user.save()
  return res.json({ message: "Cập nhật thành công" })
};

module.exports.findById = (req, res) => {
  const { id } = req.params;

  Users.findOne({ _id: id }).then((item) => {
    res.json({ user: item });
  });
};


//Danh sach cho duyet ban bien tap
module.exports.findIdBTV = async (req, res) => {
  const data = Users.find({power : 3});
  return res.json({userBVT : data})
}