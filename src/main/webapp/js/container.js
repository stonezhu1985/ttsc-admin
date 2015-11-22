/**
 * 以key的方式存储数据.key只支持字符串格式.如果给其它数据类型的key，将被自动转为字符串格式。
 * 支持方法：
 * size()、put(key,value)、remove(key)、get(key)、keys()、clear();
 */
var HashTable = Class.create("com.fleety.HashTable");

HashTable.prototype.initialize = function(){
	this.container = {};
	this.keySet = [];
};

HashTable.prototype.size = function(){
	return this.keySet.length;
};

HashTable.prototype.put = function(key,value){
	if(key == null || value == null){
		return false;
	}
	key = key + "";
	
	var oldValue = this.container[key];
	if(oldValue == null){
		this.keySet[this.keySet.length] = key;
	}
	this.container[key] = value;
	
	return oldValue;
};

HashTable.prototype.remove = function(key){
	if(key == null){
		return null;
	}
	key = key + "";
	
	var value = this.container[key];
	this.container[key] = null;
	if(value != null){
		var len = this.keySet.length;
		for(var i =0;i<len;i++){
			if(this.keySet[i] == key){
				this.keySet.splice(i,1);
				break;
			}
		}
	}
	
	return value;
};

HashTable.prototype.get = function(key){
	if(key == null){
		return null;
	}
	key = key + "";
	
	return this.container[key];
};

HashTable.prototype.keys = function(){
	return this.keySet;
};

HashTable.prototype.clear = function(){
	this.container = {};
	this.keySet.length = 0;
};

/**
 * 数组容器，存放信息对象
 * 支持方法：
 * size()、add(obj)、remove(obj)、removeByIndex(index)、get(index)、clear();
 */
var Vector = Class.create("com.fleety.Vector");

Vector.prototype.initialize = function(){
	this.container = [];
};

Vector.prototype.size = function(){
	return this.container.length;
};

Vector.prototype.add = function(obj){
	if(obj == null){
		return ;
	}
	this.container[this.container.length] = obj;
};

Vector.prototype.remove = function(obj){
	if(obj == null){
		return null;
	}
	var len = this.container.length;
	for(var i =0;i<len;i++){
		if(this.container[i] == obj){
			this.container.splice(i,1);
			return obj;
		}
	}
	return null;
};

Vector.prototype.removeByIndex = function(index){
	var _index;
	try{
		_index = parseInt(index);
	}catch(e){
		return null;
	}
	
	if(_index < 0 || _index >= this.container.length){
		return null;
	}
	
	var obj = this.container[_index];
	this.container.splice(_index,1);
	
	return obj;
};

Vector.prototype.get = function(index){
	var _index;
	try{
		_index = parseInt(index);
	}catch(e){
		return null;
	}
	
	if(_index < 0 || _index >= this.container.length){
		return null;
	}
	
	return this.container[_index];
};

Vector.prototype.toArray = function(){
	return this.container;
};

Vector.prototype.clear = function(){
	this.container.length = 0;
};