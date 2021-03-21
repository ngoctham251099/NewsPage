const express = require('express');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs')
const SECRET_KEY = process.env.SECRET_KEY;
const Async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Users = require('../../data/models/Users');

module.exports.getUsers = async (req, res, next) => {
		let user = await Users.find();
		return res.status(200).send(user);
}

//create user
module.exports.postRegister = async (req, res, next) => {
		const { username, email, department, password, confirmPassword} = req.body;

		console.log(department)
		console.log(password)
		console.log(confirmPassword)

		if(!username || !password || !department || !confirmPassword){
			 // console.log(username, password, department, configPassword)
				return res.json({message: "Please fill in all fields"})
		}
		console.log(password)
		if(password.length < 6){
			 // console.log(username, password, department, configPassword)
				return res.json({message: "Mật khẩu phải lớn hơn 6 ký tự"})
		}

		const searchUser = await Users.findOne({email: email})
		if(searchUser){
				return res.json({message: "Tài khoản đã tồn tại"})
		}else{
				const newUser = new Users();
				newUser.username = username;
				newUser.password = newUser.generateHash(password);
				newUser.department = department;
				newUser.email = email;
				newUser.power = 1;

				await newUser.save();
				return res.json({info: "Tao tai khoan thanh cong"})
		}

}

module.exports.postLogIn = async (req, res, next) => {
		const {email, password} = req.body;

		const user = await Users.findOne({email: email});
		if(!user){
				return res.json({auth: false, token: null, message: "Email khong ton tai"})
		}

		if(!user.validPassword(password) || !password){
				return res.json({auth: false, token: null, message: "Mat khau khong dung"});
		}

		const token = getSignedToken(user);
		res.status(200).json({auth: true, token: token, user: user, message: 'Login successfuly'});
}

getSignedToken = user => {
		return jwt.sign ({
				id: user._id,
				email: user.email,
				username: user.username,
				department: user.department,
		}, SECRET_KEY, { expiresIn: 86400 })
}


module.exports.logout = (req, res, next) =>{
		res.json({auth: false, token: null, message: "Logout sussecfuly"});
}

module.exports.forgot = (req, res, next) =>{
		const email = req.body.email;
		console.log(email)
		Async.waterfall([
			(done) => {
				crypto.randomBytes(20, (err, buf)=>{
					let token = buf.toString('hex');
					done(err, token);
				});
			},
			(token, done)=>{
				Users.findOne({email: email}, (err, user)=>{
					if(!user){
						//req.flash('info', 'No account with that email address exits');
						return res.json({message: "No account with that email address exits"});
					}

					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000;

					user.save((err)=>{
						done(err, token, user);
					});
				});
			},

			(token, user, done)=>{
				let transporter = nodemailer.createTransport({
					service: "Gmail",
					host: "smtp.ethereal.email",
					port: 587,
					secure: false,
					auth: {
						user: 'testnewpages21@gmail.com',
						pass: 'ngoctham99'
					}
				});

				let mailOptionns = {
					to: user.email,
					from: 'testnewpages21@gmail.com',
					subject: 'Node.js Password Reset',
					text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
						'http://localhost:3000/auth/reset/' + token + '\n\n' +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n'
				};
				transporter.sendMail(mailOptionns, function(err, response) {
					if(err){
						console.log("there was an error:", err);
					}else{
						console.log("here is the res:" , response);
						return res.json({message: 'An e-mail has been sent to ' + user.email + ' with further instructions.',
											user: user
					 })
					}
				});
			}
		], (err)=>{
			if(err)
				return next(err);
			res.json("none");
		})
	}

module.exports.resetPassword = (req, res, next) => {
	const token = req.params.token;
	console.log(token)
	Users.findOne({
			resetPasswordToken: token,
	})
	.then(
		user => {
			if(user == null){
				return res.json({message: "Password reset link is invalid or has expired"});
			}else{
				res.json({message: "password reset link a-ok",
									username: user.username
				})
			}
		}
	)
}

module.exports.updatePasswordViaEmail = (req, res, next) => {
	console.log(req.params.token)
	const token = req.params.token
	const newPassword = req.body.newPassword
	const confirmPassword = req.body.confirmPassword
	console.log(newPassword)
	Async.waterfall([
		function(done) {
			Users.findOne({resetPasswordToken: req.params.token}, function(err, user) {
				if (!user) {
					//req.flash('result_reset', 'Password reset token is invalid or has expired.');
					return res.json({message: 'Password reset token is invalid or has expired.'});
				}

				if(newPassword.length < 6){
					return res.json({message: 'Must be greater than 6 characters'});
				}

				if(newPassword === confirmPassword){
					user.password = user.generateHash(newPassword);
					user.resetPasswordExpires = undefined;
					user.resetPasswordToken = undefined;

					user.save((err)=>{
						done(err, user);
					});
				}else{
					return res.json({message: 'Password does not match'});
				}
			});
		},
		function(user, done) {
			var smtpTransport = nodemailer.createTransport( {
				service: "Gmail",
				host: "smtp.ethereal.email",
				port: 587,
				secure: false,
				auth: {
					user: 'testnewpages21@gmail.com',
					pass: 'ngoctham99'
				}
			});
			var mailOptions = {
				to: user.email,
				from: 'testnewpages21@gmail.com',
				subject: 'Your password has been changed',
				text: 'Hello,'+ user.username +'\n\n' +
					'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err) {
			 // req.flash('result_reset', 'Success! Your password has been changed.');
				done(err);
				return res.json({message: 'Success! Your password has been changed.'})
			});
		}
	], function(err) {
		return res.json({message: 'Success! Your password has been changed.'})
	});
}

module.exports.delete = (req, res, next) => {
	Users.findByIdAndDelete(req.params.id)
	.then(user => {
		res.json(user);
	})
	.catch(
		err => res.status(400).json('Err: ' + err)
	)
}

module.exports.editUser = (req, res, next) => {
	Users.findById(req.params.id)
	.then(
			user => {
					res.json({user: user});
			}
	).catch(
			err => res.status(400).json({err: err})
	)
}

// //update department
// module.exports.updateUser = (req, res, next) => {
//  // res.setHeader("Content-Type", "text/html");
//   let {username, email, department, power} = req.body;
//   // let email  = req.body.email;
//   // let department = req.body.department;
//   // let power = req.body.power;
//   Users.findById(req.params.id)
//   .then(user => {
//       console.log(username, email, department, power)
//       user.name = username;
//       user.email = email;
//       user.department = department;
//       user.power = power;
//       user.save()
//       .then(() => res.json({message:'Exercise update'}))
//       .catch( err => res.status(400).json('Err: ' + err));
//   })
// }

module.exports.updateUser = (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const department = req.body.department;
	const power = req.body.power;
	Users.findById(req.params.id)
	.then(
		user => {
			user.username = username;
			user.email = email;
			user.department = department;
			user.power = power

			user.save()
			.then(() => res.json({message:'Exercise update'}))
			.catch( err => res.status(400).json('Err: ' + err));
			console.log(username, email, department, power);
		 // console.log(username, email)
		}
	)
}