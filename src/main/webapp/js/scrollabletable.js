var container = new Array();
var onResizeHandler;
var doc;

function scrollbarWidth(){
    var w;

    if (! doc.body.currentStyle)   doc.body.currentStyle = doc.body.style;

    if (doc.body.currentStyle.overflowY == 'visible' || doc.body.currentStyle.overflowY == 'scroll'){
        w = doc.body.offsetWidth - doc.body.clientLeft - doc.body.clientWidth;
    }else{
        win = window.open("about:blank", "_blank", "top=0,left=0,width=100,height=100,scrollbars=yes");
        win.doc.writeln('scrollbar');
        w = win.doc.body.offsetWidth - win.doc.body.clientLeft - win.doc.body.clientWidth ;
        win.close();
    }

    return w;
}

function getActualWidth(e){
    if (! e.currentStyle)   e.currentStyle = e.style;

    return  e.clientWidth - parseInt(e.currentStyle.paddingLeft) - parseInt(e.currentStyle.paddingRight);
}

function findRowWidth(r){
    for (var i=0; i < r.length; i++){
        r[i].actualWidth = getActualWidth(r[i]);
    }
}

function setRowWidth(r){
    for (var i=0; i < r.length; i++){
        r[i].width = r[i].actualWidth;
        r[i].innerHTML = '<span style="width:' + r[i].actualWidth + ';">' + r[i].innerHTML + '</span>';
    }
}

function fixTableWidth(tbl){
    for (var i=0; i < tbl.tHead.rows.length; i++)   findRowWidth(tbl.tHead.rows[i].cells);
    findRowWidth(tbl.tBodies[0].rows[0].cells);
    if (tbl.tFoot)  for (var i=0; i < tbl.tFoot.rows.length; i++)   findRowWidth(tbl.tFoot.rows[i].cells);

    //tbl.width = '';

    for (var i=0; i < tbl.tHead.rows.length; i++)   setRowWidth(tbl.tHead.rows[i].cells);
    setRowWidth(tbl.tBodies[0].rows[0].cells);
    if (tbl.tFoot)  for (var i=0; i < tbl.tFoot.rows.length; i++)   setRowWidth(tbl.tFoot.rows[i].cells);
}

function makeScrollableTable(tbl,scrollFooter,height,doc1,scDir){
    var c, pNode, hdr, ftr, wrapper, rect;
    doc=doc1;

    if (typeof tbl == 'string') tbl = doc.getElementById(tbl);

    pNode = tbl.parentNode;
    fixTableWidth(tbl);

    c = container.length;
    if(scDir=='left')
    container[c] = doc.createElement('<SPAN style="height: 100; overflow-x: hidden; overflow-y: scroll;"  dir="rtl">');
    else container[c] = doc.createElement('<SPAN style="height: 100; overflow-x: hidden; overflow-y: scroll;" >');
	tbl.dir="ltr";
    container[c].id = tbl.id + "Container";
    pNode.insertBefore(container[c], tbl);
    container[c].appendChild(tbl);
    container[c].style.width = tbl.clientWidth + 2 * tbl.clientLeft + scrollbarWidth();

    hdr = tbl.cloneNode(false);
    hdr.id += 'Header';
    hdr.appendChild(tbl.tHead.cloneNode(true));
    tbl.tHead.style.display = 'none';
    if (!scrollFooter || !tbl.tFoot){
        ftr = doc.createElement('<SPAN style="width:1;height:1;clip: rect(0 1 1 0);background-color:transparent;">');
        ftr.id = tbl.id + 'Footer';
        ftr.style.border = tbl.style.border;
        ftr.style.width = getActualWidth(tbl) + 2 * tbl.clientLeft;
        ftr.style.borderBottom = ftr.style.borderLeft = ftr.style.borderRight = 'none';
    }else{
        ftr = tbl.cloneNode(false);
        ftr.id += 'Footer';
        ftr.appendChild(tbl.tFoot.cloneNode(true));
        ftr.style.borderTop = 'none';
        tbl.tFoot.style.display = 'none';
    }

    wrapper = doc.createElement('<table border=0 cellspacing=0 cellpadding=0>');
    wrapper.id = tbl.id + 'Wrapper';
    pNode.insertBefore(wrapper, container[c]);
    
    if(scDir=='left')
    {
	    var tmp = doc.createElement('<table border=0 cellspacing=0 cellpadding=0>');
	    tmp.insertRow(0).insertCell(0).appendChild(hdr);
	    tmp.rows[0].insertCell(0).insertAdjacentText("afterBegin"," ");
	    tmp.rows[0].cells[0].width=17;
	    
	    wrapper.insertRow(0).insertCell(0).appendChild(tmp);
    }
    else wrapper.insertRow(0).insertCell(0).appendChild(hdr);
    wrapper.insertRow(1).insertCell(0).appendChild(container[c]);
    wrapper.insertRow(2).insertCell(0).appendChild(ftr);

    wrapper.align = tbl.align;
    tbl.align = hdr.align = ftr.align = 'left';
    hdr.style.borderBottom = 'none';
    tbl.style.borderTop = tbl.style.borderBottom = 'none';

    // adjust page size
    if (c == 0 && height == 'auto'){
        onResizeAdjustTable();
        onResizeHandler = window.onresize;
        window.onresize = onResizeAdjustTable;
    }else{
        container[c].style.height = height;
    }
}

function onResizeAdjustTable(){
    if (onResizeHandler) onResizeHandler();

    var rect = container[0].getClientRects()(0);
    var h = doc.body.clientHeight - (rect.top + (doc.body.scrollHeight - rect.bottom));
    container[0].style.height = (h > 0) ? h : 1;
}

function printPage(){
    var tbs = doc.getElementsByTagName('TABLE');
    var e;

    for (var i=0; i < container.length; i++)    container[i].style.overflow = '';

    window.print();

    for (var i=0; i < container.length; i++)    container[i].style.overflow = 'auto';
}