var MongoClient = require("mongodb").MongoClient;

exports.dburl="";

function _connect(url,callback){
    MongoClient.connect(url,function(err,db){
        if(err){
            callback(err,db)
            return
        }
        callback(err,db)
        return
    })
}

//添加单条数据
exports.insertOne = function(collectionName,json,callback){
    var url = this.dburl;
    _connect(url,function (err,db){
        if(err){
            throw err;
            return
        }
        db.collection(collectionName).insertOne(json,function(err,results){
            callback(err,results);
            db.close()
        })
        return
    });
}

//删除数据
exports.deleteMany = function (collectionName,json,callback) {
    var url = this.dburl;
    _connect(url,function (err,db) {
        db.collection(collectionName).deleteMany(json,
            function(err, results) {
                // console.log(results);
                callback(err,results);
                db.close();//关闭数据库
                return
            }
        );
    })
};

exports.updateOne = function (collectionName,zhiding,json,callback) {
    var url = this.dburl;
    _connect(url,function (err,db) {
        db.collection(collectionName).update(zhiding,json,
            function(err, results) {
                // console.log(results);
                callback(err,results);
                db.close();//关闭数据库
                return
            }
        );
    })
};


//查找数据
//{skipnum:10,limit:8,sortobj:{"num":4,"posts": 1}},callback
exports.find = function(collectionName,json,sls,callback){
    var url = this.dburl;
    if(arguments.length == 2){
        var callBack = json;
        var skipnum = 0;
        var sort = {};
        var limit = 0;
    }else if(arguments.length == 3){
        var slsdata = json;
        var skipnum = json.limit*sls.skipnum || 0;
        var limit = json.limit || 0;
        var sort = json.sortobj ||{};
        var callBack = sls
    }else if(arguments.length == 4){
        var jsondata = json;
        var skipnum = sls.limit*sls.skipnum || 0;
        var sort = sls.sortobj || {};
        var callBack = callback;
        var limit = sls.limit || 0;
    }else {
        throw new Error("参数必须是二个到四个");
        return;
    }
    _connect(url,function(err,db){
        var cursor = db.collection(collectionName).find(jsondata).skip(skipnum).limit(limit).sort(sort);
        var arr = [];
        cursor.each(function(err,doc){
            if(err){
                callBack(err)
                return
            }
            if(doc!==null){
                arr.push(doc)
            }else{
                callBack(arr)
                db.close();
                return
            }
        })
    })
}


exports.consoleLog = function(a){
    console.log(this.dburl)
}


