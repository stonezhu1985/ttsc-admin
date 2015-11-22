//保留的位置
var saveLeft,saveTop,saveWidth,saveHeight;
var theBody;
var eventType;    //事件种类, "move"、"resize"
var div;
var oX, oY, oLeft, oTop, oWidth, oHeight; //存储原始移动前的位置
var divClone, oDiv;   //克隆的节点和原始节点
var oTime;
 
//创建并设定div的参数
function setDiv(dataInfo)
{
	//防止重复打开
	if (div)
	{
		return;
	}
	var newLeft,newTop,newWidth,newHeight;
	theBody = document.body;
  
	div = document.createElement("div");
	div.id = "panelDiv";
	div.style.cssText = "position: absolute;padding:1px 1px 1px 1px;overflow:hidden; background-color: #E5E5E5;z-index:10;border:1 solid #999999";


	//设定打开的大小和位置

    newWidth = "320px";
    newHeight = "250px";
    newLeft = (theBody.clientWidth - parseInt(350)) / 2 + "px";
    newTop = (theBody.clientHeight - parseInt(200)) / 2 + "px";

	div.style.width = newWidth;
	div.style.height = newHeight;
	div.style.left = newLeft;
	div.style.top = newTop;

	div = setChild(div,dataInfo);

	theBody.appendChild(div);

	var ipt = document.getElementsByTagName("input");
	for(var i = 0; i < ipt.length; i=i+1)
  	{
		ipt[i].disabled = true;
	}
}
 
function setChild(div,dataInfo)
{
	//底色
	var backDiv = document.createElement("div");
	backDiv.style.cssText = "left:0px;top:0px;right:0px; width: 100%; height: 100%; background-color: #F5F5F5;";
	div.appendChild(backDiv);
	
	//标题
	var topDiv = document.createElement("div");
	topDiv.style.cssText = "left: 1px; top: 1px; width: 100%; height: 25px; position: absolute; background-color: #78ABFF; vertical-align: middle; z-index: 15";
	topDiv.style.cursor = "move";
	topDiv.onmousedown= function(){setMove(this);};

	topDiv.innerHTML = "<span style='top:5px; left:5px; font-size:13px; font-weight: bold; color: #102548; position: relative;' onselectstart='return false'>历史价格</span>";
	div.appendChild(topDiv);
  
	//关闭按钮
	var closeDiv = document.createElement("div");
	closeDiv.style.cssText = "right:3px;top:3px;width:20px;height:18px; position: absolute; background-color: #E4EEFF; border: #2D66C4 1px solid; text-align: center; vertical-align: middle; cursor: pointer; z-index: 20";
	closeDiv.onclick= function() {eCloseDiv();};
	closeDiv.innerHTML = "<span style='font-size: 15px; font-weight: bold; color: #0E377A;line-height:18px'>×</span>";
	div.appendChild(closeDiv);
  
	//内容
	var contentDiv = document.createElement("div");
	contentDiv.id = "contentDiv";
	contentDiv.style.cssText = "left: 2px; top: 30px; width: 100%; position: absolute; overflow-y:auto;";
	contentDiv.style.height = (parseInt(div.style.height) - 35) + "px";
	contentDiv.innerHTML =dataInfo;
	div.appendChild(contentDiv);
  
	return div;
}
 

//clone拖移的节点
function setMove(obj)
{
	if (event.button == 1)
	{
		if (oTime)
		{
			clearTimeout(oTime);
			divClone.parentNode.removeChild(divClone);
		}
		oDiv = obj.parentNode;
		divClone = oDiv.cloneNode(true);
		divClone.style.filter = "Alpha(opacity=50)";
		divClone.childNodes[1].onmousemove=function(){startMove(this);};
		divClone.childNodes[1].onmouseup=function(){endMove();};
		oX = parseInt(event.clientX);
		oY = parseInt(event.clientY);
		oLeft = parseInt(divClone.style.left);
		oTop = parseInt(divClone.style.top);
		document.body.appendChild(divClone);
		divClone.childNodes[1].setCapture();
		eventType = "move";
	}
}
 
//拖移
function startMove(obj)
{
	if (eventType == "move" && event.button == 1)
	{
		var moveDiv = obj.parentNode;
   		moveDiv.style.left = (oLeft + event.clientX - oX) + "px";
   		moveDiv.style.top = (oTop + event.clientY - oY) + "px";
  	}
}
 
//拖移结束调用动画
function endMove()
{
	if (eventType == "move")
  	{
   		divClone.childNodes[1].releaseCapture();
        move(parseInt(divClone.style.left), parseInt(divClone.style.top));
   		eventType = "";
  	}
}
 
 //移动的动画
function move(aimLeft, aimTop)
{
	var nowLeft = parseInt(oDiv.style.left);
	var nowTop = parseInt(oDiv.style.top);
	var moveSize = 30;
	if (nowLeft > aimLeft + moveSize || nowLeft < aimLeft - moveSize || nowTop > aimTop + moveSize || nowTop < aimTop - moveSize)
	{
		oDiv.style.left = aimLeft > nowLeft + moveSize ? (nowLeft + moveSize) + "px" : aimLeft < nowLeft - moveSize ? (nowLeft - moveSize) + "px" : nowLeft + "px";
		oDiv.style.top = aimTop > nowTop + moveSize ? (nowTop + moveSize) + "px" : aimTop < nowTop - moveSize ? (nowTop - moveSize) + "px" : nowTop + "px";
		oTime = setTimeout("move(" + aimLeft + ", " + aimTop + ")", 1);
	}
	else
	{
		oDiv.style.left = divClone.style.left;
		oDiv.style.top = divClone.style.top;
		divClone.parentNode.removeChild(divClone);
		divClone == null;
	}
}
 
 //关闭DIV
function eCloseDiv()
{
	if (div)
	{
		div.parentNode.removeChild(div);
		var ipt = document.getElementsByTagName("input");
		for(var i = 0; i < ipt.length; i=i+1)
		{
			ipt[i].disabled = false;
		}
		div = null;
	}
}
