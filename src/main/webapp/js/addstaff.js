$(document).ready(function(){      
     $("#cardid").blur(function(){
         var cardid =$("#cardid").val();
		      if(cardid==""){
		           return;
		      }
	         if(cardid.length!=15&&cardid.length!=18){
	            alert("您输入的身份证号非法，请确认！！")
	            $("#cardid").val("");
	            return;
	         }
	         var sex,birthday; 
	         if(cardid.length==15){
	            sex = parseInt(cardid.substr(14,1));
	            birthday="19"+cardid.substr(6,2)+"-"+cardid.substr(8,2)+"-"+cardid.substr(10,2);
	         }else{
	         	birthday=cardid.substr(6,4)+"-"+cardid.substr(10,2)+"-"+cardid.substr(12,2);
	          	sex = parseInt(cardid.substr(16,1));
	         }
	         if(sex%2==0){
	          	   	$("#staffsex").val("1");
	          	    $("#staffsex").prev().text("女");
	          	}else{
	          	   	$("#staffsex").val("0");
	          	    $("#staffsex").prev().text("男");
	          	}
	         $("#birthday").val(birthday);
	         $("#birthdayStr").text(birthday);
     });
     $("#staffphone").blur(function(){
         var staffphone = $("#staffphone").val();
         if(staffphone==""){
           		return;
      	 }
         if(isNaN(staffphone)){
              alert("您输入的手机号带有非法字符，请重新输入！");
              $("#staffphone").val("");
              return;
         }
         if(staffphone.length!=11){
              alert("您输入的手机号长度有误，请重新输入！");
              $("#staffphone").val("");
              return;
         }
     });
     $("#emergentphone").blur(function(){
         var emergentphone = $("#emergentphone").val();
         if(emergentphone==""){
           		return;
      	 }
         if(isNaN(emergentphone)){
              alert("您输入的手机号带有非法字符，请重新输入！");
              $("#emergentphone").val("");
              return;
         }
         if(emergentphone.length!=11){
              alert("您输入的手机号长度有误，请重新输入！");
              $("#emergentphone").val("");
              return;
         }
     });
$("#agreementlastdate").bind("propertychange",function(){
		  if($("#agreementlastdate").val()!=""){
		    var startdate = Date.parse($("#agreementbegindate").val().replace(/-/g,"/"));
		    var enddate = Date.parse($("#agreementlastdate").val().replace(/-/g,"/"));
		     if(enddate<startdate){
		         alert("您选择的到期日期在起始日期之前，请重新选择!");
		         $("#agreementlastdate").val("");
		         return;
		     }
		  }
 });
 $("#highestedu").bind("click",function(){
	if($("#highestedu").val()!=""){
	  	var eduval =$("#highestedu").val();
	  	$("#stuexercise").css("display","");
	  	SetHighestedu(eduval);
	  	if(eduval=="0"){
	  	  	$("#firstdisplay").val("中专");
	  	}else if(eduval=="1"){
	  		$("#firstdisplay").val("大专");
	  	}else{
	  	 	$("#firstdisplay").val("本科");
	  	}
	}else{
		$("#stuexercise").css("display","none");
	}
});   
$("#renewaldata").bind("propertychange",function(){
        if($("#renewaldata").val()!=""){
	         var startdate = Date.parse($("#agreementbegindate").val().replace(/-/g,"/"));
	         var renewaldata = Date.parse($("#renewaldata").val().replace(/-/g,"/"));
	          if(renewaldata<startdate){
	              alert("您选择的续签日期在起始日期之前，请重新选择!");
	              $("#renewaldata").val("");
	              return;
	          }
        }
});          
});