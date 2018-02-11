'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var user = new AV.User();

var Register = AV.Object.extend('Register');

// 查询 login 列表
router.get('/',
    (req, res, next) => {
        var query = new AV.Query(Register);
        query.find().then(
            (results) => {
                res.render('register', {});
            },
            (err) => {
                if (err.code === 101) {
                    res.render('register', {});
                } else {
                    next(err);
                }
            }
        ).catch(next);
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
            (err) => {
                next(err);
            }
        );

    }
);

module.exports = router;

