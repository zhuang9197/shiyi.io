
    const listDom = document.getElementById('list');
    //const config_res = require('https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Json/Blog/config_res.json')
    



    function listform(url,index){
        
        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    
                var json=  response.json();
                return json;
                }
                throw new Error('Network response was not ok.');
            })
            .then(function (json) {


                if(index.listIndex+index.listSize < json.List.length){
                    var num = index.listIndex+index.listSize;
                }else{
                    var num = json.List.length;
                }
            
                for(i=index.listIndex;i<num;i++){
                    var html = `<li class="post-list-item fade in" style="background-image: url(https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Image/Blog/Database/DatabaseLine.png)">`;
                        html += `<article id = "${json.List[i]["id"]}" class = "article-card article-type-post animation-show" style = "visibility:hidden;">`;
                        html += `<h3 class ="post-title"><a href = "../Blog_Title.html?Url=${json.List[i]["Url"]}&Id=${json.List[i]["Id"]}&JsonUrl=${json.JsonUrl}" >"${json.List[i]['Title']}"</a></h3>`;
                        html += `<div class ="post-meta"><time itemprop="dateCreated datePublished" class = "post-time"></tiem></div>`;
                        html += `<div class ="post-content" style = "color:#666"><div><a href = "../Blog_Title.html?Url=${json.List[i]["Url"]}&Id=${json.List[i]["Id"]}&JsonUrl=${json.JsonUrl}" class="post-more waves-button alone">阅读全文<span>>></span></a></div></div>`;
                        html += `<div class = "post-footer"><ul class="article-tag-list" itemprop="keywords"><li class="article-tag-list-item"><a class="article-tag-list-link" href="../Blog_Title.html?Url=${json.List[i]["Url"]}&Id=${json.List[i]["Id"]}&JsonUrl=${json.JsonUrl}"}" rel = "tag"></a></li><li class="article-tag-list-item"><a class='article-tag-list-link" href="../Blog_Title.html?Url=${json.List[i]["Url"]}&Id=${json.List[i]["Id"]}&JsonUrl=${json.JsonUrl}"></a></li></ul></div>`
                        html +=`</article>`;
                        html +=`</li>`;
                    
                        listDom.innerHTML += html;
                }
                index.listIndex = num;
                index.listSize = 2;

            })
            .catch(function (error) {
                console.log('Error:', error.message);
            });
    }

    function TitleHelper(top)
    {

        var titleElements  = document.getElementsByClassName('MainTitleBox');
        
        //title.style.opacity = top/100;



        for (var i = 0; i < titleElements.length; i++) {
            var title = titleElements[i];
            title.style.opacity = top / 100;
          }
        
    }

    Element.prototype.listform = listform;

   
    





