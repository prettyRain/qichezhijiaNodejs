/**
 * Created by prettyRain on 2019/1/22.
 */

var nav_more = document.querySelector('.nav-more');
var loginAndRegist = document.querySelector('.loginAndRegist');
var rgba = document.querySelector('.rgba');
nav_more.addEventListener('click',function(){
    loginAndRegist.style.display = "block";
    rgba.style.display = 'block';
})
rgba.addEventListener('click',function(){
    loginAndRegist.style.display = "none";
    rgba.style.display = 'none';
})