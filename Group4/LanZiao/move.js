	<script>
		//获取当前的不在行间的样式的函数：
		function getStyle(obj, attr) {
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return getComputedStyle(obj, false)[attr];
			}
		}


		function startMove (obj,attr,iTarget) {	//obj是要运动的东西。attr是要运动的属性（宽？高？透明度？）。iTarget是运动的目标值

			clearInterval(obj.timer);

			obj.timer=setInterval(function() {
				var iCur = 0;

				if (attr=='opacity') {
					iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//处理透明度.小数字符串转浮点数转整数。小数直接变成整数处理
				}
				else {
					iCur=parseInt(getStyle(obj,attr));
				}

				var iS = (iTarget-iCur)/6;//缓冲运动的速度
				iS=iS>0?Math.ceil(iS):Math.floor(iS);//取整

				// if (alpha<iTarget) {
				// 	iS = 5;
				// }
				// else if (alpha>iTarget) {
				// 	iS = -5;
				// }
				if (iCur==iTarget) {
					clearInterval(obj.timer);
				}
				else {

					if (attr == 'opacity') {
						obj.style.filter='alpha(opacity:'+(iCur+iS)+')';
						obj.style.opacity=(iCur+iS)/100;
					}
					else {
						// iCur+=iS;
						obj.style[attr]=iCur+iS+'px';
					}
				}

			},30);

		}
	</script>

	