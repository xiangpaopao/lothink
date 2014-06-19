// JavaScript Document
/*written by xpp*/
$(document).ready(function() {
	//初始化
	var nowPage = 0;//当前所在页
	var prevPage = 0;//历史页
	var ifNav = 0;//左导航是否显示
	var H=$(window).height();//浏览器窗口高度
	var fullH=$(document).height();//文档高度
	var leftNav = $('#leftNav');//左导航
	var bg = $('#bg');//绿色的浮动背景
	var offset = 0;//页面滚动量
	var overlay = $('#overlay');//
	var imgWrap = $('#imgWrap');//图片预览区
	var videoWrap = $('#videoWrap');
	var topH=0;
	var scrollT= 0;
	$('.topPage1').css('height',H);
	$('.topPage2').css('height',H);
	leftNav.css('top',H+100);
	leftNav.show();
	bg.css('height',H);
	bg.css('top',H);
	newsPage();
	aboutPage();
	servicePage();
	jobPage();
	//按钮事件
	$('.backBt').click(function(){flipPage(0);});
    $('#enterBt').click(function(){flipPage(1);});
	$('.newsBt').click(function(){flipPage(2);});
	$('.aboutBt').click(function(){flipPage(3);});
	$('.serviceBt').click(function(){flipPage(4);});
	$('.jobsBt').click(function(){flipPage(5);});
	$('.contactBt').click(function(){flipPage(6);});

	$(window).resize(function() {
		//在浏览器窗口缩放时候，自动缩放
		oldH=H;
		oldTop=parseInt($('#wrapper').css('top').split('px')[0]);
		Top= H / oldH * oldTop;
		//console.log(nowPage)
		if (nowPage==0) {
			H=$(window).height();
			if(H<550){H=550;};
			leftNav.css('top',H+100+'px');
			$('.topPage1').css('height',H);
			$('.topPage2').css('height',H);
		}else if(nowPage==1){
			p1H=parseInt($('.topPage1').css('height').split('px')[0]);
			H=$(window).height();
			if(H<550){H=550;};
			//console.log(p1H);
			//console.log(H);
			leftNav.css('top',p1H+H+Top+100+'px');
			$('.topPage2').css('height',H);
		}
		$('#wrapper').css('top',Top+'px');
	});
	$('#mainContent').mousewheel(function(event, delta){
		//鼠标滚轮控制div滚动
		offset = offset + delta*40 
		topH=offset -scrollT;
		if(topH>=-2*H ){
			offset = offset- delta*40;
			topH = -2*H
			$('#wrapper').css('top',topH+'px')
		}else if(topH<-pageHeight(6)){
			topH=-pageHeight(6);
			offset = offset- delta*40;
			$('#wrapper').css('top',topH+'px')
		}else{
			$('#wrapper').css('top',topH+'px')
		}
	});
	function pageHeight(p){
		var pageH=0;
		for(var i=0;i<p;i++){
			pageH = pageH + $('.page').eq(i).height();
		};
		return pageH;
	};
	function flipPage(now){
		//翻页方法
		//mask滚动的时间还有问题
		prevPage=nowPage;
		nowPage=now;
		if(now!=1 && now!=0 ){
			if(ifNav==0){
				leftNav.animate({top:'-='+H+'px'},800);
			};
			ifNav=1;
		}else if(now==0){
			H=$(window).height();
			leftNav.animate({top:'-='+-H+'px'},800);
			ifNav=0;
			$('.topPage1').css('height',H);
			$('.topPage2').css('height',H);
		};
		scrollT = pageHeight(nowPage);
		//console.log(oldOff);
		$('#wrapper').animate({top:-scrollT+'px'},800);	
		offset=0;
	};
//内页调用方法
	function newsPage(){
		//newsPage();
		$('#newsShowBt2').toggle(
			function(){
				$('.news2btBox').animate({top:'+=265px'},400);
				$('.newsPage_2').animate({height:'+=265px'},400);
			},
			function(){
				$('.news2btBox').animate({top:'-=265px'},400);
				$('.newsPage_2').animate({height:'-=265px'},400);
			}
		);
		$('#newsShowBt3').toggle(
			function(){
				$('.news3btBox').animate({top:'+=271px'},400);
				$('.newsPage_3').animate({height:'+=271px'},400);
			},
			function(){
				$('.news3btBox').animate({top:'-=271px'},400);
				$('.newsPage_3').animate({height:'-=271px'},400);
			}
		);
		$('#newsShowBt4').toggle(
			function(){
				$('.news4btBox').animate({top:'+=267px'},400);
				$('.newsPage_4').animate({height:'+=267px'},400);
			},
			function(){
				$('.news4btBox').animate({top:'-=267px'},400);
				$('.newsPage_4').animate({height:'-=267px'},400);
			}
		);
		$('#newsV1Bt').toggle(
			function(){
				$('#newsV1T').animate({top:'+=98px'},400);
				$('.newsPage_5').animate({height:'+=98px'},400);
			},
			function(){
				$('#newsV1T').animate({top:'-=98px'},400);
				$('.newsPage_5').animate({height:'-=98px'},400);
			}
		);
		$('.newsAlertBt').hover(
			function() {
				$(this).children('.btMask').hide();
			},
			function() {
				$(this).children('.btMask').show();
			}
		);
		
		
	};
	function aboutPage() {
		//aboutPage
		var imgW = 720;
		var imgNum = 1;
		var imgBox = $('#aboutPage .imgBody .imgBox');
		var imgLen = imgBox.children('img').length;
		$('#aboutPage .rightBt').click(function(){
			if(imgNum==imgLen){
				imgBox.animate({left:'-='+-imgW*(imgLen-1)+'px'},600);
				imgNum=1;
			}else{
				imgBox.animate({left:'-='+imgW+'px'},600);
				imgNum++;
			};
		});
		$('#aboutPage .leftBt').click(function(){
			if(imgNum==1){
				imgBox.animate({left:'-='+imgW*(imgLen-1)+'px'},600);
				imgNum=imgLen;
			}else{
				imgBox.animate({left:'-='+-imgW+'px'},600);
				imgNum--;
			};
		});
	};
	function servicePage() {
		//servicePage
		var imgBox = $('#serviceBody .imgBody .imgBox');
		var serviceBody = $('#serviceBody');
		var ifShow = 0;//记录下拉图片是否显示
		var oldNum = 0;//记录前一个显示的图片
		//按钮侦听
		$('#sBt1').click(function(){showImg(1);});
		$('#sBt2').click(function(){showImg(2);});
		$('#sBt3').click(function(){showImg(3);});
		var showImg = function(imgNum){
			//显示下拉图片
			if(ifShow==0){
				//下拉图片
				//serviceBody.animate({top:'-=20px'},400);
				serviceBody.animate({height:'+=361px'},400);
				$('#sBt'+imgNum).addClass('sBtOn'+imgNum);
				toggleImg(imgNum);
				ifShow = 1;
			}else{
				//收起图片
				if(oldNum==imgNum){
					//serviceBody.animate({top:'+=20px'},400);
					serviceBody.animate({height:'-=361px'},400);
					$('#sBt'+imgNum).removeClass('sBtOn'+imgNum);
					imgBox.animate({top:'-=361px'},500);
					ifShow = 0;
				}else{
					//收起-切换-下拉
					$('#sBt'+oldNum).removeClass('sBtOn'+oldNum);
					$('#sBt'+imgNum).addClass('sBtOn'+imgNum);
					imgBox.animate({top:'-=361px'},200);
					var t = setTimeout(function(){toggleImg(imgNum)},200)
					ifShow = 1;
				};
			};
			oldNum=imgNum;
		};
		var toggleImg = function(imgNum){
			//切换图片
			$('#sImg1').hide();
			$('#sImg2').hide();
			$('#sImg3').hide();
			$('#sImg'+imgNum).show();
			imgBox.animate({top:'+=361px'},500);	
		};
	};
	function jobPage(){
		//jobPage
		var jobBody = $('#jobBody');
		var imgBox = $('#jobPage .imgBody .imgBox');
		var ifShow = 0;//记录下拉图片是否显示
		var oldNum = 0;//记录前一个显示的图片
		//按钮侦听
		$('#jBt1').click(function(){showImg(1);});
		$('#jBt2').click(function(){showImg(2);});
		$('#jBt3').click(function(){showImg(3);});
		$('#jBt4').click(function(){showImg(4);});
		var showImg = function(imgNum){
			//显示下拉图片
			if(ifShow==0){
				//收起图片
				//jobBody.animate({top:'-=20px'},400);
				jobBody.animate({height:'+=361px'},400);
				$('#jBt'+imgNum).addClass('jBtOn'+imgNum);
				toggleImg(imgNum);
				ifShow = 1;
			}else{
				if(oldNum==imgNum){
					//下拉图片
					//jobBody.animate({top:'+=20px'},400);
					jobBody.animate({height:'-=361px'},400);
					$('#jBt'+imgNum).removeClass('jBtOn'+imgNum);
					imgBox.animate({top:'-=361px'},500);
					ifShow = 0;
				}else{
					//收起-切换-下拉
					$('#jBt'+oldNum).removeClass('jBtOn'+oldNum);
					$('#jBt'+imgNum).addClass('jBtOn'+imgNum);
					imgBox.animate({top:'-=361px'},200);
					var t = setTimeout(function(){toggleImg(imgNum)},200)
					ifShow = 1;
				};
			};
			oldNum=imgNum;
		};
		var toggleImg = function(imgNum){
			//切换图片
			$('#jImg1').hide();
			$('#jImg2').hide();
			$('#jImg3').hide();
			$('#jImg4').hide();
			$('#jImg'+imgNum).show();
			imgBox.animate({top:'+=361px'},500);	
		};
	};
	//图片预览
	$('.viewImg').click(function(){showBigImg($(this).attr('href'))});
	overlay.css('height', $(document).height());
	overlay.click(function(){
		hideBigImg();
		hideVideo();
	});
	$('.newsV1').click(showVideo);
	 function showBigImg(src){
		var image = new Image();
		var T,L;
		image.onload = function(){
			T =  image.height / 2;
			L =  image.width / 2;
			//console.log(T);
			imgWrap.html('<a id="closeBt"></a><img src="'+src+'"/>');
			imgWrap.css({
				'margin-top' : -T ,
				'margin-left' : -L,
				'height' : image.height
			});
			$('#closeBt').click(function(){
				hideBigImg();
			});
		};
		image.src = src;
		overlay.show();
		imgWrap.show();
	};
	function hideBigImg (){
		imgWrap.hide();
		overlay.hide();
	};
	
	function showVideo(){
		overlay.show();
		videoWrap.show();
		$('#closeBt').click(hideVideo);
	};
	function hideVideo(){
		jwplayer("mediaplayer").stop();
		videoWrap.hide();
		overlay.hide();
	};
});