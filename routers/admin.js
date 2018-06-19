var mongodb = require('mongodb');
var sd = require('silly-datetime');
var db = require('../models/db.js');

var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;//将数组对象id
db.dburl = "mongodb://localhost:27017/blog";


module.exports.admin = function(req,res) {
    if(req.session.username=="admin"){
        res.render("admin/layout",{
            username:'admin',
            path:"index.ejs"
        })
    }
}

module.exports.adminUser = function(req,res) {
    //if(req.session.username=="admin"){
    db.find("users",{},{},function(a){
        var yeshu = Math.ceil(a.length/5)
        console.log(yeshu)
        var page = Number(req.query.page)||0
        if(page<0){
            page=0
        }else if(page >= yeshu){
            page = yeshu-1
        }
        db.find("users",{},{skipnum:page,limit:5},function(arr){
            res.render("admin/layout",{
                username:'admin',
                path:"user",
                message:arr,
                showlen: page,
                to:"user",
                page:page,
                len: a.length,
                limit:5,
                yeshu:yeshu
            })
        })
    })
    //}
}
module.exports.adminCategory = function(req,res) {
    db.find("types",{},{},function(a){
        var yeshu = Math.ceil(a.length/5)
        var page = Number(req.query.page)||0
        if(page<0){
            page=0
        }else if(page >= yeshu){
            page = yeshu-1
        }
        db.find("types",{},{skipnum:page,limit:5},function(arr){
            res.render("admin/layout",{
                username:'admin',
                path:"category",
                message:arr,
                showlen: page,
                page:page,
                to:"category",
                len: a.length,
                limit:5,
                yeshu:yeshu
            })
        })
    })
    //}
}

module.exports.adminCategoryEdit = function(req,res) {
    db.find("types",{"_id":ObjectId(req.query.id)},{},function(arr){
        res.render("admin/layout",{
            username:'admin',
            path:"adminCategoryEdit",
            category:arr[0]
        })
    })
}


module.exports.adminCategoryEditPost = function(req,res) {
    db.updateOne("types",{"_id":ObjectId(req.body.id)},{"name":req.body.name},function(err,results){
        if(err){
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"修改分类失败",
                url:"category"
            })
        }else{
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"修改分类成功",
                url:"category"
            })
        }

    })

}

module.exports.adminCategoryDelete = function(req,res) {
    db.deleteMany("types",{"_id":ObjectId(req.query.id)},function(err,results){
        if(err){
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"删除分类失败",
                url:"category"
            })
        }else{
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"删除分类成功",
                url:"category"
            })
        }

    })
}

module.exports.adminCategoryAdd = function(req,res) {
    res.render("admin/layout",{
        username:'admin',
        path:"category_add.ejs"
    })
}


module.exports.adminCategoryAddPost = function(req,res) {
    db.find("types",{},{},function(arr){
        db.insertOne("types",{"name":req.body.name,"id":arr.length+1},function(err,results){
            if(err){
                res.render("admin/layout",{
                    username:'admin',
                    path:"success.ejs",
                    message:"添加分类失败",
                    url:"category"
                })
            }else{
                res.render("admin/layout",{
                    username:'admin',
                    path:"success.ejs",
                    message:"添加分类成功",
                    url:"category"
                })
            }
        })
    })
}



module.exports.adminContent = function(req,res) {
    //if(req.session.username=="admin"){
    db.find("message",{},{},function(a){
        var yeshu = Math.ceil(a.length/5)
        var page = Number(req.query.page)||0
        if(page<0){
            page=0
        }else if(page >= yeshu){
            page = yeshu-1
        }
        db.find("message",{},{skipnum:page,limit:5},function(arr){
            res.render("admin/layout",{
                username:'admin',
                path:"content_index",
                message:arr,
                showlen: page,
                page:page,
                to:"content",
                len: a.length,
                limit:5,
                yeshu:yeshu
            })
        })
    })
    //}
}

module.exports.adminContentEdit = function(req,res) {
    db.find("message",{"_id":ObjectId(req.query.id)},{},function(arr){
        db.find("types",{},{},function(a){
            res.render("admin/layout",{
                username:'admin',
                path:"content_edit.ejs",
                content:arr[0],
                types:a
            })
        })
    })
}
module.exports.adminContentEditPost = function(req,res) {
    db.updateOne("message",{"_id":ObjectId(req.body.id)},{
        $set:{"type":req.body.category,"title":req.body.title,
            "content":req.body.content,
            "description":req.body.description}

    },function(err,results){
        if(err){
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"修改失败",
                url:"content"
            })
        }else{
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"修改成功",
                url:"content"
            })
        }

    })
}
module.exports.adminContentDelete = function(req,res) {
    db.deleteMany("message",{"_id":ObjectId(req.body.id)},function(err,results){
        if(err){
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"删除失败",
                url:"content"
            })
        }else{
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"删除成功",
                url:"content"
            })
        }

    })
}
module.exports.adminContentAdd = function(req,res) {
    db.find("types",{},{},function(arr) {
        res.render("admin/layout", {
            username: 'admin',
            path: "content_add.ejs",
            types:arr
        })
    })
}

//添加message
module.exports.adminContentAddPost = function(req,res) {
    db.insertOne("message",{
        "author":"伟哥",
        "reading":0,
        "type":req.body.category,
        "title":req.body.title,
        "content" :req.body.content,
        "description" : req.body.description,
        "addTime":sd.format(new Date(), 'YYYY年MM月DD日HH:mm'),
        "pinglun":[
        ]
    },function(err,results){
        if(err){
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"添加内容失败",
                url:"content"
            })
        }else{
            res.render("admin/layout",{
                username:'admin',
                path:"success.ejs",
                message:"添加内容成功",
                url:"content"
            })
        }
    })
}