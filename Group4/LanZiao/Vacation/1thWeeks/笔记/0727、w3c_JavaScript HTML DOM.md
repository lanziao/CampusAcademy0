### DOM简介

##### 查找元素

- 通过 id 找到 HTML 元素`document.getElementById()`
- 通过标签名找到 HTML 元素`document.getElementsByTagName()`
- 通过类名找到 HTML 元素`document.getElementsByClassName()`，++通过类名查找 HTML 元素在 IE 5,6,7,8 中无效。++


    var x=document.getElementById("intro");
    //如果找到该元素，则该方法将以对象（在 x 中）的形式返回该元素。
    //如果未找到该元素，则 x 将包含 null。
    
⭐本例查找 id="main" 的元素，然后查找 =="main" 中的所有 <p> 元素==：

    var x=document.getElementById("main");
    var y=x.getElementsByTagName("p");
    
### 改变 HTML

##### 改变 HTML 内容

语句：

    document.getElementById(id).innerHTML=new HTML
    
    //例如改变<h1>元素的内容：
    
    <!DOCTYPE html>
    <html>
    <body>
    
    <h1 id="header">Old Header</h1>
    
    <script>
    var element=document.getElementById("header");
    element.innerHTML="New Header";
    </script>
    
    </body>
    </html>
    
##### 改变 HTML 属性

语句：

    document.getElementById(id).attribute=new value
    
    //例如改变 <img> 元素的 src 属性：
    
    <!DOCTYPE html>
    <html>
    <body>
    
    <img id="image" src="smiley.gif">
    
    <script>
    document.getElementById("image").src="landscape.jpg";
    //把 "smiley.gif" 改为 "landscape.jpg"
    </script>
    
    </body>
    </html>
    
### 改变 CSS

##### 改变HTML样式

语法：

    document.getElementById(id).style.property=new style
    
    //例如当用户点击按钮时改变了 id="id1" 的 HTML 元素的颜色
    
    <h1 id="id1">My Heading 1</h1>
    <button type="button" 
    onclick="document.getElementById('id1').style.color='red'">
    点击这里！</button>
    
    //使元素显示或者隐藏：
    
    <p id="p1">这是一段文本。</p>

    <input type="button" value="隐藏文本" onclick="document.getElementById('p1').style.visibility='hidden'" />
    <input type="button" value="显示文本" onclick="document.getElementById('p1').style.visibility='visible'" />
    
### HTML DOM 事件

> HTML DOM 使 JavaScript 有能力对 HTML 事件做出反应。

##### 对事件做出反应

- 当用户点击鼠标时
- 当网页已加载时
- 当图像已加载时
- 当鼠标移动到元素上时
- 当输入字段被改变时
- 当提交 HTML 表单时
- 当用户触发按键时

##### onload 和 onunload 事件

> onload 和 onunload 事件会在用户进入或离开页面时被触发。
onload 事件可用于检测访问者的浏览器类型和浏览器版本，并基于这些信息来加载网页的正确版本。
onload 和 onunload 事件可用于处理 cookie。

##### onmouseover 和 onmouseout 事件

> onmouseover 和 onmouseout 事件可用于在用户的鼠标移至 HTML 元素上方或移出元素时触发函数。

##### onmousedown、onmouseup 以及 onclick 事件

> onmousedown, onmouseup 以及 onclick 构成了鼠标点击事件的所有部分。首先当点击鼠标按钮时，会触发 onmousedown 事件，当释放鼠标按钮时，会触发 onmouseup 事件，最后，当完成鼠标点击时，会触发 onclick 事件。

##### onfocus

> 当输入字段获得焦点时，触发onfocus

例如：

    <head>
    <script>
    function myFunction(x)
    {
    x.style.background="yellow";
    }
    </script>
    </head>
    <body>
    
    请输入英文字符：<input type="text" onfocus="myFunction(this)">
    
    <p>当输入字段获得焦点时，会触发改变背景颜色的函数。</p>
    
    </body>
    
### DOM 节点

略。后续补