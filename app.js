var express = require('express');
var bodyParser = require('body-parser');
var mian = require('./routers/mian.js');
var admin = require('./routers/admin.js');
var session = require('express-session')
var app = express();
app.use( '/public', express.static( __dirname + '/public') );
app.set('view engine', 'ejs');
app.use( bodyParser.urlencoded({extended: true}) );
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }//去掉  否则不生效
}));
app.get('/',mian.shouye)
app.get('/api/types',mian.types)
app.get('/api/message',mian.message)
app.get('/api/view',mian.view)
app.post('/login',mian.login)
app.post('/api/comment/post',mian.comment)
app.post('/api/user/register',mian.register)
app.get('/api/user/logout',mian.logout)

app.get('/admin',admin.admin);
app.get('/admin/user',admin.adminUser);
app.get('/admin/category',admin.adminCategory);
app.get('/admin/category/edit',admin.adminCategoryEdit);
app.post('/admin/category/edit',admin.adminCategoryEditPost);
app.get('/admin/category/delete',admin.adminCategoryDelete);
app.get('/admin/category/add',admin.adminCategoryAdd);
app.post('/admin/category/add',admin.adminCategoryAddPost);

app.get('/admin/content',admin.adminContent);
app.get('/admin/content/edit',admin.adminContentEdit);
app.post('/admin/content/edit',admin.adminContentEditPost);

app.get('/admin/content/delete',admin.adminContentDelete);
app.get('/admin/content/add',admin.adminContentAdd);
app.post('/admin/content/add',admin.adminContentAddPost);

app.listen(3000);
//var mes = {"cate":[{"author":"伟哥","reading":0,"type":"html","title":'什么是 HTML',"content" : "HTML 指的是超文本标记语言 (Hyper Text Markup Language)\r\nHTML 不是一种编程语言，而是一种标记语言 (markup language)\r\n标记语言是一套标记标签 (markup tag)\r\nHTML 使用标记标签来描述网页", "description" : "HTML 是用来描述网页的一种语言。","addTime":"2017-11-20","pinglun":[{"user":"admin","plnr":"写的不错","pldate":"2017-11-21"}]}]}