// JavaScript Document

var aqiData = [
	  ["北京", 90],
	  ["上海", 50],
	  ["福州", 10],
	  ["广州", 50],
	  ["成都", 90],
	  ["西安", 100]
	];



window.onload=function () 
{
	var oUl = document.getElementById('aqi-list');
	var i = 0;
	var j = 0;
	
	function descend (x,y)
	{
		return y[1]-x[1];//[1]即按照数组里的第1个值（就是第二位）排序
	};//***降序，升序为x[]-y[]；
	
	aqiData.sort(descend);//***排序
	
	for(;i<aqiData.length;i++)//循环
		{	
			if (aqiData[i][1]>60)//比较数组第1个值与60的大小
				{	j++;//j初始化为0；满足条件一次，+1
					var oLi = document.createElement('li');//声明变量oLi为创建标签li
					oLi.innerHTML = "第"+j+"名:"+aqiData[i];//设置创建的标签li里的内容
					oUl.appendChild(oLi);//***添加节点.
				}
		}

};


	
