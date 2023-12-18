
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
         
            var txt = replaceNewlines(text);
            var html = txt
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




function replaceNewlines(text) {

    var txt = removeNewlines1(text);


    var pattern = /(%d[\s\S]*?@d)|\n/g;

    // 使用 replace 方法替换匹配的部分
    var result = text.replace(pattern, function(match, group) {
        // 如果是 %d 到 @d 之间的部分，则不进行替换
        if (group) {
            return group;
        } else {
            // 替换其他换行符为 <br>
            return '<br>';
        }
    });
    
    var result1 = result.replace(/<br>(?:<br>)+/g, "<br>");

    return removeNewlines(result1);
  }



  function removeNewlines(text) {
    var searchString = /\$c-(cs|sql)\n/g;
    var replacementString = "$c-$1";
  
    var result = text.replace(searchString, replacementString);
  
    return result;
  }


function removeNewlines1(text) {
    var replacements = [
      { search: /#d\n/g, replace: "#d" },
      { search: /@d\n/g, replace: "@d" },
      { search: /#a-\d+\n/g, replace: function(match) {
        // 从匹配的字符串中提取数字
        var number = match.match(/\d+/)[0];
        return "#a-" + number;
      }},
      { search: /@a\n/g, replace: "@a" },
      { search: /#2\n/g, replace: "#2" },
      { search: /@2\n/g, replace: "@2" },
      { search: /#p\n/g, replace: "#p" },
      { search: /@p\n/g, replace: "@p" }
      // 继续添加其他规则...
    ];
  
    replacements.forEach(function(replacement) {
      if (typeof replacement.replace === 'function') {
        text = text.replace(replacement.search, function(match) {
          return replacement.replace(match);
        });
      } else {
        text = text.replace(replacement.search, replacement.replace);
      }
    });
  
    return text;
  }