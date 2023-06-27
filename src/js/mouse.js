function RunChange(){
    document.getElementById('home').onclick = function(event){
        var backgournd = document.getElementById('home');
        var image = new Image();
        var sectionWidth = backgournd.offsetWidth;
        var sectionHeight = backgournd.offsetHeight;
        var aspectRatio = sectionWidth / sectionHeight;
        if(event.ctrlKey){
            var url = 'https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Image/Blog/Background/Background_'+Math.floor(Math.random()*12) +'.gif';

            image.src = url;
            image.onload = function(){
                backgournd.style.background = 'url('+url+')';
                backgournd.style.backgroundSize = 'cover';
                backgournd.style.backgroundPosition = 'center';
                //backgournd.style.backgroundSize = "width=100%;height=100%"
                //backgournd.style.backgroundSize = aspectRatio >= 1 ? "auto 100%" : "100% auto";

            }
            //backgournd.style.background = 'url(https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Image/Blog/Background/Background_'+Math.floor(Math.random()*12) +'.gif)';
            //backgournd.style.backgroundSize = 'cover'
        }else{
            var url = 'https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Image/Blog/Background/Background_'+Math.floor(Math.random()*21) +'.jpg';
            
            image.src = url;
            image.onload = function(){
                backgournd.style.background = 'url('+url+') ';
                backgournd.style.backgroundSize = 'cover';
                backgournd.style.backgroundPosition = 'center';
                //backgournd.style.backgroundSize = "width:100%;height:100%";
                //backgournd.style.backgroundSize = aspectRatio >= 1 ? "auto 100%" : "100% auto";
            }
            //backgournd.style.background = 'url(https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Image/Blog/Background/Background_'+Math.floor(Math.random()*21) +'.jpg)';
            //backgournd.style.backgroundSize = 'cover'
        }
    }
       
}

var element = document.getElementById("return");

element.addEventListener("mouseover", function() {
    element.classList.remove("hidden");
  });
  
  element.addEventListener("mouseout", function() {
    element.classList.add("hidden");
  });