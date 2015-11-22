//获取一个月前日期
function preOneMonthDate(){
	var now = new Date();
	now.setMonth(now.getMonth()-1);   
	var yyyy = now.getYear();
	if (yyyy < 10) {
		yyyy = "0" + yyyy;
	}
	var mm = now.getMonth()+1;
	if (mm < 10) {
		mm = "0" + mm;
	}
	var dd = now.getDate();
	if (dd < 10) {
		dd = "0" + dd;
	}
	var date = yyyy + "-" + mm + "-" + dd;
	return date;	
};
//获取一周前日期
function preOneWeekDate(){
	var now = new Date();
	now.setDate(now.getDate()-7);   
	var yyyy = now.getYear();
	if (yyyy < 10) {
		yyyy = "0" + yyyy;
	}
	var mm = now.getMonth()+1;
	if (mm < 10) {
		mm = "0" + mm;
	}
	var dd = now.getDate();
	if (dd < 10) {
		dd = "0" + dd;
	}
	var date = yyyy + "-" + mm + "-" + dd;
	return date;
};
//获取一日前日期
function preOneDayDate(){
	var now = new Date();
	now.setDate(now.getDate()-1);   
	var yyyy = now.getYear();
	if (yyyy < 10) {
		yyyy = "0" + yyyy;
	}
	var mm = now.getMonth()+1;
	if (mm < 10) {
		mm = "0" + mm;
	}
	var dd = now.getDate();
	if (dd < 10) {
		dd = "0" + dd;
	}
	var date = yyyy + "-" + mm + "-" + dd;
	return date;
};
//获取一年前日期
function preOneYearDate(){
	var now = new Date();
	now.setYear(now.getYear()-1);   
	var yyyy = now.getYear();
	if (yyyy < 10) {
		yyyy = "0" + yyyy;
	}
	var mm = now.getMonth()+1;
	if (mm < 10) {
		mm = "0" + mm;
	}
	var dd = now.getDate();
	if (dd < 10) {
		dd = "0" + dd;
	}
	var date = yyyy + "-" + mm + "-" + dd;
	return date;
};

//获取明天日期
function nextDate() {
	var now = new Date();
	now.setDate(now.getDate()+1);
	var yyyy = now.getYear();
	if (yyyy < 10) {
		yyyy = "0" + yyyy;
	}
	var mm = now.getMonth()+1;
	if (mm < 10) {
		mm = "0" + mm;
	}
	var dd = now.getDate();
	if (dd < 10) {
		dd = "0" + dd;
	}
	var date = yyyy + "-" + mm + "-" + dd;
	return date;
}
//获取当前日期
function currentDate() {
	var now = new Date();
	var yyyy = now.getYear();
	if (yyyy < 10) {
		yyyy = "0" + yyyy;
	}
	var mm = now.getMonth()+1;
	if (mm < 10) {
		mm = "0" + mm;
	}
	var dd = now.getDate();
	if (dd < 10) {
		dd = "0" + dd;
	}
	var date = yyyy + "-" + mm + "-" + dd;
	return date;
}
//获取当前时间
function currentTime() {
	var now = new Date();
	var hh = now.getHours();
	if (hh < 10) {
		hh = "0" + hh;
	}
	var mm = now.getMinutes();
	if (mm < 10) {
		mm = "0" + mm;
	}
	var ss = now.getSeconds();
	if (ss < 10) {
		ss = "0" + ss;
	}
	var time = hh + ":" + mm + ":" + ss;
	return time;
}
//获取当前时间到小时
function currentTimeHH() {
	var curDate=currentDate();
	var now = new Date();
	var hh = now.getHours();
	if (hh < 10) {
		hh = "0" + hh;
	}
	var time = curDate+" "+hh;
	return time;
}