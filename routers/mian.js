var mongodb = require('mongodb');
var sillyDatetime = require('silly-datetime');
var db = require('../models/db.js');

var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;//将数组对象id
db.dburl = "mongodb://localhost:27017/blog";

module.exports.shouye = function(req,res){
    var num = req.query.cateid||"";
    req.session.cateid = num
    var numobj = num==""?{}:{"type":num}
        if(req.query.username){
            db.find("users",{"name":req.query.username},{},function(re){
                req.session.username = req.query.username
                req.session.user_id = re[0]._id
                res.render("main/layout",{
                    isShowId:num,
                    isadmin:re[0].isadmin,
                    user:re[0].name||"",
                    loginshow:false
                })
            })
        }else {
            res.render("main/layout",{
                isShowId:num,
                isadmin:false,
                user:"",
                loginshow:true
            })
        }

}

module.exports.login = function(req,res){
    db.find("users",{"name":req.body.username},{},function(arra){
        if(arra[0]){
            if(arra[0].pwd==req.body.password){
                req.session.username = req.query.username

                if(arra[0].isadmin){
                    res.json({message:"",code:false,isadmin:true,usermes:arra[0]})
                }else{
                    res.json({message:"",code:false,isadmin:false,usermes:arra[0]})
                }
            }else{
                res.json({message:"密码错误",code:true,isadmin:false})
            }
        }else{
            var aaa = "用户不存在"
            res.json({message:"用户不存在",code:true,isadmin:false})
        }
    })
}

module.exports.types = function(req,res){
    db.find("types",{},{},function(a){
        res.json({cate:a,isshow:req.session.cateid})
    })
}

module.exports.message = function(req,res){
    if(req.query.typeo){
        db.find("message",{"type":req.query.typeo},{},function(a){
            var yeshu = Math.ceil(a.length/5)
            var page = Number(req.query.page)||0
            if(page<0){
                page=0
            }else if(page >= yeshu){
                page = yeshu-1
            }
            db.find("message",{"type":req.query.typeo},{skipnum:page,limit:5},function(arr){
                res.json({message:arr,page:page,yeshu:yeshu})
            })
        })
    }else{
        db.find("message",{},{},function(a){
            var yeshu = Math.ceil(a.length/5)
            res.json({message:a,page:0,yeshu:yeshu})
        })
    }




}

module.exports.view = function(req,res) {
    db.find("message",{"_id":ObjectId(req.query.contentid)},{},function(arr){
        db.find("users",{"_id":ObjectId(req.session.user_id)},{},function(re) {
            res.json({viewmes:arr[0],user:re[0]})
        })
    })
}

module.exports.comment = function(req,res) {
    db.updateOne("message",{_id:ObjectId(req.body.wenzhangId)},
        {
            $push:{
                pinglun:{
                "user" : req.body.user,
                "plnr" : req.body.plnr,
                "pldate" : req.body.pldate
                }
            }
        }
        ,
        function(err,results){
    })
}

module.exports.logout = function(req,res) {
    req.session.username = null;
    res.redirect("/")
}
module.exports.register = function(req,res) {
   if(req.body.password!=req.body.repassword){
       res.json({dui:"两次输入不统一",code:false})
   }else{
       db.insertOne("users",{"name" : req.body.username,
           "pwd" : req.body.password,
           "isadmin" : false},function(err,ruslte){
           res.json({dui:"注册成功",code:true,reqb:req.body})
       })
   }
}
