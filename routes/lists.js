'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var List = AV.Object.extend('List');

// 查询 List 列表
router.get('/',
    (req, res, next) => {
        var query = new AV.Query(List);
        query.descending('content');
        query.find().then(
            (results) => {
                res.render('lists', {
                    title: 'List 列表',
                    lists: results
                });
            },
            (err) => {
                if (err.code === 101) {
                    // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，
                    // 说明 List 数据表还未创建，所以返回空的 List 列表。
                    // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
                    res.render('lists', {
                        title: 'List 列表',
                        lists: []
                    });
                } else {
                    next(err);
                }
            }
        ).catch(next);
    }
);

// 新增 List 项目
router.post('/',
    (req, res, next) => {
        var content = req.body.content;
        var list = new List();
        list.set('content', content);
        list.save().then((list) => {
                res.redirect('/lists');
            }
        ).catch(next);
    }
);

module.exports = router;
