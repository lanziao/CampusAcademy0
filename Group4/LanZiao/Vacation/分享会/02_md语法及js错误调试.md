# md语法及js错误调试

标签分隔： 分享 唐燕 工具

------
[toc]
## 什么是 Markdown

Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字。

### 1. 斜体和粗体

使用 * 和 ** 表示斜体和粗体。

示例：

这是 *斜体*，这是 **粗体**，这是 ***斜粗体***。

### 2. 分级标题

使用 === 表示一级标题，使用 --- 表示二级标题。

示例：

这是一个一级标题
============================

这是一个二级标题
--------------------------------------------------

### 这是一个三级标题

你也可以选择在行首加井号表示不同级别的标题 (H1-H6)，例如：# H1, ## H2, ### H3，#### H4。（**井号后应该有一个空格，否则在部分环境下无法渲染**）

### 3. 外链接

使用 \[描述](链接地址) 为文字增加外链接。（特殊字符的转义，用“\”）

示例：

这是去往 [google](https://www.google.com/) 的链接。

### 4. 列表

#### （1）无序列表

使用 *，+，- 表示无序列表。

示例：

- 无序列表项 一
- 无序列表项 二
- 无序列表项 三

#### （2）有序列表

使用数字和点表示有序列表。number.数字不能省略但可无序，点号之后的空格不能少

示例：

1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三

#### （3）嵌套列表

使用tab缩进表示一个层级

- 嵌套列表项 一
    - 嵌套列表项 二
        - 嵌套列表项 三

### 5. 字符转义
在前面加入“\”反斜杠来帮助插入一些在语法中有其它意义的符号
字符：

    \   反斜线
    `   反引号
    *   星号
    _   底线
    {}  花括号
    []  方括号
    ()  括弧
    #   井号
    +   加号
    -   减号
    .   英文句点
    !   惊叹号

### 6. 文字引用

使用 > 表示文字引用。

示例：

> 野火烧不尽，春风吹又生。

### 7. 行内代码块

使用 \`代码` 表示行内代码块。

示例：

让我们聊聊 `html`。

### 8.  代码块

使用 四个缩进空格 表示代码块。

示例：

    这是一个代码块，此行左侧有四个不可见的空格。

### 9. 加强的代码块

非代码示例：

```
$ sudo apt-get install vim-gnome
```

Python 示例：

```python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''
```

JavaScript 示例：

``` javascript
/**
* nth element in the fibonacci series.
* @param n >= 0
* @return the nth element, >= 0.
*/
function fib(n) {
  var a = 1, b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}

document.write(fib(10));
```

### 10.  插入图像

使用 \!\[描述](图片链接地址) 插入图像。

示例：

![我的头像](https://www.zybuluo.com/static/img/my_head.jpg)

### 11. 内容目录

在段落中填写 `[TOC]` 以显示全文内容的目录结构。（最好全为大写或全为小写）

[TOC]

### 12. 表格支持

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机     | \$1600 |   5     |
| 手机        |   \$12   |   12   |
| 管线        |    \$1    |  234  |

### 13. 定义型列表

名词 1
:   定义 1（左侧有一个可见的冒号和四个不可见的空格）

代码块 2
:   这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）

        代码块（左侧有八个不可见的空格）

### 14. Html 标签

本站支持在 Markdown 语法中嵌套 Html 标签，譬如，你可以用 Html 写一个纵跨两行的表格：

    <table>
        <tr>
            <th rowspan="2">值班人员</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
        </tr>
        <tr>
            <td>李强</td>
            <td>张明</td>
            <td>王平</td>
        </tr>
    </table>


<table>
    <tr>
        <th rowspan="2">值班人员</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
    </tr>
    <tr>
        <td>李强</td>
        <td>张明</td>
        <td>王平</td>
    </tr>
</table>

### 15. 删除线

使用 ~~ 表示删除线。

~~这是一段错误的文本。~~

### 16. 注脚

使用 [^keyword] 表示注脚。

这是一个注脚[^footnote]的样例。

这是第二个注脚[^footnote2]的样例。

### 17. 待办事宜 Todo 列表

使用带有 [ ] 或 [x] （未完成或已完成）项的列表语法撰写一个待办事宜列表，并且支持子列表嵌套以及混用Markdown语法，例如：

    - [ ] **Cmd Markdown 开发**
        - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
        - [ ] 支持以 PDF 格式导出文稿
        - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
        
对应显示如下待办事宜 Todo 列表：
        
- [ ] **Cmd Markdown 开发**
    - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
    - [ ] 支持以 PDF 格式导出文稿
    - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
        
[^footnote]: 这是一个 *注脚* 的 **文本**。

[^footnote2]: 这是另一个 *注脚* 的 **文本**。


### 18. 更详细语法说明

想要查看更详细的语法说明，可以参考[Markdown 语法说明 (简体中文版)][1]

总而言之，不同于其它 *所见即所得* 的编辑器：你只需使用键盘专注于书写文本内容，就可以生成印刷级的排版格式，省却在键盘和工具栏之间来回切换，调整内容和格式的麻烦。**Markdown 在流畅的书写和印刷级的阅读体验之间找到了平衡。** 目前它已经成为世界上最大的技术分享网站 GitHub 和 技术问答网站 StackOverFlow 的御用书写格式。

Markdown还支持很多图表的制作，这里不赘述，如果感兴趣的话，大家可以自行查阅文档学习.

## js常见错误类型

（1）语法错误(SyntaxError)：JavaScript代码解析时发生语法错误

```javascript
var 1a; // 变量名命名错误，不允许数字开头
console.log 'hello');// 缺少括号 
```
 
（2）引用错误(ReferenceError)：引用一个不存在的变量时发生的错误或将值分配给无法分配的对象

ReferenceError是引用一个不存在的变量时发生的错误。
```
unknownVariable // ReferenceError: unknownVariable is not defined
```
另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者this赋值。
```
console.log() = 1 // ReferenceError: Invalid left-hand side in assignment 

this = 1 // ReferenceError: Invalid left-hand side in assignment
```
上面代码对函数console.log的运行结果和this赋值，结果都引发了ReferenceError错误

（3）范围溢出错误(RangeError)：当一个值超出有效范围时发生的错误

主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
```
new Array(-1) // RangeError: Invalid array length 

(1234).toExponential(21) // RangeError: toExponential() argument must be between 0 and 20
```
（4）类型错误(TypeError)：变量或者参数不是预期类型时发生的错误

比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。
```
new 123 //TypeError: number is not a func 

var obj = {}; obj.unknownMethod() // TypeError: undefined is not a function
```
上面代码的第二种情况，调用对象不存在的方法，会抛出TypeError错误。

（5）URI解析错误(URIError)

URIError是URI相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
```
decodeURI('%2') // URIError: URI malformed
```
（6）EvalError

eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再在ES5中出现了，只是为了保证与以前代码兼容，才继续保留。

以上这6种派生错误，连同原始的Error对象，都是构造函数。开发者可以使用它们，人为生成错误对象的实例。

## 常见错误

### 1.偶然地使用了保留字 

一些字不能作为变量名，因为它们已经被JavaScript使用。例如，不能定义一个叫“if”的变量，因为它实际上是JavaScript的一部分。

不幸的是，不同的浏览器有不同的保留字，所以没有办法知道该回避哪些字。最安全的办法是避免使用已经成为JavaScript一部分的字和HTML使用的字。 
如果你因为变量遇到问题，并且不能发现哪儿错了，试着把变量改个名字。如果成功了，你或许就避开了保留字。

### 2.在逻辑判断时只用了一个等号 

一些浏览器能捕获这种错误，有些却不能。这是一种非常常见的错误，但是如果浏览器不能替你指出来，你就很难发现。下面是一个这种错误的例子： 
```
var msg = "what's your name?";
var name = "mumu"
console.log(msg);
console.log(name);
if (name = "xiaomu") 
{ 
    console.log("hello xiaomu!"); 
} else { 
    console.log("hello stranger."); 
}
```
这段代码将一直输出"hello xiaomu!"，不管你给name赋的什么值，这不是我们希望的。原因是在if-else语句中只有一个等号。
这种阴险的错误会使你发疯，所以注意使用两个等号。

### 3.偶然给变量加上了引号，或忘了给字符串加引号
 
JavaScript区分变量和字符串的唯一方法是：字符串有引号，变量没有。下面有一个明显的错误： 
```
var name = 'mumu'; 
console.log("name is very happy");
// console.log(name + " is very happy");
```
虽然name是一个变量，但是控制台会输出“name is very happy,”。这是因为一旦JavaScript看见引号包围着某些东西就不再考虑它，所以当你把name放在引号里，你就阻止了JavaScript从内存中查找它。

### 4.获取节点时错误使用getElementById、getElementsByClassName等
### 5.将style.height等返回的值当成数字直接使用
### 6.js和DOM节点的加载顺序


## 控制台的调试
### 快捷键及常用命令
 - shift + enter换行
 - enter运行
 - Ctrl + shift + c检查元素
 - console.log
 - console.dir以一个可扩展的JavaScript对象形式列出所有提供的对象的所有属性


 参考：[控制台][2]

  [1]: http://wowubuntu.com/markdown/index.html
  [2]: http://wiki.jikexueyuan.com/project/chrome-devtools/tips-and-tricks.html