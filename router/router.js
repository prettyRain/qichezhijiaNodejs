/**
 * Created by prettyRain on 2019/1/22.
 */

var md5 = require('../model/md5.js');
var db = require('../model/db.js');
var formidable = require('formidable');

var util = require('util');
/**
 * 首页
 * @param req
 * @param res
 * @param next
 */
exports.showIndex = function(req,res,next){
    if(req.session.login=="1"){
        res.render('index',{username:req.session.username,login:req.session.login});
        return;
    }
    res.render('index',{login:"-1"});
    

}

/**
 * 展示分类
 * @param req
 * @param res
 * @param next
 */
exports.showCategray = function(req,res,next){
    if(req.session.login=="1"){
        res.render('categray',{username:req.session.username,login:req.session.login});
        return;
    }
    res.render('categray',{login:"-1"});
}
/**
 * 展示商品详情
 * @param req
 * @param res
 * @param next
 */
exports.showGoodsDetail = function(req,res,next){
    if(req.session.login=="1"){
        res.render('goodsDetail',{username:req.session.username,login:req.session.login});
        return;
    }
    res.render('goodsDetail',{login:"-1"});
}

exports.showRegist = function(req,res,next){
    res.render('regist',{});
}

exports.doRegist = function(req,res,next){
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files) {
    
        console.log(util.inspect({fields: fields, files: files}));
        var username = fields.username;
        var password = md5(fields.password);
        db.find("users",{username:username},function(err,result){
            if(result.length > 0){
                //用户名被占用
                res.send("-1");
                return;
            }
            db.insertOne('users',{username:username,password:password},function(err,result){
                if(err){
                    res.send("-2");
                    return;
                }
                req.session.username = username;
                req.session.login = "1";
                res.send("1");
            })
        })
    })
}

exports.showLogin = function(req,res,next){
    res.render('login',{});
}

exports.doLogin = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        
        console.log(util.inspect({fields: fields, files: files}));
        var username = fields.username;
        var form_password = md5(fields.password);
        db.find("users",{username:username},function(err,result){
            if(result.length > 0){
                var username = result[0].username;
                var password = result[0].password;
                if(form_password.toString().trim() == password.toString().trim()){
                    req.session.username = username;
                    req.session.login = "1";
                    res.send("1");
                    return;
                }
                //密码不正确
                res.send("-2");
                return;
            }
            //用户名不存在
            res.send("-1");
        })
    })
}

exports.showMain = function(req,res,next){
    
    if(!!req.session.login && req.session.login== '1'){
        res.render('main',{username:req.session.username});
    }else{
        res.render('index',{login:"-1"});
    }
    
}

/**
 * 退出登录
 * @param req
 * @param res
 * @param next
 */
exports.backLogin = function(req,res,next){
    req.session.username = '';
    req.session.login = "-1";
    res.render('index',{login:"-1"});
}

/**
 * 聊天室
 * @param req
 * @param res
 * @param next
 */
exports.showChatroom = function(req,res,next){
    db.find('message',{},function(err,result){
        if(err || result.length < 1){
            res.render('chatroom',{"data":"error"});
            return;
        }
        res.render('chatroom',{"data":"success","messages":result});
    })
}
/**
 * 检查是否已登录
 * @param req
 * @param res
 * @param next
 */
exports.checklogin = function(req,res,next){
    if(!!req.session.login && req.session.login=='1'){
        res.send({login:"1",username:req.session.username});
        return;
    }
    res.send({login:"-1"});
}

exports.addMessage = function(username,content,callback){
    db.insertOne('message',{username:username,content:content},function(err,result){
        callback();
    })
}