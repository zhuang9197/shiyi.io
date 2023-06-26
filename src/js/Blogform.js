const BlogDom = document.getElementById('page');
const HtmlStyle = {"Text":"<P>","TextEnd":"</P>","":""}


function Blogform(url)
{
    fetch(url)
    .then(function (response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(function(json){
        var html
        for(i=0;i<json.Blog.length;i++){
            html+=HtmlStyle[json.Blog[i]["head"]];
            html += json.Blog[i]["body"];
            html += HtmlStyle[json.Blog[i]["foot"]];
        }
        BlogDom.innerHTML += html;
    })
    .catch(function (error){
        console.log('Error:',error.message);
    });
}

Element.prototype.Blogform = Blogform;

