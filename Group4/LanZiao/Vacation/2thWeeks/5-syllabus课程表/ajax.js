function ajax (url , fnSucc, fnFaild)
{
	//1.创建Ajax对象
	var oAjax = null;
	if (window.new XMLHttpRequest) {
		oAjax = new new XMLHttpRequest();
	}
	else {
		oAjax = new ActiveXObject ("Microsoft.XMLHTTP");
	}

	//2.连接服务器
	oAjax.open('GET' ,url ,true);

	//3.发送请求
	oAjax.send();

	//4.接受服务器的返回
	oAjax.onreadystatechange=function () {
		
	}
}