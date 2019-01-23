/**
 * Created by prettyRain on 2019/1/16.
 */

window.onload = function(){
    var listing = document.querySelector('.listing');
    var jump_tag = document.querySelector('.jump-tag');
    console.log(listing.offsetTop);
    
     window.document.onscroll = function(){
         showjumptag();
     }
    showjumptag();
     function showjumptag(){
         var scrollTop ;
         if(window.pageYOffset){
             scrollTop = window.pageYOffset;
         }else if(document.documentElement.scrollTop){
             scrollTop = document.documentElement.scrollTop;
         }else{
             scrollTop = document.body.scrollTop;
         }
         if(scrollTop + 44 >= listing.offsetTop){
             jump_tag.style.display = 'block';
         }else{
             jump_tag.style.display = 'none';
         }
     }
     
     var jumplis = document.querySelectorAll('.jump-li');
     for(var i = 0; i < jumplis.length; i++){
         jumplis[i].onclick = function(){
             console.log(1);
             var data_li = this.getAttribute('data-li');
             console.log(data_li);
             var jump_xx;
             if(data_li == 'jumphot'){
                 jump_xx= document.querySelector('.carts');
             }else{
                 jump_xx = document.querySelector('#' + data_li);
             }
             
             var scrollTop ;
             if(window.pageYOffset){
                 scrollTop = window.pageYOffset;
             }else if(document.documentElement.offsetTop){
                 scrollTop = document.documentElement.offsetTop;
             }else{
                 scrollTop = document.body.scrollTop;
             }
             window.scrollBy(0,jump_xx.offsetTop-scrollTop-44);
         }
     }
     
     var anchor = document.querySelectorAll('.listing ul li');
     var tabswitch = document.querySelector('.tabswitch');
     var rgba = document.querySelector('.rgba');
     console.log(anchor.length);
     for(var i = 0; i < anchor.length; i++){
         anchor[i].onclick = function(){
             tabswitch.style.transform = "translate(-260px,0)";
             rgba.style.display='block';
             document.body.style.overflow = 'hidden';
         }
     }
     rgba.onclick = function(){
         tabswitch.style.transform = "translate(0,0)";
         rgba.style.display='none';
         document.body.style.overflow = 'auto'
     }
    
}