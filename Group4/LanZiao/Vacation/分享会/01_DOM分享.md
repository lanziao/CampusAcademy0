# DOM

标签（空格分隔）： 分享 js

---
[toc]

##**什么是DOM**

> MDN: *文档对象模型 (Document Object Model)* 是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将web页面和脚本或程序语言连接起来。

* 也就是说，DOM 就是针对 HTML 和 XML提供的一个API，就是浏览器为javascript提供的一系列可以操纵的接口


##**DOM树**

![dom树][1]

* 在页面加载时HTML所有文本（包括注释等）会被浏览器解析为DOM树, DOM树由若干个DOM节点组成，这些节点均可通过 JavaScript 进行访问。所有 HTML 元素（节点）均可被修改，也可以创建或删除节点。

* 节点关系
![节点关系.jpg-24.3kB][2]


##**节点类型**
* 共有12种节点类型

* 节点基类型 Node类型
    - DOM1级定义了一个Node接口，该接口将由DOM中的所有节点类型实现。这个Node接口在JavaScript中是作为Node类型实现的。除了IE之外，其他所有浏览器都可以访问这个类型。JavaScript中的所有节点都继承自Node类型，因此所有节点类型都共享者相同的基本属性和方法。
    - 常用方法
        1. appendChild()
        2. insertBefore()
        3. replaceChild()
        ...
    
```
console.log(Node.prototype)

// 以div节点为例
var alldivs = document.getElementsByTagName('div')[0];
console.log(alldivs.__proto__);
// alldivs --> HTMLDivElement.prototype --> HTMLlement.prototype --> Element.prototype --> Node.protote -->...
```

* 常见的节点类型有三种 （nodeType）
1. 元素节点 nodeType === 1  Element类型

2. 属性节点 nodeType === 2

3. 文本节点 nodeType === 3  Text类型
> var na = document.getElementsByTagName('p')[0].firstChild;
  console.log(na.__proto__);

##**操作DOM**
[MDN: DOM API][3]

1. 元素节点
    node.getElementsBytagName('tagname')-;类对象数组-对象字面量
    node.getElementById('id')-对象-node
    node.getElementsByClassName('classname')-类对象数组
    createElement('element')

2. 属性节点
    node.getAttribute('attribute')
    node.setAttribute('attribute')

3. 文本节点
    creatTextNode('text')
    appendData();    // 在text末尾加内容
    deleteData(offset, count);    // 从offset指定的位置开始删除count个字符
```
// 浏览器认为第一个子节点是文本节点
<ul>
     <li></li>
     <li></li>
</ul>
// 遍历节点时添加nodeType===1，确认节点是元素节点
```
    
4. 常用属性
|属性/方法 |	类型/返回类型 |	说明 |           
|-|-|   
|nodeName |	String |	节点的名称，根据节点的类型而返回 |
|nodeValue|	String|	节点的值，根据节点的类型而返回。一般多返回数组，document.getElementById("tr1").childNodes[0].nodeValue;|
|**firstChild/lastChild**	|Node|	指向childNodes列表中的第一个/最后一个 节点（node）
|**childNodes**	|NodeList|	所有子节点的列表，方法item(i)可以访问第i+1个节点
|parentNode	|Node|	指向节点的父节点，如果是根节点，返回为null
|previousSibling	|Node|	指向前一个兄弟节点，如果该节点是第一个节点，返回null
|nextSibling	|Node	|指向后一个兄弟节点，如果该节点是最后一个节点，返回为null
|hasChildNodes|	Boolean|	是否包含子节点
|attributes	|NameNodeMap	|包含一个元素特性的attr对象，仅用于元素节点
|**appendChild**	|Node|	将node节点添加到childNodes节点末尾
|**removeChild**	|Node|	删除节点
|replaceChild(newNode,oldNode)	|Node|	替换节点
|insertBefore(newNode,refnode)	|Node|	在childNodes中的refnode节点前插入newNode
5. 有三种方法可以判断当前节点是否有子节点。
    node.firstChild !== null
    node.childNodes.length > 0
    node.hasChildNodes()


