'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var user = new AV.User();

// 渲染register页面
router.get('/',
    (req, res, next) => {
        res.render('register', { title: '注册', btnTxt: '注册' });
    }
);

// 注册
router.post('/',
    (req, res, next) => {
        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;
        var phone = req.body.phone;

        user.setUsername(name);
        user.setPassword(password);
        user.setEmail(email);
        user.setMobilePhoneNumber(phone);

        user.signUp().then(
            (registerUser) => {
                // 注册成功，跳转到商品 list 页面
                res.redirect('/login');
            },
            (error) => {
                // res.redirect('/error');
                // res.render('error', {
                //     message: error.message,
                //     error: error
                // });
                next(error);
                // alert(JSON.stringify(error));
            }
        );

    }
);

module.exports = router;

