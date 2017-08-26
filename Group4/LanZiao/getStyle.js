	<script>
		function getStyle(obj,attr)//参数1：获取谁的。参数2：获取它的什么样式。
	    {
	        if(obj.currentStyle)//判断obj是否支持currentStyle
	        {
	            return obj.currentStyle[attr];
	        }
	        else
	        {
	            return getComputedStyle(obj,false)[attr];
	        }
	    }
	</script>

	