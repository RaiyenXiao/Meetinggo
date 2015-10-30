//jquery_impDo,made by letsufo.com,v0.14
(function($) {
	$.fn.impDo=function(selector,config){//{finText,fn}
		if(typeof selector == "object"){
			config=selector;
			selector="";
		}
		this.each(function(){//return 
			var impObj,tarObj;
			var canDo=true;
			function clickDo(){
				if(!$(this).hasClass("_makeSure")){
					tarObj=$(this).children().eq($(this).children().length-1);
					var def={
						textObj:tarObj,
						defText:tarObj.html(),
						url:null,
						par:null,
						finText:null,
						//sendType:"POST",
						fn:null
					};
					impObj=$.extend(def,config);
					//tarObj.data("defText",impObj.defText);
				}
				if(!$(this).hasClass("_finish")&&canDo){
					var this_=$(this);
					canDo=false;
					if(!$(this).hasClass("_makeSure")){//做一次判断
						$(this).addClass("_makeSure");
						impObj.textObj.stop().fadeOut(100,function(){
							impObj.textObj.html("确定？");
							impObj.textObj.fadeIn(100,function(){canDo=true;});
						});
					}
					else{//执行
						$(this).removeClass("_makeSure");
						if(impObj.url){//需要向页面发送数据
							$.getJSON(impObj.url+"?callbak=?",impObj.par,function(data){//alert(data),impObj.sendType
							//$.getJSON(impObj.url+"?"+impObj.par+"&callbak=?",function(data){//
								if(data.ok==1){//操作成功
									if(impObj.finText)impObj.textObj.html(impObj.finText);
									if(impObj.fn){
										impObj.fn.apply(this_);
									}
									//this_.addClass("_finish");
								}
								else if(data.ok==0){
									this_.addClass("_makeSure");
									impObj.textObj.html("操作失败");
								}
								else{
									this_.addClass("_makeSure");
									impObj.textObj.html("连接失败");
								}
							});
						}//url判断end
						else{//直接执行
							var willText;
							(impObj.finText!="")?willText=impObj.finText:willText=impObj.defText;
							impObj.textObj.stop().fadeOut(100,function(){
								impObj.textObj.html(willText);
								impObj.textObj.fadeIn(100,function(){canDo=true;});
							});
							if(impObj.fn){
								impObj.fn.apply(this_);
							}
							//this_.addClass("_finish");
						}
						setTimeout(function(){canDo=true;},500);
					}
				}//if end
			}
			if(selector!="") $(this).on("click",selector,clickDo);
			else $(this).on("click",clickDo);

			function mouseleaveDo(){
				if($(this).hasClass("_makeSure")){
					$(this).removeClass("_makeSure");
					var tarObj=$(this).children().eq($(this).children().length-1);
					tarObj.stop().fadeOut(100,function(){
						//tarObj.html(tarObj.data("defText"));
						tarObj.html(impObj.defText);
						//tarObj.removeData("defText");
						tarObj.fadeIn(100,function(){canDo=true;});
					});
				}
			}
			if(selector!="") $(this).on("mouseleave",selector,mouseleaveDo);
			else $(this).on("mouseleave",mouseleaveDo);
		});//each end
	}//impDo end
})(jQuery);