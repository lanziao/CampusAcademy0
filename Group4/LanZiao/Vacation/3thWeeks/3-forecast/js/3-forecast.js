$(document).ready(function(){ // $(document).ready()可以简写成$(function() {} ) 即去掉(document).ready;
			var $btns = $('#head input'); //id为head下的所有input
			var $divs = $('#content>div'); //id为content下的所有div

			$judge = true;

			$btns.click(function() {

				if ($(this).hasClass('actived')) {
					return false;
				}
				else {
					
					if ($judge) {
						$judge=false;

						var $btn_s = $(this); //选中的input
						var n = $btn_s.index(); //索引值
						$btns.removeClass('actived'); //清空所有input的css类名actived
						$btn_s.addClass('actived'); //选中li添加属性
						$divs.eq(n).siblings().slideUp(600); //当前的div的兄弟元素
						$divs.eq(n).slideDown(600);//选中的input所对应的div显示出来

						setTimeout (function(){
							$judge = true
						},500);
					}

					else {
						return false;
						clearTimeout($timer);
					}

				}
					
			
			})

			var json = new Array();
			$.ajax({
				url: 'http://weixin.jirengu.com/weather',
				type: 'GET',
				dataType: 'json',
				success:function(data,json) {

					//now
					
					$('#nowTemp').text(data.weather[0].now.temperature+'℃');
					$('#nowImg').css("background","url(img/"+data.weather[0].now.code+".png) no-repeat");
					$('#nowText').text(data.weather[0].now.text);
					$('.humidity').text('湿度：'+data.weather[0].now.humidity);
					$('.wind_direction').text('风向：'+data.weather[0].now.wind_direction);
					$('.wind_speed').text('风速：'+data.weather[0].now.wind_speed);
					$('.wind_scale').text('风级：'+data.weather[0].now.wind_scale);
					$('.city').text(data.weather[0].city_name);
					$('.city_logo').css("background","url(img/"+data.weather[0].city_id+".png)")
					$('.aqi').text('空气质量指数：'+data.weather[0].now.air_quality.city.aqi);
					$('.quality').text(data.weather[0].now.air_quality.city.quality);
					$('.pm25').text('pm25：'+data.weather[0].now.air_quality.city.pm25);
					$('.pm10').text('pm10：'+data.weather[0].now.air_quality.city.pm10);
					

					//today
					$('.suggestS').each(function(){
						// $class_name = $(this).parent().attr("class"); //父级li的类名
						// console.log($class_name);
						// $n = data.weather[0].today.suggestion.$class_name.brief;
						// console.log($n);

						// $(this).text($n);

						$i = $(this).parent().index(); //父级li的索引
						
						switch ($i) {
							case 0:
								$(this).text(data.weather[0].today.suggestion.dressing.brief);
								$(this).next().text(data.weather[0].today.suggestion.dressing.details);
								break;
							case 1:
								$(this).text(data.weather[0].today.suggestion.uv.brief);
								$(this).next().text(data.weather[0].today.suggestion.uv.details);
								break;
							case 2:
								$(this).text(data.weather[0].today.suggestion.car_washing.brief);
								$(this).next().text(data.weather[0].today.suggestion.car_washing.details);
								break;
							case 3:
								$(this).text(data.weather[0].today.suggestion.sport.brief);
								$(this).next().text(data.weather[0].today.suggestion.sport.details);
								break;
							default:
								// statements_def
								break;
						}
					});

					
					
					//未来一周

					$list = data.weather[0].future.slice(0,7); //取十天的前7天

					$sort = $list.sort(function(a,b){
							// debugger;
            				return a.high-b.high;
            			}); //最高温从小到大排

					$('.date').each(function(){
						$i = $(this).parent().index(); //父级li的索引
						$(this).text($sort[$i].date);
						$(this).next().text($sort[$i].low+'~'+$sort[$i].high);
						$(this).next().next().text($sort[$i].text);
						$(this).next().next().next().text($sort[$i].wind);
					});
				}
			});
		});