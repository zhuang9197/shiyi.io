
function Blog(Id,Url){
    
    fetch(Url)
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(function(json){
        
        var html_li = "";
        BlogJson = json.List.find(item => item.Id == Id);
        document.getElementById('blog-Title').textContent = BlogJson.Title;
        document.getElementById('blog-pubication').textContent = "发表: "+BlogJson.CreateTime;
        document.getElementById('blog-update').textContent = "更新: "+BlogJson.UpdateTime;
        if(BlogJson.Nav.length >=1)
        {
            for(i=0;i<BlogJson.Nav.length;i++){
                html_li += `<li><a class = "a-noDecoration" href="#${BlogJson.Nav[i]["Id"]}">${BlogJson.Nav[i]["Title"]}</a></li>`;
            }
            document.getElementById('ul_Nav').innerHTML = html_li;
        }
        
        if(Id<=1){
            document.getElementById('Button_Last').style.display = 'none';
        }else{
            var Last = document.getElementById('Button_Last');
            var IID = parseInt(Id) -1
            var UUrl = json.List.find(item => item.Id == IID).Url;
            Last.onclick = function(){
                Blogform(UUrl);
                Blog(IID,json.JsonUrl);
            }
            Last.title = json.List.find(item => item.Id == (Id-1)).Title;
            document.getElementById('Button_Last').style.display = 'block';

        }

        if(Id>=json.List.length){
            document.getElementById('Button_Next').style.display = 'none';
        }else{
            
            var IID = parseInt(Id) +1;
            var UUrl = json.List.find(item => item.Id == IID).Url;
            
            var Next = document.getElementById('Button_Next');
            Next.onclick = function(){
                Blogform(UUrl);
                Blog(IID,json.JsonUrl);
            }
            
            Next.title = json.List.find(item => item.Id == IID).Title;
            document.getElementById('Button_Next').style.display = 'block';
        }

        })
}

function Blogform(url) {
    
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok');
        })
        .then(function (text) {
         
            
            var html = text
                .replace(/#\d/g, function (match) {
                    var id = match.substring(1);
                    return '<h' + id + '>';
                })
                .replace(/#d/g, '<div>')
                .replace(/#p/g, '<p>')
                .replace(/#a-(\d+)/g, '<a id="section$1">')
                .replace(/#r/g, '<pre>')
                .replace(/#c/g, '<code>')
                .replace(/@d/g, '</div>')
                .replace(/@\d/g, function (match) {
                    var id = match.substring(1);
                    return '</h' + id + '>';
                })
                .replace(/@p/g, '</p>')
                .replace(/@a/g, '</a>')
                .replace(/@r/g, '</pre>')
                .replace(/@c/g, '</code>')
                .replace(/\$1/g, '<h1 class="Directory">')
                .replace(/\$d-o/g, '<div class="Output">')
                .replace(/\$c-cs/g, '<code class="language-csharp box-shadow">')
                .replace(/\$c-sql/g, '<code class="language-sql box-shadow">')
                .replace(/%d/g, '<div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">')
                .replace(/#!/g, '<!--')
                .replace(/@!/g, '--!>')
                .replace(/@f/g, '<br \>');

            BlogDom = document.getElementById('BlogTitle');
            BlogDom.innerHTML = html;
            
            // 手动初始化Highlight.js
            hljs.highlightAll();
            // 添加行号
            document.querySelectorAll("code.hljs").forEach(function (block) {
                hljs.lineNumbersBlock(block);
            });

        })
        .catch(function (error) {
            console.log('Error:', error.message);
        });
}

Element.prototype.Blogform = Blogform;