##**类数组(集合)**

* 每一个节点都有一个childNodes属性，其中保存着一个NodeList对象。NodeList是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。虽然可以通过方括号语法来访问NodeList的值，而且这个对象也有length属性，但它其实不是Array。NodeList对象的独特之处在于，它实际上是基于DOM结构动态执行查询的结构，因此DOM结构的变化能够自动反映在NodeList对象中。
```
var openO = document.getElementsByClassName('open');
console.log(Array.isArray(openO));  // false
```
> * 为什么 NodeList 不是数组？
    - NodeList 对象在某些方面和数组非常相似，看上去可以直接使用从 Array.prototype 上继承的方法。然而，NodeList 没有这些类似数组的方法。
    - JavaScript 的继承机制是基于原型的。数组元素之所以有一些数组方法（比如map），是因为它的原型链上有这些方法，如下:
    - myArray --> Array.prototype --> Object.prototype --> null (想要获取一个对象的原型链，可以连续的调用 Object.getPrototypeOf，直到原型链尽头).
    - map这些方式其实是 Array.prototype 这个对象的方法。
    - 和数组不一样，NodeList的原型链是这样的：
    - myNodeList --> NodeList.prototype --> Object.prototype --> null
    - NodeList.prototype 只有一个 item 方法，没有 Array.prototype 上的那些方法，所以 NodeList 对象用不了它们。
    
```
console.log(NodeList.prototype);
console.log(Array.prototype);
```

**解决办法**

- 把 Array.prototype 上的方法添加到 NodeList.prototype 上

