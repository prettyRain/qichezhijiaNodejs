/**
 * Created by prettyRain on 2019/1/7.
 */




   window.onload = function(){
    var bannerimg ;
       //设置轮播图片的大小
    var bannerheight = function(){
        var banner = document.getElementsByClassName('banner')[0];
        banner.style.height = banner.getElementsByTagName('img')[0].offsetHeight+"px";
        var imgs = banner.getElementsByTagName('img');
        var bannernum = document.getElementsByClassName('bannernum')[0];
        bannernum.innerHTML = "";
        for(var i in imgs){
            if(!isNaN(i)){
                var li = document.createElement("li");
                bannernum.appendChild(li);
            }
        }
        bannernum.style.marginLeft = "-"+imgs.length*11/2+"px";
        //设置轮播图的初始位置
        bannerimg = document.querySelector(".bannerimg");
        for(var i = 0; i < bannerimg.children.length; i++){
            if(i ==0){
                bannerimg.children[0].style.left = "0px";
            }else{
                bannerimg.children[i].style.left= -bannerimg.offsetWidth + "px";
            }
        }
    }
    bannerheight();
    window.onresize = bannerheight;
    
    

    
    
   /**
    * 轮播图动画
    * @param obj
    * @param bannerimgs
    * @param bannernumlis
    * @constructor
    */
    function ActiveBanner(obj,bannerimgs,bannernumlis){
        this.index = 0;//第几张
        this.nextIndex = 0;//下一张
        this.preIndex = 0;//上一张
        this.obj = obj; //轮播图父节点
        this.timer = null;//定时器
        this.bannerimgs = bannerimgs;//轮播图伪数组
        this.bannernumlis = bannernumlis;//轮播小点伪数组
        this.config = {  //触摸参数
            startx : 0,
            endx : 0 ,
            movex : 0
        }
        this.init();//初始化
    }
    ActiveBanner.prototype = {
        init:function(){
            var _this = this;
            _this.timer = window.setInterval(function(){
                _this.banner("向左");
            },2000);
            this.move();
        },
        banner:function(direction){
            var _this = this;
            var bannernumlis = _this.bannernumlis;
            var bannerimgs = _this.bannerimgs;
            var bannerimg = _this.obj;
            for(var i = 0; i < bannernumlis.length; i++){
                bannernumlis[i].style.width = "5px";
                bannernumlis[i].style.padding= "3px";
            }
            if(direction == "向左"){
                var len = bannerimgs.length;
                if(_this.index == len){
                    _this.index = 0;
                }
                _this.nextIndex = parseInt(_this.index) + 1;
                if(_this.index == (len-1)){
                    _this.nextIndex = 0;
                }
                var item = bannerimgs[_this.index];
                var nextItem = bannerimgs[_this.nextIndex];
                console.log("index:"+_this.index);
                console.log("preIndex:"+_this.preIndex);
                bannernumlis[_this.nextIndex].style.width = "7px";
                bannernumlis[_this.nextIndex].style.padding= "3px 2px";
                nextItem.style.left = bannerimg.offsetWidth + "px";
                _this.animation(0,-bannerimg.offsetWidth,item);
                _this.animation(bannerimg.offsetWidth,0,nextItem);
                _this.index = _this.index + 1;
            }else if(direction == "向右"){
                var len = bannerimgs.length;
                if(_this.index == -1){
                    _this.index = 5;
                }
                _this.preIndex = parseInt(_this.index) - 1;
                if(_this.preIndex < 0){
                    _this.preIndex = len-1;
                }
                console.log("index:"+_this.index);
                console.log("preIndex:"+_this.preIndex);
                var item = bannerimgs[_this.index];
                var preItem = bannerimgs[_this.preIndex];
                bannernumlis[_this.preIndex].style.width = "7px";
                bannernumlis[_this.preIndex].style.padding= "3px 2px";
                preItem.style.left = -bannerimg.offsetWidth + "px";
                _this.animation(0,bannerimg.offsetWidth,item);
                _this.animation(-bannerimg.offsetWidth,0,preItem);
                _this.index = _this.index - 1;
            }
        },
        animation:function(leader,target,obj){
            var timer = window.setInterval(function(){
                var ca = (target-leader)/5;
                ca = ca > 0 ? Math.floor(ca) : Math.ceil(ca);
                if(Math.abs(ca) < 5){
                    leader = target;
                }else{
                    leader = leader + ca;
                }
                obj.style.left = leader + "px";
                if(leader == target){
                    window.clearInterval(timer);
                    return;
                }
            },5);
        },
        move:function(){
            var _this = this;
            var bannerimg = _this.obj;
            var bannerimgs = _this.bannerimgs;
            //触摸开始
            _this.obj.parentNode.addEventListener('touchstart',function(event){
                window.clearInterval(_this.timer);
                console.log(event);
                _this.config.startx = parseInt(event.touches[0].pageX);
            })
            //触摸移动
            _this.obj.parentNode.addEventListener("touchmove",function(event){
        
                var len = bannerimg.children.length;
                if(_this.index == len){
                    _this.index = 0;
                }else if(_this.index == -1){
                    _this.index = 5;
                }
                _this.nextIndex = parseInt(_this.index) + 1;
                if(_this.nextIndex == len){
                    _this.nextIndex = 0;
                }
                _this.preIndex = parseInt(_this.index) - 1;
                if(_this.preIndex < 0){
                    _this.preIndex = len-1;
                }
                _this.config.movex = parseInt(event.touches[0].clientX);
               
                var item = bannerimgs[_this.index];
                var nextItem = bannerimgs[_this.nextIndex];
                var preItem = bannerimgs[_this.preIndex];
                var movenumber = _this.config.movex - _this.config.startx;
                if( movenumber < 0){
                    console.log("nextIndex:"+_this.nextIndex+"index:"+_this.index);
                    nextItem.style.left = bannerimg.offsetWidth - Math.abs(movenumber) + "px";
                    item.style.left = - Math.abs(movenumber) + "px";
                }else{
                    preItem.style.left = -bannerimg.offsetWidth + Math.abs(movenumber) + "px";
                    item.style.left =  Math.abs(movenumber) + "px";
                }
        
            })
            //触摸结束
            _this.obj.parentNode.addEventListener("touchend",function(event){
                console.log(event);
                _this.config.endx = parseInt(event.changedTouches[0].clientX);
        
                if(Math.abs(_this.config.endx - _this.config.startx) > _this.obj.parentNode.offsetWidth/2){
                    //往左
                    if(_this.config.endx-_this.config.startx < 0){
                        _this.banner("向左");
                    }else{
                        //往右
                        _this.banner("向右");
                    }
                }else{
                    var item = bannerimg.children[_this.index];
                    var nextItem = bannerimg.children[_this.nextIndex];
                    var preItem = bannerimg.children[_this.preIndex];
                    item.style.left = "0px";
                    nextItem.style.left = _this.obj.parentNode.offsetWidth + "px";
                    preItem.style.left = -_this.obj.parentNode.offsetWidth + "px";
                }
                _this.config.startx = 0; _this.config.endx = 0; _this.config.movex = 0;
                _this.timer = window.setInterval(function(){
                    _this.banner("向左");
                },2000);
            })
        }
    }
    new ActiveBanner(document.querySelector(".bannerimg"),document.querySelector(".bannerimg").children,document.querySelector('.bannernum').children)
    
    
    }

