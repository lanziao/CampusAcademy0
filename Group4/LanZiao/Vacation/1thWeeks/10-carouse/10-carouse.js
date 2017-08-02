// JavaScript Document

    window.onload = function(){
    	
    	// 动画函数 第一个参数，代表谁动  第二个参数 动多少
    	// 让图片做匀速运动，匀速动画的原理是 当前的位置 + 速度  即 offsetLeft + speed
    	
    	function animate(obj,target){
    		// 首先清除掉定时器
    		clearInterval(obj.timer);
    		// 用来判断 是+ 还是 -  即说明向左走还是向右走
    		var speed = obj.offsetLeft < target ? 15 : -15;
    		obj.timer = setInterval(function(){
    			var result = target - obj.offsetLeft;//它们的差值不会超过speed
    			obj.style.left = obj.offsetLeft + speed + "px";			
    	        if (Math.abs(result) <= Math.abs(speed)) {
    	        	clearInterval(obj.timer);
    	        	obj.style.left = target + "px";
    	        }
    		},10);
    	}
    	
    	
    	//获得元素
    	var scroll = document.getElementById("scroll"); // 获得大盒子
    	var ul = document.getElementById("ul"); // 获得ul
    	var ulLis = ul.children;// 获得ul的盒子 以此来生成ol中li的个数
    	var liWidth = ul.children[0].offsetWidth;// 获得每个li的宽度
    	
    	// 操作元素
    	// 因为要做无缝滚动，所以要克隆第一张，放到最后一张后面
    	// 1. 克隆元素
    	ul.appendChild(ul.children[0].cloneNode(true));
    	
    	// 2.创建ol 和li
    	var ol = document.createElement("ol");//创建ol元素
    	scroll.appendChild(ol);// 把ol放到scroll盒子里面去
    	for (var i=0;i<ulLis.length-1;i++) {
    		var li = document.createElement("li");// 创建li元素
    		li.innerHTML = i + 1;// 给li里面添加文字  1 2 3 4 5
    		ol.appendChild(li);// 将li元素添加到ol里面
    	}
    	ol.children[0].className = "current";
    	
    	
    	// 3. 动画开始  (鼠标经过第几个小圆点，就要展示第几张图片，并且小圆点的颜色也发生变化)
    	var olLis = ol.children;
    	for (var i = 0; i < olLis.length;i++) {
    		// 给ol中的每个li添加一个属性 index  用来获得当前第几个li的索引号
    		olLis[i].index = i;
    		olLis[i].onmouseover = function(){
    			for (var j = 0;j<olLis.length;j++) {
    				// 清空所有的 类名
    				olLis[j].className = "";
    			}
    			// 给当前的li添加一个类名
    			this.className = "current";
    			
    			// 接着调用动画函数 ，根据第几个li 展示第几张图片 第一个参数谁做动画  第二个参数 走多少
    			animate(ul,-this.index * liWidth);
    			// 接着让小圆点和 key 等于当前的索引号
    			circle = key = this.index;
			}
    	}
    	
    	// 4. 添加定时器  让图片自动轮播
    	var timer = null; // 轮播图的定时器
    	var key = 0;// 控制播放的张数
    	var circle = 0;// 控制小圆点
    	
    	timer = setInterval(autoplay,3000);// 自动轮播
    	function autoplay(){
    		
    		key++; // 先++
    		if(key > ulLis.length-1){// 后判断
    			
    			ul.style.left = 0; // 迅速调回
    			key = 1; 
    		}
    		// 动画部分
    		animate(ul,-key*liWidth);
    		// 小圆点circle   当显示第几张图片是，对应的小圆点的颜色也发生变化 
    		
    		
    		circle++;
    		if (circle > olLis.length-1) {
    			circle = 0;
    		}
    		// 小圆点颜色发生变化
    		for (var i = 0 ; i < olLis.length;i++) {
    			// 先清除掉所用的小圆点类名
    			olLis[i].className = ""; 
    		}
    		// 给当前的小圆点 添加一个类名
    		olLis[circle].className = "current";
    		
    	}
    	
    	
    	scroll.onmouseover = function(){
    		clearInterval(timer);
    	}
    	
    	scroll.onmouseout = function(){
    		timer = setInterval(autoplay,1000);  	
    	}   	  	
    	
    }