```
var arrayMethods = Object.getOwnPropertyNames( Array.prototype );

arrayMethods.map( attachArrayMethodsToNodeList );

function attachArrayMethodsToNodeList(methodName)
{
  if(methodName !== "length") {
    NodeList.prototype[methodName] = Array.prototype[methodName];
  }
};
 
var divs = document.getElementsByTagName( 'div' );
var firstDiv = divs[ 0 ];

firstDiv.childNodes.map(function( divChild ){
  divChild.parentNode.style.color = '#0F0';
});
```
[第一种](http://jsbin.com/piququmada/2/edit?html,js,console)

- 把需要用的数组方法从其原型链中提取出来,保存在变量里
```
var map = Array.prototype.map;

var divs = document.getElementsByTagName( 'div' );
var firstDiv = divs[ 0 ];

map.call(firstDiv.childNodes, function( divChild ){
  divChild.parentNode.style.color = '#0F0';
});
```
[第二种](http://jsbin.com/piququmada/4/edit?html,js,console)
##DOM事件
### 监听事件

浏览器会根据某些操作触发对应事件，如果我们需要针对某种事件进行处理，则需要监听这个事件。监听事件的方法主要有以下几种：

#### HTML 内联属性（避免使用）--HTML事件处理

HTML 元素里面直接填写事件有关属性，属性值为 JavaScript 代码，即可在触发该事件的时候，执行属性值的内容。

例如：

```button onclick="alert('你点击了这个按钮');">点击这个按钮</button>```

onclick 属性表示触发 click，属性值的内容（JavaScript 代码）会在单击该 HTML 节点时执行。

显而易见，使用这种方法，JavaScript 代码与 HTML 代码耦合在了一起，不便于维护和开发。所以除非在必须使用的情况（例如统计链接点击数据）下，尽量避免使用这种方法。

#### DOM 属性绑定--DOM0级事件处理程序

也可以直接设置 DOM 属性来指定某个事件对应的处理函数，这个方法比较简单：

	element.onclick = function(event){
	    alert('你点击了这个按钮');
	};
上面代码就是监听 element 节点的 click 事件。它比较简单易懂，而且有较好的兼容性。但是也有缺陷，因为直接赋值给对应属性，如果你在后面代码中再次为 element 绑定一个*回调函数*，会覆盖掉之前回调函数的内容。
`回调函数：是一个作为变量传递给另外一个函数的函数，它在主体函数执行完之后执行。`
[demo:DOM0级事件处理程序](http://jsbin.com/nasawomife/edit?html,js,console,output)
虽然也可以用一些方法实现多个绑定，但还是推荐下面的标准事件监听函数。

#### 使用事件监听函数--DOM2级事件处理程序

标准的事件监听函数如下：

	element.addEventListener(<event-name>, <callback>, <use-capture>);
	
表示在 element 这个对象上面添加一个事件监听器，当监听到有 <event-name> 事件发生的时候，调用 <callback> 这个回调函数。至于 <use-capture> 这个参数，表示该事件监听是在“捕获”阶段中监听（设置为 true）还是在“冒泡”阶段中监听（设置为 false）。关于捕获和冒泡，我们会在下面讲解。

用标准事件监听函数改写上面的例子：

	<button id="btn">点击这个按钮</button>
	<script type="text/javascript">
		var btn = document.getElementById('btn');

		btn.addEventListener('click', function(){
		    alert('你点击了这个按钮');
		}, false);
	</script>

[Demo](http://jsbin.com/puqakawate/edit?html,js,console,output)：DOM2.html

#### 移除事件监听

当我们为某个元素绑定了一个事件，每次触发这个事件的时候，都会执行事件绑定的回调函数。如果我们想解除绑定，需要使用 removeEventListener 方法：

	element.removeEventListener(<event-name>, <callback>, <use-capture>);
需要注意的是，绑定事件时的回调函数不能是匿名函数，必须是一个声明的函数，因为解除事件绑定时需要传递这个回调函数的引用，才可以断开绑定。例如：

	var fun = function() {
	    // function logic
	};
	
	element.addEventListener('click', fun, false);
	element.removeEventListener('click', fun, false);
[Demo](http://jsbin.com/tivutunasu/edit?html,js,console,output)：DOM2.html

#### 事件触发过程

在上面大体了解了事件是什么、如何监听并执行某些操作，但我们对事件触发整个过程还不够了解。

下图就是事件的触发过程，借用了 W3C 的图片
![事件触发过程](http://i.imgur.com/Gx2frEm.jpg)
![Alt text](./事件触发过程.jpg)


##### 捕获阶段（Capture Phase）

当某个事件触发后，浏览器会从window发出一个事件，一直沿着dom树到目标节点，而在此过程中会触发一路上路过的所有为true，也就是捕获并且满足触发条件的事件

##### 目标阶段（Target Phase）

事件后在目标节点上触发这个事件，就是目标阶段。

需要注意的时，事件触发的目标总是最底层的节点。比如你点击一段文字，你以为你的事件目标节点在 div 上，但实际上触发在 p、span 等子节点上。例如：
[demo](http://jsbin.com/hotokozuqa/edit?html,js,console,output)

##### 冒泡阶段（Bubbling Phase）

当事件达到目标节点之后，就会沿着原路返回，由于这个过程类似水泡从底部浮到顶部，所以称作冒泡阶段。

在实际使用中，你并不需要把事件监听函数准确绑定到最底层的节点也可以正常工作。比如在上例，你想为这个 div 绑定单击时的回调函数，你无须为这个 div 下面的所有子节点全部绑定单击事件，只需要为 div 这一个节点绑定即可。因为发生它子节点的单击事件，都会冒泡上去，发生在 div 上面。

针对这三个阶段，wilsonpage 做了一个非常棒的 [Demo](http://jsbin.com/nemipugapu/edit?css,js,output "事件触发过程demo")，可以看下。


##### 使用事件委托（Event Delegate）提升性能

因为事件有冒泡机制，所有子节点的事件都会顺着父级节点跑回去，所以我们可以通过监听父级节点来实现监听子节点的功能，这就是事件代理。

使用事件代理主要有两个优势：

1. 减少事件绑定，提升性能。之前你需要绑定一堆子节点，而现在你只需要绑定一个父节点即可。减少了绑定事件监听函数的数量。
2. 动态变化的 DOM 结构，仍然可以监听。当一个 DOM 动态创建之后，不会带有任何事件监听，除非你重新执行事件监听函数，而使用事件监听无须担忧这个问题。

看一个例子：[事件委托](http://jsbin.com/ziketojabo/edit?html,js,console,output)

在处理事件代理的时候，事件 event 有两个比较特殊的属性，event.target 和 event.currentTarget，这两个属性又有什么区别呢？

event.target 是触发事件的元素，而 event.currentTarget 是事件绑定的元素。也就是说，大部分情况下，当使用事件代理时，event.target 是子元素，而 event.currentTarget 是父级元素。
[event.target 和 event.currentTarget的区别](http://jsbin.com/zavohawitu/edit?html,js,console,output)
当点击任何一个 li 的时候，首先会弹出目标元素，也就是子元素的 id，然后才会弹出事件绑定元素的 id，也就是父级元素的 id。

##### 停止事件冒泡（stopPropagation）

所有的事情都会有对立面，事件的冒泡阶段虽然看起来很好，也会有不适合的场所。比较复杂的应用，由于事件监听比较复杂，可能会希望只监听发生在具体节点的事件。这个时候就需要停止事件冒泡。

停止事件冒泡需要使用事件对象的 stopPropagation 方法，具体代码如下：

	element.addEventListener('click', function(event) {
	    event.stopPropagation();
	}, false);
在事件监听的回调函数里，会传递一个参数，这就是 Event 对象，在这个对象上调用 stopPropagation 方法即可停止事件冒泡。举个停止事件冒泡的应用实例：

[停止事件冒泡](http://jsbin.com/nemipugapu/edit?css,js,output)


更多关于 Event 对象的事情，我们会在下面介绍。

#### 事件的 Event 对象

当一个事件被触发的时候，会创建一个事件对象（Event Object），这个对象里面包含了一些有用的属性或者方法。事件对象会作为第一个参数，传递给我们的回掉函数。我们可以使用下面代码，在浏览器中打印出这个事件对象：

	<button>打印 Event Object</button>
	
	<script>
	    var btn = document.getElementsByTagName('button');
	    btn[0].addEventListener('click', function(event) {
	        console.log(event);
	    }, false);
	</script>
[click here](http://jsbin.com/kucilotubi/edit?html,js,console,output)就可以看到一堆属性列表：

事件对象包括很多有用的信息，比如事件触发时，鼠标在屏幕上的坐标、被触发的 DOM 详细信息、以及上图最下面继承过来的停止冒泡方法（stopPropagation）。下面介绍一下比较常用的几个属性和方法：

- `type(string)` 事件的名称，比如 “click”。
- `target(node)` 事件要触发的目标节点。
- `bubbles (boolean)` 表明该事件是否是在冒泡阶段触发的。
- `preventDefault (function)` 这个方法可以禁止一切默认的行为，例如点击 a 标签时，会打开一个新页面，如果为 a 标签监听事件 click 同时调用该方法，则不会打开新页面。
- `stopPropagation (function)` 停止冒泡，上面有提到，不再赘述。
- `stopImmediatePropagation (function)` 与 stopPropagation 类似，就是阻止触发其他监听函数。但是与 stopPropagation 不同的是，它更加 “强力”，阻止除了目标之外的事件触发，甚至阻止针对同一个目标节点的相同事件，
- `cancelable (boolean)` 这个属性表明该事件是否可以通过调用 event.preventDefault 方法来禁用默认行为。
- `eventPhase (number)` 这个属性的数字表示当前事件触发在什么阶段。none：0；捕获：1；目标：2；冒泡：3。
- `pageX 和 pageY (number)` 这两个属性表示触发事件时，鼠标相对于页面的坐标。
- `isTrusted (boolean)` 表明该事件是浏览器触发（用户真实操作触发），还是 JavaScript 代码触发的。


#**Sublime**


  [1]: http://www.w3school.com.cn/i/ct_htmltree.gif
  [2]: http://otn43irfn.bkt.clouddn.com/share/image/%E8%8A%82%E7%82%B9%E5%85%B3%E7%B3%BB.jpg
  [3]: https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model
  [4]: http://jsbin.com/piququmada/edit?html,js,console