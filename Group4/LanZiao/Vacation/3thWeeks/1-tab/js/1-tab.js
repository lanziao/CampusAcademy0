$(document).ready(function(){ // $(document).ready()可以简写成$(function() {} ) 即去掉(document).ready;
			var $btns = $('#head input'); //id为head下的所有input
			var $divs = $('#content div'); //id为content下的所有div
			$btns.click(function() {
				var $btn_s = $(this); //选中的input
				var n = $btn_s.index(); //索引值
				$btns.removeClass('actived'); //清空所有input的css类名actived
				$btn_s.addClass('actived'); //选中li添加属性
				$divs.css('display','none');//隐藏所有div
				$divs.eq(n).css('display','block');//选中的input所对应的div显示出来
			})
		});