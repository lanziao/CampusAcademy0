
        $(function(){
        	var usernameOk=false;
	        var emailOk=false;
	        
	        // 验证用户名
	        $('#username').focus(function(){
	        	console.log('aaaa');
	          $(this).next().text('用户名应该为3-20位之间').removeClass('state1').addClass('state2');
	        }).blur(function(){
	          if($(this).val().length >= 3 && $(this).val().length <=12 && $(this).val()!=''){
	            $(this).next().text('输入成功').removeClass('state1').addClass('state4');
	            ok1=true;
	          }else{
	            $(this).next().text('用户名应该为3-20位之间').removeClass('state1').addClass('state3');
	          }
	            
	        });

	        //验证邮箱
        	$('#email').focus(function(){
	          $(this).next().text('请输入正确的EMAIL格式').removeClass('state1').addClass('state2');
	        }).blur(function(){
	          if($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)==-1){
	            $(this).next().text('请输入正确的EMAIL格式').removeClass('state1').addClass('state3');
	          }else{         
	            $(this).next().text('输入成功').removeClass('state1').addClass('state4');
	            ok2=true;
	          }
            
        	});

        	$('#button').click(function(){
        		console.log('aaa');
	          	if(usernameOk && emailOk){
	            	alert('提交成功！');

	          	}else{
	          		alert('输入的信息有误！请检查');
	            	return false;
	          	}
	        });
     })