//判断是否为整数
function isInt(value)
{
     var re =/^[1-9]+[0-9]*]*$/;//判断正整数   

     if (!re.test(value))
	    {
	    	 return false;
	     }
     return true;
} 