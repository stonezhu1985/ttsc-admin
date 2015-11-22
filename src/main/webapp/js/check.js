var	NUM_HAN = '0123456789';

	var	Minute=/[0-5][0-9]/;   
	var	Require= /.+/;
	var	Email=/^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
	var	Phone=/^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
	var	Mobile=/^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/; //|^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
	var	Telephone=/(^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$)|(^((\(\d{3}\))|(\d{3}\-))?13\d{9}$)/;
	var	Url=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	var	Website=/^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	var	IdCard=/^\d{15}(\d{2}[A-Za-z0-9])?$/;
	var	Currency=/^\d+(\.\d+)?$/;
	var	number=/^\d+$/;
	var	Zip=/^[1-9]\d{5}$/;
	var	QQ=/^[1-9]\d{4,8}$/;
	var	Integer=/^[-\+]?\d+$/;
	var	Double=/^[-\+]?\d+(\.\d+)?$/;
	var	English=/^[A-Za-z]+$/;
	var	Chinese=/^[\u0391-\uFFE5]+$/;
	var	UnSafe=/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
	var strr="test";
function isMinute(obj){
	return Minute.exec(obj);
}
function isRequire(obj){
	return Require.exec(obj);
}
function isEmail(obj){
	return Email.exec(obj);
}
function isPhone(obj){
	return Phone.exec(obj);
}
function isMobile(obj){
	return Mobile.exec(obj);
}
function isTelephone(obj){
	return Telephone.exec(obj);
}
function isUrl(obj){
	return Url.exec(obj);
}
function isIdCard(obj){
	return IdCard.exec(obj);
}
function isCurrency(obj){
	return Currency.exec(obj);
}
function isNumber(obj){
	return number.exec(obj);
}
function isZip(obj){
	return Zip.exec(obj);
}
function isQQ(obj){
	return v.exec(obj);
}
function isInteger(obj){
	return Integer.exec(obj);
}
function isDouble(obj){
	return Double.exec(obj);
}
function isEnglish(obj){
	return English.exec(obj);
}
function isChinese(obj){
	return Chinese.exec(obj);
}
function isUnSafe(obj){
	return UnSafe.exec(obj);
}
function isWebsite(obj){
	return Website.exec(obj);
}
//-----------------------------------------------------------------------------
//  Name      : checkDate
//  Function  : ????????????????
//  Argument  : vDate :??????(yyyy-mm-dd)??(yyyy-mm-dd hh:mm)
//  Return    : true:???????????????? false:??????????????????
//  Desc      : 
//-----------------------------------------------------------------------------
function checkDate(vDate) {
	if(vDate == "")
		return true;  //??????????????	
	if(!(bCharInDateCheck(vDate)))
		return false;
	if(vDate.length!=10 &&vDate.length!=16)
	    return false;
	var vHM="";
	if(vDate.length>10){
	    vHM = vDate.substring(11);
	    vDate = vDate.substring(0,10);		    	    
	}
	var tempArray = vDate.split("-");
	if(tempArray !=null){        
		var vYear = tempArray[0];// vYear:??(yyyy)
		var vMonth= tempArray[1];//vMonth:??(mm)
		var vDay = tempArray[2];//vDay:??(dd)  		
		if(vYear.length!=4){//??????4??????			
			return false;			
		}
	        if(vMonth.length!=2){//??????2??????	               
	                return false;
	        }
		if(vDay.length !=2){// ?????? (yyyy-mm-dd )		        
                        return false;	   
		}
       }else{	                
		return false;
       }
       
	var	maxDayOfMonth =new  Array( 31,29,31,30,31,30,31,31,30,31,30,31 );
	if (vMonth < 1 || vMonth > 12){		
		return false;		//??????????????
	}	
	if (vDay < 1 || vDay > maxDayOfMonth[vMonth-1] ){		
		return false;		//??????????????
	}
	if(vMonth==1 || vMonth==3 || vMonth==5 || vMonth==7 || vMonth==8 || vMonth==10 || vMonth==12){
		if(vDay>31)
		    return false;
        }else if(vMonth==2){
        	if((vYear%4==0 && vDay > 29) || (vYear%4!=0 && vDay>28)){
        		return false;		//2????????????	
        	}
        }else if(vMonth==4 || vMonth==6 || vMonth==9 || vMonth==11){
        	if(vDay>30){
        		return false;//??????????????
        	}
        }    	 
	//????????????????????
	if(vHM.length>0){
	    var Hour = vHM.substring(0,2);
            var Minute = vHM.substring(3);
	    if(Hour>23 || Hour<0)
	        return false;
	    if(Minute>59 || Minute <0)
	        return false;
	}       
	return true;			//????????
}


