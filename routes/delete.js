'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var List = AV.Object.extend('List');

// 新增 List 项目
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
                console.log('error', error);
                res.render('lists', {
                    title: 'List 列表errors',
                    lists: []
                });
            }
        );
    }
);

module.exports = router;
