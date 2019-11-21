#!/usr/bin/env node

const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const nodemailer = require("nodemailer");

/* GET home page */
router.get('/', (req, res, next) => {
  let user = req.user
  res.render('index', { user: req.user });
});

router.get("/private-page", ensureLogin.ensureLoggedIn('/auth/login'), (req, res) => {
  res.render("private", { user: req.user });
});

router.post("/sendmail", ensureLogin.ensureLoggedIn('/auth/login'), (req, res) => {
  const {firstname, lastname, phone, email, date} = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           //pass: process.env.PWD
          user: process.env.MAIL,
          pass: process.env.PASS
       }
  });

  const mailOptions = {
    from: process.env.MAIL,
    to: 'carlosdss84@gmail.com',
    //to: 'pruebas.analyticsdata.bmind@gmail.com',
    subject: 'Customer data',
    html: `<p>First Name: ${firstname}</p>
          <p>Last Name: ${lastname}</p>
          <p>Phone: ${phone}</p>
          <p>Email: ${email}</p>
          <p>Birth Date: ${date}</p>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });

res.redirect('/auth/logout')

});

module.exports = router;


