'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Login = AV.Object.extend('Login');

// 查询 login 列表
router.get('/',
    (req, res, next) => {
        var query = new AV.Query(Login);
        query.find().then(
            (results) => {
                res.render('login', {});
            },
            (err) => {
                if (err.code === 101) {
                    res.render('login', {});
                } else {
                    next(err);
                }
            }
        ).catch(next);
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
            (err) => {
                next(err);
            }
        );
    }
);

module.exports = router;

