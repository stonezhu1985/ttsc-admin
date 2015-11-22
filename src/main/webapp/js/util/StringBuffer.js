/*   
 * StringBuffer Class, to join two string is the most use   
 * @author xiaofei 2007-7-20    
 */   
function StringBuffer()    
{    
    this._strings = [];    
    if(arguments.length==1)    
    {    
        this._strings.push(arguments[0]);    
    }    
}    
   
StringBuffer.prototype.append = function(str)    
{    
    this._strings.push(str);    
    return this;    
}    

StringBuffer.prototype.toString = function(splitFlag)    
{    
	if(!splitFlag){
		splitFlag = "";
	}
	if(typeof splitFlag != "string"){
		splitFlag = splitFlag+"";
	}
	
    var tempStr = this._strings.join(splitFlag);
	if(this._strings.length > 1){
		this._strings.length = 0;
		this._strings.push(tempStr);
	}
	return tempStr;
}    
   
/* 返回长度 */   
StringBuffer.prototype.length = function()    
{    
    var str = this.toString();    
    return str.length;    
}    

/* 删除后几位字符 */   
StringBuffer.prototype.del = function(num)    
{    
    var str = this.toString();   
	var len = str.length; 
	
    str = str.slice(0,len-num);    
    this._strings.length = 0;    
    this._strings.push(str);    
}   
