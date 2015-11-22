/* *
 * 用于客户端信息向excel的导出，需要microsoft excel activex的支持
 * 使用样本 :
 * var excelApp = new ExcelApp();
 * var book = excelApp.addWorkBook();
 * var sheet = book.addSheet("xjs");
 * var cell = sheet.addCell(testTable); 参数可以是节点对象，也可以是文本信息
 * cell.setBounds(5, 10, 1, 1);
 * excelApp.exportToExcel(false);
 * 支持多个WorkBook, sheet, cell的添加
 */

if( ! Class){
      var Class = {
      }
      ;
}
Class.create = function() {
      var newClass = function() {
            if(typeof(this.initialize) == "function"){
                  this.initialize.apply(this, arguments);
            }
      }
      ;

      var length = arguments.length;
      if(length > 1){
            newClass.prototype = arguments[1];
      }
      newClass.prototype.className = length > 0 ? arguments[0] : "anonymous";

      return newClass;
}
;

if( ! ExcelBase){
      var ExcelBase = Class.create("xjs.ExcelBase");
      ExcelBase.prototype.initialize = function(){

      }
      ;
}
if( ! ExcelApp){
      var ExcelApp = Class.create("xjs.ExcelApp", new ExcelBase());
}
if( ! ExcelWorkBook){
      var ExcelWorkBook = Class.create("xjs.ExcelWorkBook", new ExcelBase());
}
if( ! ExcelSheet){
      var ExcelSheet = Class.create("xjs.ExcelSheet", new ExcelBase());
}
if( ! ExcelCell){
      var ExcelCell = Class.create("xjs.ExcelCell", new ExcelBase());
}

