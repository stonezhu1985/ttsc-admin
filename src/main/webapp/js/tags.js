
var timerDiv;
var timerClass;
function actionMouseOut()
{
	if(timerDiv)
	{
		clearTimeout(timerDiv);
	}
}

function actionMouseOver(str)
{
	if(timerDiv)
	{
		clearTimeout(timerDiv);
	}
	timerDiv=setTimeout("showdiv('"+str+"')",300);
}

function showdiv(div)
{
	var arrDiv;
	if(div)
	{
		arrDiv=div.split(";");
		if(arrDiv.length>1)
		{
			document.getElementById(arrDiv[0]).style.display="block";
			for(var i=1;i<arrDiv.length;i++)
			{
				hidediv(arrDiv[i]);
			}
		}
	}
}

function hidediv(div)
{
	document.getElementById(div).style.display="none";
}
function changeClass(str)
{
	if(timerClass)
	{
		clearTimeout(timerClass);
	}
	timerClass=setTimeout("showclass('"+str+"')",300);
}
function showclass(div)
{
	var arrDiv;
	if(div)
	{
		arrDiv=div.split(";");
		if(arrDiv.length>1)
		{
			document.getElementById(arrDiv[0]).className="active";
			for(var i=1;i<arrDiv.length;i++)
			{
				hideclass(arrDiv[i]);
			}
		}
	}
}
function hideclass(a)
{
	document.getElementById(a).className="";
}
function actionClassOut()
{
	if(timerClass)
	{
		clearTimeout(timerClass);
	}
}