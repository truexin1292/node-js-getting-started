'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var user = new AV.User();

// 注册
router.post('/',
    (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var phone = req.body.phone;

        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setMobilePhoneNumber(phone);

        user.signUp().then(
            (registerUser) => {
                // 注册成功，跳转到商品 list 页面
                res.redirect('/login', () => {
                    console.log('registerUser', registerUser);
                });
            },
            (error) => {
                alert(JSON.stringify(error));
            }
        );

    }
);

module.exports = router;