// excel application的方法和属性
ExcelApp.prototype.initialize = function(){
      this._excelApp = null;

      this.workBooks = [];

      this.progressBar = null;
}
;
ExcelApp.prototype.updateProgress = function(text, progress){
      if(this.progressBar == null){
            return ;
      }
      if(this.progressBar.setProgress != null){
            this.progressBar.setProgress(text, progress);
      }
}
;
ExcelApp.prototype.addWorkBook = function(bookName){
      var newWorkBook = new ExcelWorkBook(this, bookName);

      this.workBooks[this.workBooks.length] = newWorkBook;

      return newWorkBook;
}
;
ExcelApp.prototype.exportToExcel = function(isAutoSave, fileName){
      var _excelApp = this._openExcel();
      if(_excelApp == null){
            return false;
      }

      if(isAutoSave){
            if(fileName == null){
                  fileName = "temp.xls";
            }
            var filePath = _excelApp.getSaveAsFileName(fileName, "Excel Spreadsheets (*.xls), *.xls");

            
            if( ! filePath){
                  return false;
            }
      }

      _excelApp.SheetsInNewWorkbook = 3;
      _excelApp.DisplayAlerts   =   false;
      try{
            var book, _book;
            var bookNum = this.workBooks.length;
            var sheetNum;
            for(var i = 0; i < bookNum; i ++ ){
                  book = this.workBooks[i];
                  _book = this._excelApp.Workbooks.add();
                  sheetNum = this.disposeExcelWorkBook(_book, book);

                  //删除多余的sheet对象
                  var j;
                  for(j= sheetNum + _excelApp.SheetsInNewWorkbook;j > sheetNum + 1 ;j--){
                    _book.WorkSheets.item(j).Delete();
                  }
                  if(sheetNum > 0){
                    _book.WorkSheets.item(j).Delete();
                  }
                  
                  if(isAutoSave){
                        _book.SaveAs(filePath);
                        _book.close();
                  }
            }
            this.updateProgress("Export Successful!", 100);
      }
      catch(e){
            return false;
      }
      finally{
            if(isAutoSave){
                  this._closeExcel();
            }
            else{
                  _excelApp.visible = true;
                  //        	_excelApp.WindowState = 3;
                  _excelApp.userControl = true;
            }
      }

      return true;
}
;
ExcelApp.prototype.disposeExcelWorkBook = function(_book, book){
      var sheet, _sheet;
      var sheetNum = book.sheets.length;
      for(var i = sheetNum - 1; i >= 0; i -- ){
            sheet = book.sheets[i];
            _sheet = _book.Worksheets.add();
            _sheet.name = sheet.name;
            this.disposeExcelSheet(_sheet, sheet);
      }
      return sheetNum;
}
;
ExcelApp.prototype.disposeExcelSheet = function(_sheet, sheet){
      var cell, _cell;
      var cellNum = sheet.cells.length;
      if(sheet.strRange){
	  	_sheet.Range(sheet.strRange).NumberFormatLocal = "@";
	  }else{
	  	_sheet.Range("A1:Z65535").NumberFormatLocal = "@";
	  }

      this.updateProgress("Export[" + sheet.name + "] 0%", 0);
      for(var i = 0; i < cellNum; i ++ ){
            cell = sheet.cells[i];
            _cell = null;
            this.disposeExcelCell(_sheet, _cell, cell , i, cellNum);

            this.updateProgress("Export[" + sheet.name + "] " + Math.round((i + 1) * 100 / cellNum) + "%", 0);
      }
      
      return cellNum;
}
;
ExcelApp.prototype.disposeExcelCell = function(_sheet, _cell, cell, curCellNum, cellNum){
      var bounds = cell.getBounds();
      var data = cell.getData();
	  
      if(data != null){
            if(typeof(data) == "object"){
                  // 进行纯拷贝操作
                  if(cell.getIsCopy()){
				  		// 提供外部接口，需要外部转换该对象可见，不然不能进行拷贝操作
                        if(data.onDataBeforeExport){
                              data.onDataBeforeExport();
                        }
                        _cell = _sheet.Cells(bounds.y, bounds.x);
                        this.copyDataToExcel(_sheet, _cell, data, curCellNum, cellNum);
                  }
                  else if(data.tagName == "TABLE"){
                        // 提供外部接口，需要外部转换该表格对象可见，不然不能正常设置其单元格的宽高
                        if(data.onDataBeforeExport){
                              data.onDataBeforeExport();
                        }
                        // 只能针对表格进行数据复制操作
                        this.tableDataToExcel(_sheet, cell, data, curCellNum, cellNum);
                  }
            }
            else{
				// 只针对纯文本信息的数据才能进行单元格合并
	            if(bounds.w > 1 || bounds.h > 1){
					_sheet.Range(_sheet.Cells(bounds.y, bounds.x), _sheet.Cells(bounds.y + bounds.h - 1, bounds.x + bounds.w - 1)).mergecells = true;
	            }
	            _cell = _sheet.Cells(bounds.y, bounds.x);
				_cell.HorizontalAlignment = cell.getHAlign();
				if(cell.getIsCopy()){
					if (window.clipboardData) {   
				        window.clipboardData.setData("Text",data);   
				    }else{     
				        var flashcopier = 'flashcopier';   
				        if(!$(flashcopier)) {   
				          var divholder = document.createElement('div');   
				          divholder.id = flashcopier;   
				          document.body.appendChild(divholder);   
				        }   
				        document.getElementById(flashcopier).innerHTML = '';   
				        var divinfo = '<embed src="clipboard.swf" FlashVars="clipboard='+encodeURIComponent(data)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';   
				        document.getElementById(flashcopier).innerHTML = divinfo;
				    }
					
            		_cell.activate();
           			_sheet.paste();
				}else{
					  if(cell.isString()){
	                  	_cell.value = ""+data;
					  }else{
					  	_cell.value = ""+data;
					  }
				}
            }
      }
}
;
ExcelApp.prototype.copyDataToExcel = function(_sheet, _cell, data){
      try{
            var sel = document.body.createTextRange();
            sel.moveToElementText(data);
            sel.select();
            sel.execCommand("copy");
            _cell.activate();
            _sheet.paste();
      }
      catch(e){
            window.status = e;
      }
}
;
ExcelApp.prototype.tableDataToExcel = function(_sheet, cell, data, curCellNum, cellNum){
      var x = cell.getBounds().x, y = cell.getBounds().y;
      var _cell;

      var isDataVisible = this.isNodeDisplay(data);

      var tbodys = data.childNodes;
      var tbNum = tbodys.length, trNum, tdNum;
      var trs , tds ;
      var tbody, tr, td;
      var cellX, cellY, cellW, cellH;
      var cellSize;
      var temp;

      var curTotalProgress = 100 / cellNum;
      var curTbodyTotalProgress = curTotalProgress / tbNum;
      var curTrTotalProgress;
      var curProgress = curCellNum * curTotalProgress;

      var useRecord = {};
      var hasSetColumnWidthArr = {};
      var range;
      cellY = y;
      var rowHeight;
      var colTypeArr = [];      
      for(var i = 0; i < tbNum; i ++ ){
            tbody = tbodys[i];
            trs = tbody.childNodes;
            trNum = trs.length;

            curTrTotalProgress = curTbodyTotalProgress / trNum;
            for(var j = 0; j < trNum ; j ++){
                  tr = trs[j];
                  if(tr.tagName == "COL"){
                	  continue;
                  }
                  cellY ++ ;
                  
                  tds = tr.childNodes;
                  tdNum = tds.length;

                  for(var k = 0; k < tdNum; k ++ ){
                        td = tds[k];
                        if(td.columnType != null){
                        	colTypeArr[k] = td.columnType;
                        }
                        cellX = x + this.getAvaliableX(useRecord, cellY - y);
                        cellSize = this.getSize(td);
                        cellW = cellSize.w;
                        cellH = cellSize.h;

                        if(cellW > 1 || cellH > 1){
                              range = _sheet.Range(_sheet.Cells(cellY, cellX), _sheet.Cells(cellY + cellH - 1, cellX + cellW - 1));
                              range.mergecells = true;
                        }

                        _cell = _sheet.Cells(cellY, cellX);
						/*
						try{
							var color = this.getNodeColor(td,"backgroundColor");
							if(color != null){
	                        	_cell.Interior.Color = color;
							}
							color = this.getNodeColor(td,"foreColor");
							if(color != null){
	                        	_cell.Interior.ForeColor  = color;
							}
						}catch(e){}
						*/
                        _cell.HorizontalAlignment = this.getNodeHorizontalAlignment(td);
                        if(colTypeArr[k] == "number"){
                        	_cell.value = td.innerText;
                        }else{
                        	_cell.value = ""+td.innerText;
                        }

                        // 设定柱宽,行高
                        for(var col = cellX, c = 0;isDataVisible && c < cellW;c ++ , col ++ ){
                        	if(hasSetColumnWidthArr[col]==null){
                              	_sheet.columns.item(col).columnwidth = Math.round(td.offsetWidth / cellW / 10) + 2;
                              	if(cellW == 1){
                              		hasSetColumnWidthArr[col] = "";
                              	}
                            }
                        }
                        rowHeight = Math.round(td.offsetHeight / cellH ) + 2;
                        if(_sheet.rows.item(cellY).rowheight < rowHeight){
                        	_sheet.rows.item(cellY).rowheight = rowHeight;
                        } 
                        // 标识单元格是否已被使用
                        for(var row = cellY - y, r = 0; r < cellH; r ++ , row ++ ){
                              for(var col = cellX - x, c = 0; c < cellW; c ++ , col ++ ){
                                    useRecord[col + "," + row] = "";
                              }
                        }
                  }

                  curProgress += curTrTotalProgress;
                  this.updateProgress("Export[" + _sheet.name + "] " + Math.round(curProgress) + "%", 0);
            }
      }
}
;
ExcelApp.prototype.isNodeDisplay = function(node){
      while(node != null){
            if(node.style != null && node.style.display == "none"){
                  return false;
            }
            node = node.parentNode;
      }
      return true;
}
;
ExcelApp.prototype.getNodeHorizontalAlignment = function(node){
      var hAlign = node.currentStyle["textAlign"];
      if(hAlign == "center"){
            return 3;
      }
      else if(hAlign == "right"){
            return 4;
      }
      else{
            return 2;
      }
}
;
ExcelApp.prototype.getNodeColor = function(node,styleName){
      var value = null;
      while(node != null && (value == null || value == "" || value == "transparent")){
            value = node.currentStyle[styleName];
            node = node.parentNode;
      }
	  
	  if(value != null && value != "" && value.indexOf("#") < 0){
		  switch(value){
		  	case "red":
				value = "#FF0000";
			break;
		  	case "green":
				value = "#00FF00";
			break;
		  	case "blue":
				value = "#0000FF";
			break;
		  	case "yellow":
				value = "#FFFF00";
			break;
		  	case "white":
				value = "#FFFFFF";
			break;
			case "gray":
				value = "#808080";
			break;
		  	case "black":
				value = "#000000";
			break;
		  	case "cyan":
				value = "#00FFFF";
			break;
		  	case "purple":
				value = "#FF00FF";
			break;
			case "transparent":
				value = null;
			break;
		  }
		  
	      if(value != null && value.indexOf("#") >= 0){
		  	value = parseInt(value.substring(1),16);
		  }else{
		  	value = null;
		  }
	  }
      return value;
}
;
ExcelApp.prototype.getAvaliableX = function(useRecord, y){
      var x = 0;

      var node = useRecord[x + "," + y];
      while(node != null){
            x ++ ;
            node = useRecord[x + "," + y];
      }

      return x;
}
;
ExcelApp.prototype.getSize = function(td){
      var size = {
      }
      ;

      var temp = td.colSpan;
      if(temp == null){
            size.w = 1;
      }
      else{
            size.w = parseInt(temp);
      }
      temp = td.rowSpan;
      if(temp == null){
            size.h = 1;
      }
      else{
            size.h = parseInt(temp);
      }

      return size;
}
;

