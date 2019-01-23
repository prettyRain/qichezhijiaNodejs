/**
 * Created by prettyRain on 2019/1/22.
 */

var express = require('express');
var app = express();

app.use(express.static('./public'));
app.set('view engine','ejs');

var session = require('express-session');
var cookie = require('cookie-parser');
var router = require('./router/router.js');


app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 800000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));

app.get("/",router.showIndex);

app.get('/categray',router.showCategray);

app.get('/goodsDetail',router.showGoodsDetail);

app.get('/regist',router.showRegist);
app.post('/doRegist',router.doRegist);
app.get('/login',router.showLogin);
app.post('/doLogin',router.doLogin);
app.get('/main',router.showMain);

app.get('/backLogin',router.backLogin);

app.get('/showChatroom',router.showChatroom);

app.get('/checklogin',router.checklogin);
//创建io公式
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection',function(socket){
    console.log("创建了一个连接");
    socket.on("fabiao",function(msg){
        console.log(msg);
        router.addMessage(msg.username,msg.content,function(){
            io.emit("zhanshi",{username:msg.username,content:msg.content});
        });
        
    })
})

server.listen(3000);