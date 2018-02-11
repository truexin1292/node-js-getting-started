'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 删除 List 项
router.post('/',
    (req, res, next) => {
        var objectId = req.body.objectId;
        // 执行 CQL 语句实现删除一个 Todo 对象
        AV.Query.doCloudQuery(`delete from List where objectId='${objectId}'`).then(() => {
                // 删除成功
                res.redirect('/lists');
            },
            (error) => {
                // 异常处理
                res.render('lists', {
                    title: 'LIST OF ERRORS',
                    lists: []
                });
            }
        );
    }
);

module.exports = router;
