// JavaScript Document
"use strict";
window.onload=function () {
	
	var oBtn1 = document.getElementById("input1");
	var oBtn2 = document.getElementById("input2");
	var oBtn3 = document.getElementById("input3");
	var oBtn4 = document.getElementById("input4");
	
	function aLert() {
		alert("a");
	};//弹窗事件函数
	
	var oIn = null;//声明全局变量，清空变量的值
	
	var oTi = null;//声明全局变量，清空变量的值
	
	
	oBtn1.onclick = function () {
		oIn = setInterval(aLert,1500); //变量赋值，间隔定时器
	};
	
	oBtn2.onclick = function () {
		clearInterval(oIn); //关闭定时器
	};
	
	oBtn3.onclick = function () {
		oTi = setTimeout(aLert,1000); //
	};
	
	oBtn4.onclick = function () {
		clearTimeout(oTi);
	};
	
	
	
};