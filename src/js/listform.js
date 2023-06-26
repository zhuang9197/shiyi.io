
    const listDom = document.getElementById('list');
    //const config_res = require('https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Json/Blog/config_res.json')
    


    function listform(url,index){

        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    
                return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function (json) {
                
               
                arr =  json.List[1]['Title'];
                if(index+5 < json.List.length){
                    var num = index+5;
                }else{
                    var num = json.List.length;
                }
                
                for(i=index.listIndex;i<num;i++){
                    var html = `<li class="post-list-item fade in" style="background-image: url(https://cdn.jsdelivr.net/gh/zhuang9197/Resource-Silo/Image/Blog/Database/DatabaseLine.png)">`;
                        html += `<article id = "${json.List[i]["id"]}" class = "article-card article-type-post animation-show" style = "visibility:hidden;">`;
                        html += `<h3 class ="post-title"><a href = "${json.List[i]['url']}">"${json.List[i]['title']}"</a></h3>`;
                        html += `<div class ="post-meta"><time itemprop="dateCreated datePublished" class = "post-time"></tiem></div>`;
                        html += `<div class ="post-content" style = "color:#666"><p>${json.List[i]['url']}</p><div><a href = "${json.List[i]['url']}" class="post-more waves-button alone">阅读全文<span>>></span></a></div></div>`;
                        html += `<div class = "post-footer"><ul class="article-tag-list" itemprop="keywords"><li class="article-tag-list-item"><a class="article-tag-list-link" href="${json.List[i]['url']}" rel = "tag"></a></li><li class="article-tag-list-item"><a class='article-tag-list-link" href="${json.List[i]['url']}"></a></li></ul></div>`
                        html +=`</article>`;
                        html +=`</li>`;
                    
                        listDom.innerHTML += html;
                }
                index.listIndex = num;
                index.listSize = 5;

            })
            .catch(function (error) {
                console.log('Error:', error.message);
            });
    }

    Element.prototype.listform = listform;

   
    

    function GetJson(url){
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('GET', 'path/to/your/file.json', true);
        request.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            // 在这里处理读取到的 JSON 数据
        }
        };
        xhr.send();
    }