//---------------------------------------------------------------------------
//Name     : bCharInDateCheck
//Function : ??????????????????????????????
//Argument : o,input strMsg:error message
//Return    : true:???? false:????
//Desc:
//---------------------------------------------------------------------------
function bCharInDateCheck(strDate){
	
	v = strSpaceBothEndsCut(strDate);	//??????space ????	
	for (i=0; i<v.length; i++){
		c = v.charAt(i);
		if(c=="-" || c==":" || c==" "){
			continue;
		}else if (NUM_HAN.indexOf(c,0) < 0){		   
			return false;	//check error
		}
	}
	return true;			//check ok
} 
//-----------------------------------------------------------------------------
//  Name      : vodErrMsgFocus
//  Function  : ?strMsg??error message
//  Argument  : o:check ?? strMsg:error message
//  Return    : true:?? false:??
//  Desc      : 
//-----------------------------------------------------------------------------
function vodErrMsgFocus(o,strMsg){
	if (strMsg != ''){
		alert(strMsg);
		if (typeof(o) == 'object'){
			vodFocusTo(o);
		}
	}
}
//-----------------------------------------------------------------------------
//  Name      : vodFocusTo
//  Function  : ?????
//  Argument  : o:check ??
//  Return    : 
//  Desc      : ?????????input ?
//-----------------------------------------------------------------------------
function vodFocusTo(o) {
	o.focus();
	if (typeof(o.select) != 'undefined')
		o.select();		
}  
//-----------------------------------------------------------------------------
//  Name      : blnCheckRequirement
//  Function  : check ????(?????)
//  Argument  : o:check ?? strMsg:error message
//  Return    : true:???  false:????
//  Desc      : 
//-----------------------------------------------------------------------------
function blnCheckRequirement(o,strMsg) {

	if (blnOnlySpace(o.value)) {
		vodErrMsgFocus(o,strMsg);
		return false;
	}
	return true;
} 
//-----------------------------------------------------------------------------
//  Name      : blnOnlySpace
//  Function  : check ??????
//  Argument  : s:????
//  Return    : true:?????  false:?????
//  Desc      : 
//-----------------------------------------------------------------------------
function blnOnlySpace(s){
	var re, arr;

	re = /[^ ?\t\n\r]/;
	arr = re.exec(s);
	if (arr != null){
		return false;	//?????
	}else{
		return true;	//?????
	}
}
//-----------------------------------------------------------------------------
//  Name      : isDate
//  Function  : ????????
//  Argument  : vDate :???(yyyy-mm-dd)?(yyyy-mm-dd hh:mm)
//  Return    : true:???????? false:?????????
//  Desc      : 
//-----------------------------------------------------------------------------
function isDate(vDate) {
	var vHM="";
	var vYear="",vMonth="",vDay="",Hour="",Minute="";
    vDate = strSpaceBothEndsCut(vDate);	//???space ??	
	if(vDate.length>10){
	    vHM = vDate.substring(11);
	    vDate = vDate.substring(0,10);		    	    
	}
	var tempArray = vDate.split("-");
	if(tempArray !=null){        
		 vYear = tempArray[0];// vYear:?(yyyy)
		 vMonth= tempArray[1];//vMonth:?(mm)
		 vDay = tempArray[2];//vDay:?(dd)  		
		if(vYear.length!=4){//???4???			
			return false;			
		}
	        if(vMonth.length!=2){//???2???	               
	                return false;
	        }
		if(vDay.length !=2){// ??? (yyyy-mm-dd )		        
                        return false;	   
		}
       }else{	                
		return false;
       }
       
	var	maxDayOfMonth =new  Array( 31,29,31,30,31,30,31,31,30,31,30,31 );
	
	if (vMonth < 1 || vMonth > 12){		
		return false;		//???????
	}
	
	if (vDay < 1 || vDay > maxDayOfMonth[vMonth-1] ){		
		return false;		//???????
	}
	if(vMonth==1 || vMonth==3 || vMonth==5 || vMonth==7 || vMonth==8 || vMonth==10 || vMonth==12){
		if(vDay>31)
		    return false;
        }else if(vMonth==2){
        	if((vYear%4==0 && vDay > 29) || (vYear%4!=0 && vDay>28)){
        		return false;		//2??????	
        	}
        }else if(vMonth==4 || vMonth==6 || vMonth==9 || vMonth==11){
        	if(vDay>30){
        		return false;//???????
        	}
        }    
	 
	//??????????
	if(vHM.length>0){
	    Hour = vHM.substring(0,2);
            Minute = vHM.substring(3);
	    if(Hour>23 || Hour<0)
	        return false;
	    if(Minute>59 || Minute <0)
	        return false;
	}
	return true;			//????
}
//----------------------------------------------------------------------------
//  Name     :compareDate
//  Function :?????????
//  Argument :vDate1,vDate2 (yyyy-mm-dd ? yyyy-mm-dd hh:mm)?????????
//  Return   :true:???????  false:???????
//  Desc     :???????"-"
//----------------------------------------------------------------------------
function compareDate(vDate1,vDate2){
  if(vDate1.length == 10 && vDate2.length == 10){
	  var tmp=vDate1.split("-");
	  var date1 = new Date(tmp[0],tmp[1],tmp[2]);
	  tmp = vDate2.split("-");
	  var date2 = new Date(tmp[0],tmp[1],tmp[2]);
	  if(date1>date2){
		  return false;
	  }else{
		  return true;
	  }
  }else if(vDate1.length== 16 && vDate2.length==16){
	  var tmpYMD=vDate1.split("-");
	  tmpYMD[2] = vDate2.substring(9,10);
	  var subDate = vDate1.substring(11);
	  var tmpHM = subDate.split(":");
	  var date1= new Date(tmpYMD[0],tmpYMD[1],tmpYMD[2],tmpHM[0],tmpHM[1],0);

	  tmpYMD = vDate2.split("-");
	  tmpYMD[2] = vDate2.substring(9,10);
	  
	  subDate = vDate2.substring(11);
	  tmpHM = subDate.split(":");
	  var date2 = new Date(tmpYMD[0],tmpYMD[1],tmpYMD[2],tmpHM[0],tmpHM[1],0);
	  if(date1>date2){
		  return false;
      }else{
		  return true;
	  }
  }
	return false;  
}

//---------------------------------------------------------------------------
//Name     : bCharInDateCheck
//Function : ???????????????
//Argument : o,input ???? strMsg:error message
//Return    : true:?? false:??
//Desc:
//---------------------------------------------------------------------------
function bCharInDateCheck(o,strMsg){
	var v;
	o.value = strSpaceBothEndsCut(o.value);	//???space ??	
	v = o.value;
	for (i=0; i<v.length; i++){
		c = v.charAt(i);
		if(c=="-" || c==" " || c==":"){
			continue;
		}else if (NUM_HAN.indexOf(c,0) < 0){		   
			vodErrMsgFocus(o,strMsg);
			return false;	//check error
		}
	}
	return true;			//check ok
} 
 //?????form?????                  
function setActionTarget(form,str) {  
	form.action = str;	
	form.submit();            
	return true;                        
} 
//-----------------------------------------------------------------------------
//  Name      : strSpaceBothEndsCut
//  Function  : ??????space ????
//  Argument  : v:????????
//  Return    : v:????????????
//-----------------------------------------------------------------------------
function strSpaceBothEndsCut(v) {
	return v.replace(/^\s*/,'').replace(/\s*$/,'');
}

