'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Login = AV.Object.extend('Login');

//渲染login页面
router.get('/',
    (req, res, next) => {
        res.render('login', { title: '登录', btnTxt: '登录' });
    }
);

// 登录
router.post('/',
    (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;

        AV.User.logIn(username, password).then(
            (loginUser) => {
                // 登录成功，跳转到商品 list 页面
                res.redirect('/lists');
            },
            (error) => {
                // res.render('error', {
                //     message: error.message,
                //     error
                // });
                next(error);
            }
        );
    }
);

module.exports = router;

