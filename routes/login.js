'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 登录
router.post('/',
    (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;

        AV.User.logIn(username, password).then(
            (loginUser) => {
                // 登录成功，跳转到商品 list 页面
                res.redirect('/lists', () => {
                    console.log('loginUser', loginUser);
                });
            },
            (error) => {
                alert(JSON.stringify(error));
            }
        );
    }
);

module.exports = router;

