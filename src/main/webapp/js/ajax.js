function AjaxRequest(URL, callback, method) {
	this.URL = "";
	this.method = "GET";
	this.async = true;
	this.callback = function (xmlObj) {
	};
	var xmlHttpRequest;
	var objSelf = this;
	if (URL) {
		this.URL = URL;
	}
	if (callback) {
		this.callback = callback;
	}
	if (method) {
		this.method = method;
	}
	if (window.XMLHttpRequest) { // Non-IE browser
		xmlHttpRequest = new XMLHttpRequest();
	} else {
		if (window.ActiveXObject) { // IE
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	xmlHttpRequest.onreadystatechange = function () {
		if (xmlHttpRequest.readyState == 4) { //server complete
			if (xmlHttpRequest.status == 200) { // OK response
				objSelf.callback(xmlHttpRequest);
			} else {
				alert("XMLHttpRequest problem: " + xmlHttpRequest.statusText);
			}
		}
	};
	this.send = function () {
		if (!this.method || !this.URL || !this.async) {
			return;
		}
		try {
			xmlHttpRequest.open(this.method, this.URL, this.async);
			xmlHttpRequest.send();
		}
		catch (e) {
			alert("XMLHttpRequest problem: " + e);
		}
	};
}

