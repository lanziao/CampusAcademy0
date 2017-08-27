$(function(){

	function setCookie(name, value, iDay) { //设置cookie
	
		var oDate=new Date();
		
		oDate.setDate(oDate.getDate()+iDay);
		
		document.cookie=name+'='+value+';expires='+oDate;
	}
	function getCookie(name) {//从cookie里取值。cookie只是一串字符串
	
		var arr=document.cookie.split('; ');//用分号 空格切割cookie
		var i=0;
		//arr->['username=abc', 'password=123456', ...]
		for(i=0;i<arr.length;i++)//循环查找我们要的
		{
			//arr2->['username', 'abc']
			var arr2=arr[i].split('=');//把每个名字和值用等号再切一次	
			if(arr2[0]==name)//对比第0个 即名字是否是我们传过来的name
			{
				return arr2[1]; //返回 值
			}
		}	
		return '';//没找到就返回空
	}
	function user_pass (obj){ //用户名和密码框背景改变函数
		if (obj.val()=="") {
			obj.css('background','url(img/'+obj.attr('class')+'.png) no-repeat');
		}
		else {
			obj.css('background','url(img/loginFocus.png) no-repeat');
		}
	}
	function reAjax(objIndex,num){ //num是每页的个数
		//请求数据添加这个页码的元素
		$('.contentLeftBottomLanguage,.contentLeftBottomDesign').html('');//清空
		$.ajax({
	  		type: 'get',
	        url:'http://study.163.com/webDev/couresByCategory.htm',
	        data: "pageNo="+(objIndex+1)+"&psize="+num+"&type=10",
	        success : function(data){
	        	$data=JSON.parse(data);
	        	for (var j=0;j<$data.list.length;j++) {
	        		$classLi = "<li><div class=\"classCover\"><div class=\"classCoverTop\"><img src="+$data.list[j].bigPhotoUrl+" class=\"classCoverPic\"><p class=\"classCoverTitle\"><nobr>"+$data.list[j].name+"</nobr><p><span class=\"classCoverNum\"><img src=\"img/classAttentionNum.png\">"+$data.list[j].learnerCount+"在学</span><span class=\"classCoverAuthor\">发布者："+$data.list[j].provider+"</span><span class=\"classCoverClass\">分类："+$data.list[j].categoryName+"</span></div><p class=\"classCoverIntro\">"+$data.list[j].description+"</p></div><img class=\"classPic\" src="+$data.list[j].bigPhotoUrl+"><p class=\"classTitle\"><nobr>"+$data.list[j].name+"</nobr></p><span class=\"classAuthor\">"+$data.list[j].provider+"</span><span class=\"classAttentionNum\"><img src=\"img/classAttentionNum.png\">"+$data.list[j].learnerCount+"</span><span class=\"classPrice\">￥"+$data.list[j].price+"</span></li>";
	        		$('.contentLeftBottomDesign').append($classLi);
	        	}
	        	//指到课程显示cover
				    $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseover(function(){
				    	$(this).children('.classCover').css('display','block');
				    })
				    //移出消失
				    $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseout(function(){
				    	$(this).children('.classCover').css('display','none');
				    })
	        }
	    });
	    $.ajax({
	  		type: 'get',
	        url:'http://study.163.com/webDev/couresByCategory.htm',
	        data: "pageNo="+(objIndex+1)+"&psize="+num+"&type=20",
	        success : function(data){
	        	$data=JSON.parse(data);
	        	for (var j=0;j<$data.list.length;j++) {
	        		$classLi = "<li><div class=\"classCover\"><div class=\"classCoverTop\"><img src="+$data.list[j].bigPhotoUrl+" class=\"classCoverPic\"><p class=\"classCoverTitle\"><nobr>"+$data.list[j].name+"</nobr><p><span class=\"classCoverNum\"><img src=\"img/classAttentionNum.png\">"+$data.list[j].learnerCount+"在学</span><span class=\"classCoverAuthor\">发布者："+$data.list[j].provider+"</span><span class=\"classCoverClass\">分类："+$data.list[j].categoryName+"</span></div><p class=\"classCoverIntro\">"+$data.list[j].description+"</p></div><img class=\"classPic\" src="+$data.list[j].bigPhotoUrl+"><p class=\"classTitle\"><nobr>"+$data.list[j].name+"</nobr></p><span class=\"classAuthor\">"+$data.list[j].provider+"</span><span class=\"classAttentionNum\"><img src=\"img/classAttentionNum.png\">"+$data.list[j].learnerCount+"</span><span class=\"classPrice\">￥"+$data.list[j].price+"</span></li>";
	        		$('.contentLeftBottomLanguage').append($classLi);
	        	}
	        	//指到课程显示cover
				    $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseover(function(){
				    	$(this).children('.classCover').css('display','block');
				    })
				    //移出消失
				    $('.contentLeftBottomDesign li,.contentLeftBottomLanguage li').mouseout(function(){
				    	$(this).children('.classCover').css('display','none');
				    })
	        }
	    });//课程数据ajax
	}
	$bannerTimer = null;
	function bannerAuto() { //自动轮播函数定义
        $bannerTimer = setInterval(function() {
        	$autoIndex=$('li').siblings('.dotActive').index();
            $autoIndex++;
            if ($autoIndex > 2) {
                $autoIndex = 0;
            }
            $('li').siblings('.dotActive').removeClass("dotActive").addClass("dotNoActive");
            $(".bDot li").eq($autoIndex).addClass("dotActive");
            $(".picActive").removeClass('picActive').fadeOut(500);
            $(".carPic").eq($autoIndex).addClass('picActive').fadeIn(500);
        }, 5000);
    }
	function scroll(){
	 	$(".scroll").animate({"margin-top":"-70px"},//向上移动70px
		 	function(){
			   	$(".scroll li:eq(0)").appendTo($(".scroll"));//把第一个接到后面去
			   	$(".scroll").css({"margin-top":0});
	 	})//最热排行无缝滚动
 	}

	//打开页面获取课程数据、轮播、无缝滚动自动开始
	bannerAuto();
	setInterval(scroll,5000);
	if($(window).width()<1206) {
		$('.switch').css('width','200px');
		$pageLi = "<li>4</li>";
		$('.page').append($pageLi);
		$('.contentLeft').css('width','752px');
		reAjax(0,15);
	}
	else {
		reAjax(0,20);
	}
	// $(window).resize(function() {
	// 	if($(window).width()=1205) {
	// 		$pageLi = "<li>4</li>";
	// 		$('.switch').css('width','200px');
	// 		$('.page').append($pageLi);
	// 		$('.page li').click(function(){
	//     	if ($(this).hasClass('activePage')) {
	//     		return;
	//     	}
	//     	else {
	//     		$('.page li').siblings('.activePage').removeClass("activePage");
	// 			$(this).addClass('activePage');
	//     		$AjaxIndex=$(this).index();
	// 			$('.contentLeft').css('width','752px');
	// 			reAjax(0,15);
	// 			}
	// 		})
	// 	}
	// 	else if(($(window).width()=1206)) {
	// 		$('.switch').css('width','160px');
	// 		$('.page li').eq(3).remove();
	// 		$('.contentLeft').css('width','980px');
	// 		reAjax(0,20);
	// 	}
	// })
	//打开页面 适应屏幕部分
	//登录窗口上左偏移计算 视频窗口偏移计算
	$vLeftDev = ($(window).width() - 950)/2; //视频左偏移
	$vTopDev = ($(window).height() - 676)/2; //视频上偏移
	$lLeftDev = ($(window).width()- 388)/2;//登录左偏移
	$lTopDev = ($(window).height()- 288)/2;//登录上偏移
	$('.loginForm').css('left',$lLeftDev);
	$('.loginForm').css('top',$lTopDev);
    if ($(window).width()>1206) {
    	if ($(window).width()>950) {
			$('.videoWindow').css('left',$vLeftDev);
		}
		else {
			$('.videoWindow').css('left',0+'px');
		}
    	//遮罩层宽度动态变化
    	$('.loginWrap').css('width',$(window).width());
    	//小横条和底部背景包裹宽度自适应
		$('.noticeWrap,.footerWrap').css('width', $(window).width());
    	//根据视窗宽度。轮播图片的左偏移量不同，小圆点位置也不同
		$bDev =  (1652 - $(window).width())/2 //图片偏移量
		$dDev = 577+($(window).width()-1206)/2//小圆点左值	
	  	$('.carPic').css('background-position',-$bDev+'px');
	  	$('.bDot').css('left',$dDev+'px');
    	//轮播
    	$('.bMain').css('width', $(window).width());
    	//工作环境
    	$('.workE').css('width', $(window).width());
    	$workHeight = $(window).width()*221/1616;
    	$('.workE').css('height', $workHeight+'px');
    	//主题包裹背景
    	$('.contentWrap').css('width',$(window).width());
    }
    else {
    	$('.noticeWrap,.footerWrap').css('width', 1206+'px');
    	$('.bMain').css('width', 1206+'px');
    	$('.workE').css('width', 1206+'px');
    	$('.workE').css('height', 1206*221/1616+'px');
    	$('.contentWrap').css('width',1206+'px');
    	$('.loginWrap').css('width',1206+'px');
    }

    //视窗大小改变。
    $(window).resize(function() {
    	//登陆窗偏移
    	$lLeftDev = ($(window).width()- 388)/2;
		$('.loginForm').css('left',$lLeftDev);
    	if ($(window).width()>1206) {
    		//遮罩层宽度动态变化
    		$('.loginWrap').css('width',$(window).width());
    		//顶部提醒条和底部包裹背景
    		$('.noticeWrap,.footerWrap').css('width', $(window).width());
    		//工作环境
    		$('.workE').css('width', $(window).width());
    		$workHeight = $(window).width()*221/1616;
    		$('.workE').css('height', $workHeight+'px');
    		//轮播
    		$('.bMain').css('width', $(window).width());
			$bDev =  (1652 - $(window).width())/2 //偏移量
  			$('.carPic').css('background-position',-$bDev+'px')
  			$dDev = 577+($(window).width()-1206)/2//小圆点左值	
  			$('.bDot').css('left',$dDev+'px');
    	}
    	else {
    		return;
    	}
    })

	//关闭登陆弹窗 
	$('.loginX').click(function(){
		$('.loginForm').css('display','none');
		$('.loginWrap').css('display','none');
	});
	$('.loginBtn').mouseup(function(){
		$('.loginBtn').css('background','url(img/loginBtn.png) no-repeat')
	});
	//用户名和密码框获得焦点
	$('.loginUser,.loginPass').focus(function(){
		$(this).css('background','url(img/loginFocus.png) no-repeat');
	})
	//失去焦点背景变回去
	$('.loginUser,.loginPass').blur(function(){
		user_pass($(this));
	})
	//判断用户名和密码框是否为空来定背景
	user_pass($('.loginPass'));
	user_pass($('.loginUser'));

	//顶部条点击不再提醒过后消失且以后不再显示

	$('.noNotice').click(function(){ //点击过后隐藏并设置一个名叫noNotice的cookie，值为true，保质期30天
		setCookie('noNotice',true,30);
		$('.noticeWrap,.notice').css('display','none');
	})


	$orNotice=getCookie('noNotice'); //取noNotice的值赋值给变量 orNotice(是否)
	if ($orNotice) {
		$('.noticeWrap,.notice').css('display','none');//值为true则不显示提醒栏
	};

	//点击关注按钮
	// $orLogin=getCookie('')
	$('.follow').click(function(){
		$orLogin = getCookie('loginSuc')
		if ($orLogin) { //如果登录过则关注并改变关注按钮的样式
			setCookie('followSuc',true,9999);
			$('.follow').css('display','none');
			$('.followTrue').css('display','block');
		}
		else { //如果没有就弹出登陆框。
			$('.loginWrap,.loginForm').css('display','block');
		}
	});
	//点击取消登陆按钮
	$('.followTrue').click(function(){
		setCookie('followSuc',null,-1);
		$('.follow').css('display','block');
		$('.followTrue').css('display','none');
	})

	//登陆按钮点击效果
	$('.loginBtn').mousedown(function(){
		$('.loginBtn').css('background','url(img/loginBtnDown.png) no-repeat')
		$user = md5($('.loginUser').val());
		$pass = md5($('.loginPass').val());
		$.ajax({
			type: 'get',
            url:'http://study.163.com/webDev/login.htm?userName='+$user+'&password='+$pass,
            success : function(data) {
            	if (data==1) { //如果用户名和帐号正确。即data为1，则关注
            		$.ajax({
            			type: 'get',
            			url:'http://study.163.com/webDev/attention.htm',
            			success : function(data) {
            				setCookie('loginSuc',true,30);
            				setCookie('followSuc',true,9999);
            				$('.loginWrap').css('display','none');//登陆成功登陆窗口消失
            				$('.loginForm').css('display','none');
            				$('.follow').css('display','none');//follow样式改变
							$('.followTrue').css('display','block');
            			}
            		})
            	}
            	else {
            		alert('用户名或密码错误！请重新输入');
            	}
            }
		});
	});
	//判断登陆和关注cookie 
	$orFollow = getCookie('followSuc');
	if ($orFollow) {
		$('.follow').css('display','none');
		$('.followTrue').css('display','block');
	}

	//轮播部分

    //小圆点点击
    $(".bDot li").click(function(){
    	$('li').siblings('.dotActive').removeClass("dotActive").addClass("dotNoActive");
    	$(this).addClass("dotActive");
    	$dotNow = $(this).index();
    	$(".picActive").removeClass('picActive').fadeOut(500);
    	$(".carPic").eq($dotNow).addClass('picActive').fadeIn(500);
    	clearInterval($bannerTimer);
    	bannerAuto();
    })
    //鼠标移入停止
    $(".carPic").mouseover(function(){
    	clearInterval($bannerTimer);
    })
    //鼠标移出重新开始
    $(".carPic").mouseout(function(){
    	bannerAuto();
    })

    //主体部分
  	//tab点击切换
  	$('.design').click(function(){
  		if ($('.contentLeftBottomDesign').css('display')=='none') {
  			$('.design').css('background','url(img/design_1.png) no-repeat');
  			$('.language').css('background','url(img/language_2.png) no-repeat');
  			$('.contentLeftBottomDesign').css('display','block');
  			$('.contentLeftBottomLanguage').css('display','none');

  			//页码回到第一页
  			$('.page li').siblings('.activePage').removeClass("activePage");
  			$('.page li').eq(0).addClass("activePage");
  			if($(window).width()<1206) {
				$('.switch').css('width','200px');
				
				$('.contentLeft').css('width','752px');
				reAjax(0,15);
			}
			else {
				reAjax(0,20);//重新请求并添加这一页的数据
			}
  		}
  		else {
  			return;
  		}
  	})

  	$('.language').click(function(){
  		if ($('.contentLeftBottomLanguage').css('display')=='none') {
  			$('.design').css('background','url(img/design_2.png) no-repeat');
  			$('.language').css('background','url(img/language_1.png) no-repeat');
  			$('.contentLeftBottomDesign').css('display','none');
  			$('.contentLeftBottomLanguage').css('display','block');
  			//页码回到第一页
  			$('.page li').siblings('.activePage').removeClass("activePage");
  			$('.page li').eq(0).addClass("activePage");
  			if($(window).width()<1206) {
				$('.switch').css('width','200px');
				
				$('.contentLeft').css('width','752px');
				reAjax(0,15);
			}
			else {
				reAjax(0,20);//重新请求并添加这一页的数据
			}
  		}
  		else {
  			return;
  		}
  	})

  	//打开视频窗口和遮罩。
  	$('.videoOpen').click(function(){
  		$('.loginWrap').css('display','block');
  		$('.videoWindow').css('display','block');
  	})
  	//关闭视频窗口和遮罩。
  	$('.videoWindow img').click(function(){
  		$('.loginWrap').css('display','none');
  		$('.videoWindow').css('display','none');
  	})

  	//最热排行获取数据
  	$.ajax({
  		type: 'get',
        url:'http://study.163.com/webDev/hotcouresByCategory.htm',
        success : function(data){
        	$data=JSON.parse(data);
        	for (var i = 0; i < $data.length; i++) {
        		var $hotLi = $("<li class=\"scrollLi\"><img src="+$data[i].smallPhotoUrl+" class=\"hotPic\"><div class=\"scrollRight\"><p class=\"hotTitle\"><nobr>"+$data[i].name+"</nobr></p><span class=\"hotNum\"><img src=\"img/classAttentionNum.png\">"+$data[i].learnerCount+"</span></div></li>");
        		$('.scroll').append($hotLi);
        	}
        }
  	})
	//课程部分

    //页码点击
    $('.page li').click(function(){
    	if ($(this).hasClass('activePage')) {
    		return;
    	}
    	else {
    		$('.page li').siblings('.activePage').removeClass("activePage");
			$(this).addClass('activePage');
    		$AjaxIndex=$(this).index();
    		if($(window).width()<1206) {
				$('.switch').css('width','200px');
				
				$('.contentLeft').css('width','752px');
				reAjax($AjaxIndex,15);
			}
			else {
				reAjax($AjaxIndex,20);//重新请求并添加这一页的数据
			}
    		
    	}
    })

    //pre按钮点击
    $('.pre').click(function(){
    	if ($('.activePage').index()==0) {
    		return;
    	}
    	else {
    		$pageIndex = $('.page li').siblings('.activePage').index();
    		$('.page li').siblings('.activePage').removeClass("activePage");
    		$('.page li').eq($pageIndex-1).addClass('activePage');
    		$AjaxIndex = $pageIndex-1;
    		if($(window).width()<1206) {
  				
				$('.switch').css('width','200px');
				
				$('.contentLeft').css('width','752px');
				reAjax($AjaxIndex,15);
			}
			else {
				reAjax($AjaxIndex,20);//重新请求并添加这一页的数据
			}
    	}
    })
    //next按钮
    $('.next').click(function(){
    	if ($('.activePage').index()==($('.page li').length-1)) {
    		return;
    	}
    	else {
    		$pageIndex = $('.page li').siblings('.activePage').index();
    		$('.page li').siblings('.activePage').removeClass("activePage");
    		$('.page li').eq($pageIndex+1).addClass('activePage');
    		$AjaxIndex = $pageIndex+1;
    		if($(window).width()<1206) {
  				
				$('.switch').css('width','200px');
				
				$('.contentLeft').css('width','752px');
				reAjax($AjaxIndex,15);
			}
			else {
				reAjax($AjaxIndex,20);//重新请求并添加这一页的数据
			}
    	}
    })

});