function voteOut($target,data,str,proportion,delay){//$target:jQuery,data:int,str:String,proportion:Number,delay:s
	if(delay==undefined)delay=0;
	TweenMax.to($target.css("transition","none"),2,{width:proportion*100+"%",ease:Power2.easeInOut,delay:delay,onUpdate:function(){
		$target.html(Math.round($target.width()/$target.parent().width()/proportion*data)+str);
	}});
	//var defArray=[0,0];
	//TweenMax.to(defArray,2,{endArray:[data,100],ease:Power2.easeInOut,onUpdate:function(){$target.html(defArray+str);}});
}

$(function(){
	if($(".registerItem").length>0){//会议内容中的报名信息勾选
		$(".registerItem").on("click",">*",function(){
			if($(this).attr("must")==undefined){
				var id=$(this).attr("ref");
				if($(this).attr("active")==undefined){
					$(this).attr("active","");
					$("input[name='filedvalue["+id+"]']").val("1");
				}else{
					$(this).removeAttr("active");
					$(this).find("[active]").removeAttr("active");
					$("input[name='filedvalue["+id+"]']").val("0");
					$("input[name='filedmust["+id+"]']").val("0");
				}
			}
		});
		$(".registerItem").on("click","label",function(){
			if($(this).attr("must")==undefined){
				var id=$(this).parents("button").attr("ref");
				if($(this).attr("active")==undefined){
					$(this).attr("active","");
					if($(this).parents("button").attr("active")==undefined)	$(this).parents("button").attr("active","");
					$("input[name='filedvalue["+id+"]']").val("1");
					$("input[name='filedmust["+id+"]']").val("1");
				}else{
					$(this).removeAttr("active");
					$("input[name='filedmust["+id+"]']").val("0");
				}
			}
			return false;
		});
	}
});