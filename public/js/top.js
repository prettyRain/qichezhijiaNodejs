/**
 * Created by prettyRain on 2019/1/16.
 */
/**
 * 设置服务效果
 * @param athmservice
 * @param service_arrowlayer
 * @param service_arrow
 * @param all
 * @constructor
 */
function Servicefun(athmservice,service_arrowlayer,service_arrow,all){
    this.athmservice = athmservice;
    this.service_arrowlayer = service_arrowlayer;
    this.service_arrow = service_arrow;
    this.all = all;
    this.init();
}
Servicefun.prototype = {
    init:function(){
        var _this = this;
        //服务置顶
        window.onscroll = function(){
            _this.topService();
        }
        //下拉显示更多服务
        this.topServiceMore();
    },
    topService:function(){
        var scrollPos;
        if (typeof window.pageYOffset != 'undefined')
        {
            scrollPos = window.pageYOffset;
        }
        else if (typeof document.compatMode != 'undefined' &&    document.compatMode != 'BackCompat')
        {
            scrollPos = document.documentElement.scrollTop;
        }
        else if (typeof document.body != 'undefined')
        {
            scrollPos = document.body.scrollTop;
        }
        if(scrollPos >= 44){
            this.athmservice.style.position="fixed";
            this.athmservice.style.top=0;
            this.athmservice.style.left=0;
            this.service_arrowlayer.style.position="fixed";
            this.service_arrowlayer.style.top="44px";
            this.service_arrowlayer.style.right="7px";
        }else if(scrollPos < 44){
            this.athmservice.style.position="relative";
            this.service_arrowlayer.style.position="absolute";
            this.service_arrowlayer.style.top="88px";
            this.service_arrowlayer.style.right="-92px";
        }
    },
    topServiceMore:function(){
        var _this = this;
        this.service_arrow.addEventListener('click',function(e){
            if(window.getComputedStyle(_this.service_arrowlayer,null).display == 'none'){
                _this.service_arrowlayer.style.display="table";
                _this.all.style.display="table";
                _this.service_arrow.style.transformOrigin = "center center";
                _this.service_arrow.style.transform="rotateZ(180deg)";
            }
        })
        this.all.addEventListener("click",function(e){
            _this.service_arrowlayer.style.position="absolute";
            _this.service_arrowlayer.style.display="none";
            _this.all.style.display="none";
            _this.service_arrow.style.transformOrigin = "center center";
            _this.service_arrow.style.transform="rotateZ(0deg)";
        })
    }
}
var athmservice = document.querySelector(".athm-nav-service");
var service_arrowlayer = document.querySelector(".service-arrowlayer");
var service_arrow = document.querySelector('.service-arrow');
var all = document.querySelector(".all");
new Servicefun(athmservice,service_arrowlayer,service_arrow,all);