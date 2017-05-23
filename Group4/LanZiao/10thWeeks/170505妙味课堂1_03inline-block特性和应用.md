# HTMLCSS基础
## inline-block特性和应用

### img标签

可以在一行显示(内嵌的特性)，但支持宽高(块的特性)。

所以img标签既不是内嵌也不是块，它是==inline-block==。

### inline-block特性

1. 块在一行显示；
2. 行内属性标签(内嵌元素)支持宽高；
3. 没有宽度的时候内容撑开宽度。

### 问题

1. 代码换行被解析(同内嵌)，一个空格间隙为**字体大小的一半**，
2. ie6/ie7不支持块属性标签的inline-block。
 
### cursor 指针样式

规定要现实的光标的类型

`cursor：pointer/text/move … …;`

`cursor:url(hand.cur)/*引入的一张图片*/,pointer/*如果图片没引入进来则执行pointer样式*/;`把光标改成指定的图片样式。