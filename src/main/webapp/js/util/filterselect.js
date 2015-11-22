/*==================================================*
 $Id: filterselect.js,v 1.1 2013/05/20 15:38:06 test Exp $
 Copyright 2003 Patrick Fitzgerald
 http://www.barelyfitz.com/webdesign/articles/FilterSelect/

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *========================================================*/
 /**
 *实现原理：
 *1.通过正则表达式进行匹配
 *2.每次过滤删除所有的项目
 *3.然后再把符合要求的项目添加到列表中
 */
if(!FilterSelect){
var FilterSelect=function (inputNode,showNum,selectSize,valueSelectListener) {
  this.detectValueChanged = true;
  this.oriValue = "";
  this.isRecover = true;
  
  this.inputNode = inputNode;
  this.selectNode = null;
  this.flags = "i";
  if(showNum){
  	this.showNum = showNum;
  }else{
  	this.showNum = 50;
  }
  
  if(selectSize){
  	this.selectSize = selectSize;
  }else{
  	this.selectSize = 10;
  }
  
  //该回调函数当需要为input设定更多信息时考虑.参数 inputNode selectNode
  if(valueSelectListener){
  	this.valueSelectListener = valueSelectListener;
  }else{
  	this.valueSelectListener = null;
  }
  //该回调函数用于多级联动的时候考虑.参数 待过滤的option对象
  this.outerFilter = null;
  //下来框调整后执行接口
  this.afterFilter = null;
  
  this.infoArr = [];
  
  this.init = function() {
    this.inputNode.style.backgroundColor=FilterSelect.BK_COLOR;
	this.selectNode = document.createElement("select");
	this.selectNode.style.position = "absolute";
	this.selectNode.size = this.selectSize;
	this.selectNode.style.display = "none";
	document.body.appendChild(this.selectNode);
	
	Event.observe(this.inputNode,"click",function(e){
		if(e==null)e=window.event;
		Event.stop(e);
	});
	Event.observe(this.inputNode,"focus",this.focus.bind(this));
	Event.observe(this.inputNode,"keydown",this.switchFilter.bind(this));
	Event.observe(this.inputNode,"blur",this.blur.bind(this));
	if(navigator.userAgent.indexOf("MSIE")>0){
		Event.observe(this.inputNode,"propertychange",this.propertyChanged.bind(this));
	}else{
		Event.observe(this.inputNode,"input",this.propertyChanged.bind(this));
	}
	
	
	Event.observe(this.selectNode,"click",this.valueSelected.bind(this));
  };
  
  this.switchFilter = function(e){
  	if(e.keyCode == 17){
		this.filter(this.inputNode.value,true);
	}
  };
  
  this.focus = function(e){
  	if(e==null)e=window.event;
	if(FilterSelect.selected){
		$(FilterSelect.selected).hide();
	}
	
	FilterSelect.selected = this.selectNode;
	var loc = Position.cumulativeOffset(this.inputNode);
	$(this.selectNode).focusable= false;
	$(this.selectNode).style.left = loc[0]+"px";
	$(this.selectNode).style.top = (loc[1]+this.inputNode.offsetHeight)+"px";
	$(this.selectNode).style.width = this.inputNode.offsetWidth+"px";
	$(this.selectNode).show();
	
	this.oriValue = this.inputNode.value;
	this.filter(this.oriValue);
  };
  
  this.blur = function(e){
  	if(e==null)e=window.event;
	
	this.detectValueChanged = false;
	if(this.isRecover){
		this.inputNode.value = this.oriValue;
	}
  };
  
  this.propertyChanged = function(e){
  	if(e==null)e=window.event;
  	
	if(navigator.userAgent.indexOf("MSIE")>0){
		//欠缺safari浏览器的处理（目前不影响使用）
		if(e.propertyName != "value"){
			return ;
		}
		
		if(!this.detectValueChanged){
			this.detectValueChanged = true;
			return ;
		}	
	}
	
	var str = this.inputNode.value;
	try
	{
		if(str == ""){
			this.oriValue = "";
			this.inputNode.uid = "";
			if(this.valueSelectListener){
				if(typeof this.valueSelectListener == "function"){
					this.valueSelectListener.call(null,this.inputNode,this.selectNode);
				}
			}
		}
	}
	catch(e)
	{
		alert(e);
	}
	
	if(this.filterTimer != null){
		window.clearTimeout(this.filterTimer);
	}
	this.filterTimer = window.setTimeout(function(fstr){
		this.filter(fstr);
	}.bind(this,str),600);
  };
  
  this.valueSelected = function(e){
  	if(e==null)e=window.event;
  	
	this.detectValueChanged = false;
	
	var option = this.selectNode.options[this.selectNode.selectedIndex];
	this.oriValue = this.inputNode.value = option.text;
	this.inputNode.uid = option.value;
	if(FilterSelect.outOperate && typeof(FilterSelect.outOperate) == 'function'){
				FilterSelect.outOperate(this.inputNode.uid,this.inputNode.getAttribute('dictype'));
	}
	if(this.valueSelectListener){
		if(typeof this.valueSelectListener == "function"){
			this.valueSelectListener.call(null,this.inputNode,this.selectNode);
		}
	}
  }

  
  this.filterPattern = function(pattern,isFromStart){
  	isFromStart = !!isFromStart;
	if(isFromStart){
		return "^"+pattern.replace(/([\(\)\[\{\\\^\$\|\?\*\+])/g,"\\$1");
	}else{
   		return pattern.replace(/([\(\)\[\{\\\^\$\|\?\*\+])/g,"\\$1");
	}
  };
  
  //---------------------实现过滤功能主体-------------------------
  this.filter = function(str,isFromStart) {
	var pattern=this.filterPattern(str,isFromStart);

    var index=0, regexp;

    this.selectNode.options.length = 0;

    try {
      // Initialize the regexp
      regexp = new RegExp(pattern, this.flags);
    } catch(e) {
		alert("不支持正则表达式!");
      return;
    }

    // Loop through the entire select list and
    // add the matching items to the select list
    for (var loop=0; loop < this.infoArr.length; loop++) {
      // This is the option that we're currently testing
      var option = this.infoArr[loop];
	  if(this.outerFilter){
	  	if(!this.outerFilter.call(null,option)){
			continue;
		}
	  }

      // Check if we have a match
      if (regexp.test(option.text)){
        this.selectNode.options[index++] = option;
        if(index >= this.showNum){
        	break;
        }
      }
    }

	  if(this.afterFilter){
	  	if(!this.afterFilter.call(null)){
		}
	  }
  };

  //---------------是否考虑大小写，默认不考虑---------------------
  this.set_ignore_case = function(value) {
    if (value) {
      this.flags = 'i';
    } else {
      this.flags = '';
    }
  };

  this.setValue = function(value){
  	this.inputNode.uid = value;
  	if(value == null){
  		this.inputNode.value = "";
  		return ;
  	}
	var num = this.infoArr.length;
	for(var i=0;i<num;i++){
		if(this.infoArr[i].value == value){
			this.inputNode.value = this.infoArr[i].text;
			return;
		}
	}
  	this.inputNode.value = "";
	this.inputNode.uid = null;
  };
  //==================================================
  // Initialize the object
  //==================================================
  this.init();
};
FilterSelect.BK_COLOR="#D2D2D2";
FilterSelect.clearValue = function(input){
	input.uid = null;
	input.value = "";
};
}

Event.observe(window,"load",function(){
	Event.observe(document.body,"click",function(){
		if(FilterSelect.selected){
			$(FilterSelect.selected).hide();
		}
	});
});

