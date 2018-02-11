'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 退出当前用户
router.post('/',
    (req, res, next) => {
        console.log('log', res);
        AV.User.logOut().then(
            () => {
                res.redirect('/login');
            }, (err) => {
                next(err);
            }
        );
    }
);

module.exports = router;
