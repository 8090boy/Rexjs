var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value = 88){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
	}
}

var names = [
	"0.1",
	"string",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"get",
	"set",
	parseInt(1010, 2),
	parseInt(1010, 8),
	parseInt(11, 2),
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}