ExcelApp.prototype._openExcel = function(){
      if(this._excelApp != null){
            return this._excelApp;
      }
      try{
            this._excelApp = new ActiveXObject("Excel.Application");
      }
      catch(e){
            //alert("请先安装Excel。如已安装，请开启Activex的权限。");
            alert("pls install excel firstly.if installed,pls enable activex access.");
            return null;
      }

      return this._excelApp;
}
;
ExcelApp.prototype._closeExcel = function(){
      if(this._excelApp != null){
            this._excelApp.quit();
            this._excelApp = null;
      }
}
;

// excel workbook的属性和方法
ExcelWorkBook.prototype.initialize = function(excelApp, bookName){
      this.excelApp = excelApp;
      this.name = bookName;
      this.sheets = [];
}
;
ExcelWorkBook.prototype.addSheet = function(sheetName){
      var newSheet = new ExcelSheet(this, sheetName);

      this.sheets[this.sheets.length] = newSheet;

      return newSheet;
}
;

// excel sheet的属性和方法
ExcelSheet.prototype.initialize = function(excelWorkBook, name){
      this.excelWorkBook = excelWorkBook;
      this.name = name;
      this.cells = [];
}
;
ExcelSheet.prototype.addCell = function(data, isCopy){
      var newCell = new ExcelCell(this, data, isCopy);

      this.cells[this.cells.length] = newCell;

      return newCell;
}
;

