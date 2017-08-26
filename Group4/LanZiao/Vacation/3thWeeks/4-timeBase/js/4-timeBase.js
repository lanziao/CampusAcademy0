
		$(function(){
			

			var $mbtns = $('.head input'); //月份的按钮
			var $mdivs = $('.content div'); 

			$('div[id^=_201]').click(function() {
					$('div[id^=_201]').removeClass('actived').addClass('noActived');
					$(this).removeClass('noActived').addClass('actived');
					var year = $(this).attr('id');
					if ($('#content'+year).is(':hidden')) {

						$('div[id^=content_201]').hide(600);
						$('#content'+year).show(600);

						$('.yearBlank').hide(600);
						$('.yearBlank[to='+year+']').show(600);

						$mbtns.removeClass('show_now');
						$('.showBox').css('display','none');
						$('#content'+year+' .head input:first').addClass('show_now');
						$('#content'+year+' .content div:first').css('display','block');
					}
					else {
						return false;
					}
			});


			$judge = true;
			$timer = null;

			$(window).bind('mousewheel', function(event, delta) {
				debugger;
				$now_N = $('.actived').index()+3;

				if ($judge) {

					$judge=false;

					if (delta==-1) {
						if ($now_N==7){
							$('div[id^=_201]').removeClass('actived').addClass('noActived');
							$('div[no='+3+']').removeClass('noActived').addClass('actived');
							$('div[id^=content_201]').hide(600);
							$('#content_2013').show(600);
							$mbtns.removeClass('show_now');
							$('.showBox').css('display','none');
							$('#content_2013 .head input:first').addClass('show_now');
							$('#content_2013 .content div:first').css('display','block');

							$('.yearBlank').hide(600);
							$('.yearBlank[to=_2013]').show(600);
						}
						else {
							$('div[id^=_201]').removeClass('actived').addClass('noActived');
							$('div[no='+($now_N+1)+']').removeClass('noActived').addClass('actived');
							$('div[id^=content_201]').hide(600);
							$('#content_201'+($now_N+1)).show(600);
							$mbtns.removeClass('show_now');
							$('.showBox').css('display','none');
							$('#content_201'+($now_N+1)+' .head input:first').addClass('show_now');
							$('#content_201'+($now_N+1)+' .content div:first').css('display','block');

							$('.yearBlank').hide(600);
							$('.yearBlank[to=_201'+($now_N+1)+']').show(600);
						}
					}


					else {
						if ($now_N==3) {
							$('div[id^=_201]').removeClass('actived').addClass('noActived');
							$('div[no='+7+']').removeClass('noActived').addClass('actived');
							$('div[id^=content_201]').hide(600);
							$('#content_2017').show(600);
							$('.showBox').css('display','none');
							$('#content_2017 .head input:first').addClass('show_now');
							$('#content_2017 .content div:first').css('display','block');

							$('.yearBlank').hide(600);
							$('.yearBlank[to=_2017]').show(600);
						}
						else {
							$('div[id^=_201]').removeClass('actived').addClass('noActived');
							$('div[no='+($now_N-1)+']').removeClass('noActived').addClass('actived');
							$('div[id^=content_201]').hide(600);
							$('#content_201'+($now_N-1)).show(600);
							$mbtns.removeClass('show_now');
							$('.showBox').css('display','none');
							$('#content_201'+($now_N-1)+' .head input:first').addClass('show_now');
							$('#content_201'+($now_N-1)+' .content div:first').css('display','block');

							$('.yearBlank').hide(600);
							$('.yearBlank[to=_201'+($now_N-1)+']').show(600);
						}
					}
					setTimeout (function(){
						$judge = true
					},650);
				}
				else {
					return false;
					clearTimeout($timer);
				}

			});



			$mbtns.click(function() {
				var month = $(this).attr('for');
				var $mbtn_s = $(this); //选中的input
				//索引值
				$mbtns.removeClass('show_now'); //清空所有input的css类名actived
				$mbtn_s.addClass('show_now'); //
				$('div[id^=201]').css('display','none');//隐藏所有div
				$('#'+month).css('display','block');//选中的input所对应的div显示出来
			})
			
		})
