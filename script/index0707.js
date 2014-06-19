// JavaScript Document
/*written by xpp*/
$(document).ready(function() {
	//初始化
	var nowPage = 0;//当前所在页
	var prevPage = 0;//历史页
	var ifNav = 0;//左导航是否显示
	var H=$(window).height();//浏览器窗口高度
	var page = $('.page');//每个页面的顶级容器
	var leftNav = $('#leftNav');//左导航
	var bg = $('#bg');//绿色的浮动背景
	var mask = $('#mask');//顶部用于遮挡的条
	page.css('height',H);
	leftNav.css('top',H+100);
	leftNav.show();
	bg.css('height',H);
	bg.css('top',H);
	mask.css('top',H);
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
		H=$(window).height();
		//console.log(H);
		if(H<600){
			H=600;
		};
		page.css('height',H);
		bg.css('height',H);
		oldTop=$('#wrapper').css('top').split('px')[0];
		Top= H / oldH * oldTop;
		//console.log(nowPage)
		if (nowPage==0) {
			leftNav.css('top',H+100+'px');
			bg.css('top',H+Top+'px');
			mask.css('top',H+Top+'px');
		}else if(nowPage==1){
			leftNav.css('top',2*H+Top+100+'px');
			bg.css('top',2*H+Top+'px');
			mask.css('top',2*H+Top+'px');
		}
		$('#wrapper').css('top',Top+'px');
		
	});
	function flipPage(now){
		//翻页方法
		prevPage=nowPage;
		nowPage=now;
		if(nowPage!=1 && nowPage!=0 ){
			if(ifNav==0){
				leftNav.animate({top:'-='+H+'px'},800);
				bg.animate({top:'-='+H+'px'},800);
				mask.animate({top:'-='+H+'px'},800);
			}
			ifNav=1;
		}else if(nowPage==0){
			leftNav.animate({top:'-='+-H+'px'},800);
			bg.animate({top:'-='+-H+'px'},800);
			mask.animate({top:'-='+-H+'px'},800);
			ifNav=0;
		};
		$('#wrapper').animate({top:'-='+(nowPage-prevPage)*H+'px'},800);	
	}
//内页调用方法
	function newsPage(){
		//newsPage();
		var offset = 0;
		$(document).mousewheel(function(event, delta){
			//鼠标滚轮控制div滚动
			offset = offset + delta*40;
			if(offset > 0 ){
				offset = offset;
			}else if(offset < H-$('#newsPage').height() ){
				offset = H-$('#newsPage').height();
			};
			$('#newsPage').css('top',offset+'px')
		});
		$('#newsShowBt').toggle(
			function(){
				$('.btBox').animate({top:'+=179px'},400);
				$('#setH').animate({height:'+=179px'},400);
			},
			function(){
				$('.btBox').animate({top:'-=179px'},400);
				$('#setH').animate({height:'-=179px'},400);
			}
		);
		$('#newsPageBt1').hover(
			function() {
				$(this).children('.btMask').hide();
			},
			function() {
				$(this).children('.btMask').show();
			}
		);
		$('#newsPageBt1').click(
			function() {
				$('#newsPage .imgBox img').attr('src','images/newsp1.jpg');
			}
		);
		$('#newsPageBt2').hover(
			function() {
				$(this).children('.btMask').hide();
			},
			function() {
				$(this).children('.btMask').show();
			}
		);
		$('#newsPageBt2').click(
			function() {
				$('#newsPage .imgBox img').attr('src','images/newsp3.jpg');
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
				serviceBody.animate({top:'-=20px'},400);
				$('#sBt'+imgNum).addClass('sBtOn'+imgNum);
				toggleImg(imgNum);
				ifShow = 1;
			}else{
				//收起图片
				if(oldNum==imgNum){
					serviceBody.animate({top:'+=20px'},400);
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
			imgBox.removeClass('sImg1');
			imgBox.removeClass('sImg2');
			imgBox.removeClass('sImg3');
			imgBox.addClass('sImg'+imgNum);
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
				jobBody.animate({top:'-=20px'},400);
				$('#jBt'+imgNum).addClass('jBtOn'+imgNum);
				toggleImg(imgNum);
				ifShow = 1;
			}else{
				if(oldNum==imgNum){
					//下拉图片
					jobBody.animate({top:'+=20px'},400);
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
			imgBox.removeClass('jImg1');
			imgBox.removeClass('jImg2');
			imgBox.removeClass('jImg3');
			imgBox.removeClass('jImg4');
			imgBox.addClass('jImg'+imgNum);
			imgBox.animate({top:'+=361px'},500);	
		};
	};
	
});