ExcelSheet.prototype.setStrRange = function(row,col){
	this.strRange = "A1:"+String.fromCharCode(col+64)+""+row;
};

// excel cell的属性和方法
ExcelCell.LEFT_ALIGN = 2;
ExcelCell.CENTER_ALIGN = 3;
ExcelCell.RIGHT_ALIGN = 4;
ExcelCell.prototype.initialize = function(excelSheet, data, isCopy){
      this.excelSheet = excelSheet;
      this.bounds = {
            x : 1, y : 1, w : 1, h : 1
      };
	  this.isStr = true;
      this.data = data;
      if(isCopy == null){
            this.isCopy = false;
      }
      else{
            this.isCopy = isCopy;
      }
	  this.hAlign = 1;
}
;
ExcelCell.prototype.isString = function(){
	return this.isStr;
};
ExcelCell.prototype.setData = function(data){
      this.data = data;
}
;
ExcelCell.prototype.setIsStr = function(isStr){
	  this.isStr = !!isStr;
};
ExcelCell.prototype.getData = function(){
      return this.data;
}
;
ExcelCell.prototype.setHAlign = function(hAlign){
	this.hAlign = hAlign;
};
ExcelCell.prototype.getHAlign = function(){
	return this.hAlign;
};
ExcelCell.prototype.setIsCopy = function(isCopy){
      this.isCopy = isCopy;
}
;
ExcelCell.prototype.getIsCopy = function(){
      return this.isCopy;
}
;
ExcelCell.prototype.setLocation = function(x, y){
      this.bounds.x = x;
      this.bounds.y = y;
}
;
ExcelCell.prototype.setBounds = function(x, y, w, h){
      this.bounds.x = x;
      this.bounds.y = y;
      this.bounds.w = w;
      this.bounds.h = h;
}
;
ExcelCell.prototype.getBounds = function(){
      return this.bounds;
}
;