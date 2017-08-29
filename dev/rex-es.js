new function(
	Rexjs,
	// 内容提取相关
	ContentBuilder,
	// 表达式相关
	Expression, ListExpression, EmptyExpression, DefaultExpression, PartnerExpression, LeftHandSideExpression,
	// ECMAScript 相关
	ECMAScriptStatement, BoxStatement, ECMAScriptErrors, ECMAScriptOrders, ECMAScriptConfig,
	// 标签相关类
	SyntaxTag, TagType,
	// 标签分类相关
	CLASS_STATEMENT_BEGIN, CLASS_STATEMENT_END, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT,
	// 标签类型相关
	TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE, TYPE_ILLEGAL,
	// 表达式状态相关
	STATE_STATEMENT_ENDABLE, STATE_STATEMENT_END, STATE_STATEMENT_ENDED,
	// 其他常量
	IDENTIFIER_REGEXP_SOURCE
){
"use strict";


eval(
									function(){
										//ECMAScript 辅助类
~function(){

this.ECMAScriptErrors = ECMAScriptErrors = function(REGEXP){
	/**
	 * 错误信息
	 */
	function ECMAScriptErrors(){};
	ECMAScriptErrors = new Rexjs(ECMAScriptErrors);

	ECMAScriptErrors.static({
		ASSIGNMENT: "Invalid left-hand side in assignment",
		CALL: "Missing ) after argument list",
		CONST: "Assignment to constant variable",
		CONSTRUCTOR: "Class constructor may not be ${1}",
		DEFAULT_CLAUSE: "More than one default clause in switch statement",
		DUPLICATE_PARAMETER_NAME: "Duplicate parameter name not allowed in this context",
		EXPORT_DEFAULT: "Default member has already been exported",
		FOR: "Invalid left-hand side in for-loop",
		FOR_IN: "Invalid left-hand side in for-in loop: Must have a single binding",
		GETTER: "Getter must not have any formal parameters",
		ILLEGAL_STATEMENT: "Illegal ${1} statement",
		KEYWORD: '"${1}" keyword unexpected here',
		LABEL: 'Undefined ${1} label "${2}"',
		MISSING_INITIALIZER: "Missing initializer in const declaration",
		NEWLINE: "Illegal newline",
		NEWLINE_AFTER_THROW: "Illegal newline after throw",
		NEWLINE_BEFORE_ARROW: "Illegal newline before arrow",
		PREFIX_OPERATION: "Invalid left-hand side expression in prefix operation",
		POSTFIX_OPERATION: "Invalid left-hand side expression in postfix operation",
		REDECLARATION: 'Identifier "${1}" has already been declared',
		REGEXP_FLAGS: "Invalid regular expression flags",
		REST_ELEMENT: "Rest element must be last element",
		REST_PARAMETER: "Rest parameter must be last formal parameter",
		SETTER: "Setter must have exactly one formal parameter",
		SUPER_CALL: "Super call may not in class constructor",
		SUPER_CALL_UNEXTEND: "No any super to call",
		SUPER_RECALL: "Super may be called in this class constructor",
		TARGET: "new.target expression is not allowed here",
		TEMPLATE: "Unterminated template literal",
		TRY: "Missing catch or finally after try",
		WITH: "The code may not include a with statement",
		WITHOUT_SUPER_CALL: "Missing super call in this class constructor",
		/**
		 * 将错误信息模板里的参数进行替换，并返回结果
		 * @param {String} type - 错误信息类型
		 * @param {String} _args - 需要替换的参数
		 */
		template: function(type){
			var args = arguments;

			return this[type].replace(
				REGEXP,
				function(result, index){
					return args[index];
				}
			);
		}
	});

	return ECMAScriptErrors;
}(
	// REGEXP
	/\$\{(\d+)\}/g
);

this.ECMAScriptOrders = ECMAScriptOrders = function(){
	/**
	 * 标签优先级顺序
	 */
	function ECMAScriptOrders(){};
	ECMAScriptOrders = new Rexjs(ECMAScriptOrders);

	ECMAScriptOrders.static({
		NUMBER: 100,
		OPEN_ARROW_FUNCTION_BODY: 100,
		OPEN_BRACKET_ACCESSOR: 100,
		OPEN_CALL: 100,
		SPECIAL_LINE_TERMINATOR: 100,
		STATEMENT_END: 100,
		DOT_ACCESSOR: 101,
		EXPRESSION_BREAK: 101,
		MATHEMATICAL_NUMBER: 101,
		SPREAD: 101,
		BINARY: 200,
		NEGATION_SIBLING: 200,
		PLUS_SIBLING: 200,
		ARROW: 201,
		GREATER_THAN_OR_EQUAL: 201,
		LEFT_SHIFT: 201,
		LESS_THAN_OR_EQUAL: 201,
		LOGICAL_AND: 201,
		LOGICAL_OR: 201,
		RIGHT_SHIFT: 201,
		EQUALITY: 202,
		EXPONENTIATION: 202,
		UNARY_ASSIGNMENT: 202,
		INEQUALITY: 202,
		UNSIGNED_RIGHT_SHIFT: 202,
		IDENTITY: 203,
		NONIDENTITY: 203,
		DESTRUCTURING_ASSIGNMENT: 203,
		POSTFIX_UNARY_ASSIGNMENT: 203,
		SHORTHAND_ASSIGNMENT: 203,
		ILLEGAL_SHORTHAND_ASSIGNMENT: 204,
		IDENTIFIER: 300,
		TARGET: 301,
		VARIABLE: 301,
		KEYWORD_PROPERTY_NAME: 301,
		FUNCTION_VARIABLE: 302,
		IDENTIFIER_PROPERTY_NAME: 302,
		WORD_PROPERTY_NAME: 303,
		STATIC_MODIFIER: 303,
		COMMENT: 400,
		OPEN_RESTRICTED_COMMENT: 401,
		COMMENT_CONTENT: 402,
		ILLEGAL_LINE_TERMINATOR: 403,
		TEMPLATE_CONTENT: 500,
		TEMPLATE_PARAMETER: 501,
		TEMPLATE_SPECIAL_CONTENT: 501,
		FILE_START: 600
	});

	return ECMAScriptOrders;
}();

this.ECMAScriptConfig = ECMAScriptConfig = function(SyntaxConfig){
	/**
	 * ECMAScript 语法配置
	 * @param {String} name - 配置名称
	 * @param {String} version - 配置相关版本
	 */
	function ECMAScriptConfig(name, version){
		SyntaxConfig.call(this, name, version);
	};
	ECMAScriptConfig = new Rexjs(ECMAScriptConfig, SyntaxConfig);

	ECMAScriptConfig.static({
		/**
		 * 添加 es6 基础配置信息
		 * @param {String} name - 配置名称
		 */
		addBaseConfig: function(name){
			return this.add(name, "es6-base");
		},
		/**
		 * 添加 es6 模块配置信息
		 * @param {String} name - 配置名称
		 */
		addModuleConfig: function(name){
			return this.add(name, "es6-module");
		},
		/**
		 * 添加 Rexjs 配置信息
		 * @param {String} name - 配置名称
		 */
		addRexjsConfig: function(name){
			return this.add(name, "rexjs");
		}
	});
	
	return ECMAScriptConfig;
}(
	Rexjs.SyntaxConfig
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-helper.js"
								);


eval(
									function(){
										// 公用的表达式
~function(){

this.AssignableExpression = function(){
	/**
	 * 可赋值的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AssignableExpression(context){
		Expression.call(this, context);
	};
	AssignableExpression = new Rexjs(AssignableExpression, Expression);

	return AssignableExpression;
}();

this.ConditionalExpression = function(){
	/**
	 * 带条件的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConditionalExpression(context){
		Expression.call(this, context);
	};
	ConditionalExpression = new Rexjs(ConditionalExpression, Expression);

	ConditionalExpression.props({
		condition: null
	});

	return ConditionalExpression;
}();

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/common-expression.js"
								);


eval(
									function(){
										// 语句相关
~function(){

this.ECMAScriptStatement = ECMAScriptStatement = function(Statement){
	/**
	 * ECMAScript 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ECMAScriptStatement(statements){
		Statement.call(this, statements);
	};
	ECMAScriptStatement = new Rexjs(ECMAScriptStatement, Statement);

	return ECMAScriptStatement;
}(
	Rexjs.Statement
);

this.BoxStatement = BoxStatement = function(){
	/**
	 * 盒子语句，一般用于重写时，“过渡” 或 “连接” 父子语句，使其 “达到” 或 “模拟” 之前重写前的效果
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BoxStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BoxStatement = new Rexjs(BoxStatement, ECMAScriptStatement);

	BoxStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 返回 try 方法调用结果
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出语句
			this.out();
			return null;
		}
	});

	return BoxStatement;
}();

this.ConditionStatement = function(){
	/**
	 * 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ConditionStatement = new Rexjs(ConditionStatement, ECMAScriptStatement);
	
	ConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出该语句并设置条件表达式的 inner
			this.out().condition.inner = this.expression;
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.condition.context.tag;
		}
	});
	
	return ConditionStatement;
}();

this.SingleStatement = function(){
	/**
	 * 单语句，即与上下文无关的语句，一般用于 if、for、while 等等语句的主体
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SingleStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SingleStatement = new Rexjs(SingleStatement, ECMAScriptStatement);
	
	SingleStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			switch(false){
				// 如果不是分号
				case context.content === ";":
					break;

				// 如果分号不是标识着语句结束
				case context.tag.class.statementEnd:
					break;

				// 如果当前表达式已经标识着语句结束
				case (this.expression.state & STATE_STATEMENT_END) !== STATE_STATEMENT_END:
					break;

				default:
					// 返回该分号标签
					return context.tag;
			}

			// 请求跳出该语句
			return this.requestOut(parser, context);
		},
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(){
			return null;
		}
	});

	return SingleStatement;
}();

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-statement.js"
								);


eval(
									function(){
										// 语句块相关
~function(Statements){

this.ECMAScriptVariableCollections = function(VariableCollections, VariableCollection){
	/**
	 * 变量名收集器集合
	 * @param {VariableIndex} index - 变量名索引
	 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
	 */
	function ECMAScriptVariableCollections(index, _prevCollections){
		VariableCollections.call(this, index);

		this.initBlackList(_prevCollections);
		this.initConst(_prevCollections);
		this.initDeclaration(_prevCollections);
		this.initRex(_prevCollections);
	};
	ECMAScriptVariableCollections = new Rexjs(ECMAScriptVariableCollections, VariableCollections);

	ECMAScriptVariableCollections.props({
		blacklist: null,
		const: null,
		declaration: null,
		/**
		 * 生成一个临时变量名，并记搜集到 rex 变量名集合中
		 */
		generate: function(){
			var variable = this.provide();

			this.rex.collect(variable);
			return variable;
		},
		/**
		 * 初始化黑名单变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initBlackList: function(){
			this.blacklist = new VariableCollection();
		},
		/**
		 * 初始化常量变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initConst: function(){
			this.const = new VariableCollection();
		},
		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initDeclaration: function(){
			this.declaration = new VariableCollection();
		},
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(){
			this.rex = new VariableCollection();
		},
		rex: null
	});

	return ECMAScriptVariableCollections;
}(
	Rexjs.VariableCollections,
	Rexjs.VariableCollection
);

this.ECMAScriptStatements = function(ECMAScriptStatement, extractTo){
	/**
	 * ECMAScript 语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function ECMAScriptStatements(collections){
		Statements.call(this);

		// 初始化变量名集合
		this.collections = collections;
	};
	ECMAScriptStatements = new Rexjs(ECMAScriptStatements, Statements);

	ECMAScriptStatements.props({
		/**
		 * 获取当前所处闭包
		 */
		get closure(){
			return this.target.closure;
		},
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);

			return 0;
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			return this.applySuper(parser, context);
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(){
			// 什么也不做，即默认允许应用
		},
		collections: null,
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(contentBuilder){
			// 添加临时变量名
			contentBuilder.appendString(
				this.collections.rex.toString("var ", ",", ";")
			);
		},
		/**
		 * 提取语句块文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 插入变量名
			this.declareTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new ECMAScriptStatement(this);
		}
	});

	return ECMAScriptStatements;
}(
	this.ECMAScriptStatement,
	Statements.prototype.extractTo
);

this.GlobalStatements = function(ECMAScriptStatements, ECMAScriptVariableCollections, VariableIndex){
	/**
	 * 全局语句块
	 */
	function GlobalStatements(){
		ECMAScriptStatements.call(
			this,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	GlobalStatements = new Rexjs(GlobalStatements, ECMAScriptStatements);

	GlobalStatements.props({
		/**
		 * 获取当前所处闭包
		 */
		get closure(){
			return null;
		}
	});

	return GlobalStatements;
}(
	this.ECMAScriptStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

}.call(
	this,
	Rexjs.Statements
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-statements.js"
								);


eval(
									function(){
										// 一些 基类 或 独立的 标签
~function(RegExp){
	
this.AsTag = function(AsExpression){
	/**
	 * as 标签
	 * @param {Number} _type - 标签类型
	 */
	function AsTag(_type){
		SyntaxTag.call(this, _type);
	};
	AsTag = new Rexjs(AsTag, SyntaxTag);

	AsTag.props({
		regexp: /as/
	});

	return AsTag;
}(
	this.AsExpression
);

this.CloseBraceTag = function(){
	/**
	 * 结束大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseBraceTag = new Rexjs(CloseBraceTag, SyntaxTag);

	CloseBraceTag.props({
		regexp: /\}/
	});
	
	return CloseBraceTag;
}();

this.CloseBracketTag = function(){
	/**
	 * 结束中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseBracketTag = new Rexjs(CloseBracketTag, SyntaxTag);

	CloseBracketTag.props({
		regexp: /\]/
	});
	
	return CloseBracketTag;
}();

this.CloseParenTag = function(){
	/**
	 * 结束小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseParenTag = new Rexjs(CloseParenTag, SyntaxTag);

	CloseParenTag.props({
		regexp: /\)/
	});
	
	return CloseParenTag;
}();

this.CommentTag = function(){
	/**
	 * 注释标签
	 */
	function CommentTag(){
		SyntaxTag.call(this);
	};
	CommentTag = new Rexjs(CommentTag, SyntaxTag);

	CommentTag.props({
		$type: TYPE_MATCHABLE,
		order: ECMAScriptOrders.COMMENT
	});
	
	return CommentTag;
}();

this.DebuggerTag = function(){
	/**
	 * debugger 标签
	 * @param {Number} _type - 标签类型
	 */
	function DebuggerTag(_type){
		SyntaxTag.call(this, _type);
	};
	DebuggerTag = new Rexjs(DebuggerTag, SyntaxTag);
	
	DebuggerTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /debugger/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			statement.expression = new Expression(context);
		}
	});
	
	return DebuggerTag;
}();

this.DotTag = function(){
	/**
	 * 点标签
	 * @param {Number} _type - 标签类型
	 */
	function DotTag(_type){
		SyntaxTag.call(this, _type);
	};
	DotTag = new Rexjs(DotTag, SyntaxTag);
	
	DotTag.props({
		regexp: /\./
	});
	
	return DotTag;
}();

this.ExpressionSeparatorTag = function(){
	/**
	 * 表达式分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ExpressionSeparatorTag(_type){
		SyntaxTag.call(this, _type);
	};
	ExpressionSeparatorTag = new Rexjs(ExpressionSeparatorTag, SyntaxTag);

	ExpressionSeparatorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		$type: TYPE_MISTAKABLE
	});

	return ExpressionSeparatorTag;
}();

this.ModuleTag = function(FLOW_MAIN){
	/**
	 * 模块标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleTag(_type){
		SyntaxTag.call(this, _type);
	};
	ModuleTag = new Rexjs(ModuleTag, SyntaxTag);

	ModuleTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 收集该表达式所产生的变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} variable - 变量名标签上下文
		 */
		collectVariables: function(parser, variable){
			variable.tag.collectTo(parser, variable, parser.statements);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果当前语句有 target，说明不是最外层语句 或者 不是默认语句流
			if(statements.target !== null || statement.flow !== FLOW_MAIN){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
				);
			}
		}
	});

	return ModuleTag;
}(
	ECMAScriptStatement.FLOW_MAIN
);

this.OpenBraceTag = function(){
	/**
	 * 起始大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenBraceTag = new Rexjs(OpenBraceTag, SyntaxTag);

	OpenBraceTag.props({
		regexp: /\{/
	});
	
	return OpenBraceTag;
}();

this.OpenBracketTag = function(){
	/**
	 * 起始中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenBracketTag = new Rexjs(OpenBracketTag, SyntaxTag);

	OpenBracketTag.props({
		regexp: /\[/
	});
	
	return OpenBracketTag;
}();

this.OpenParenTag = function(){
	/**
	 * 起始小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenParenTag = new Rexjs(OpenParenTag, SyntaxTag);

	OpenParenTag.props({
		regexp: /\(/
	});
	
	return OpenParenTag;
}();

this.SemicolonTag = function(){
	/**
	 * 分号标签
	 * @param {Number} _type - 标签类型
	 */
	function SemicolonTag(_type){
		SyntaxTag.call(this, _type);
	};
	SemicolonTag = new Rexjs(SemicolonTag, SyntaxTag);
	
	SemicolonTag.props({
		regexp: /;/
	});
	
	return SemicolonTag;
}();

this.SpecialLineTerminatorTag = function(LineTerminatorTag){
	/**
	 * 特殊的行结束符标签
	 */
	function SpecialLineTerminatorTag(){
		LineTerminatorTag.call(this);
	};
	SpecialLineTerminatorTag = new Rexjs(SpecialLineTerminatorTag, LineTerminatorTag);
	
	SpecialLineTerminatorTag.props({
		order: ECMAScriptOrders.SPECIAL_LINE_TERMINATOR
	});
	
	return SpecialLineTerminatorTag;
}(
	Rexjs.LineTerminatorTag
);

this.WithTag = function(){
	/**
	 * with 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function WithTag(_type){
		SyntaxTag.call(this, _type);
	};
	WithTag = new Rexjs(WithTag, SyntaxTag);
	
	WithTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /with/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.WITH);
		}
	});
	
	return WithTag;
}();

}.call(
	this,
	RegExp
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/basic-tag.js"
								);


eval(
									function(){
										// 文件位置标签相关
~function(FilePositionTag){

this.FileStartTag = function(FileStartExpression){
	/**
	 * 文件起始符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileStartTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileStartTag = new Rexjs(FileStartTag, FilePositionTag);
	
	FileStartTag.props({
		order: ECMAScriptOrders.FILE_START,
		regexp: /^/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			statement.expression = new FileStartExpression(context);
		}
	});
	
	return FileStartTag;
}(
	Rexjs.FileStartExpression
);

this.FileEndTag = function(FileEndExpression, GlobalStatements){
	/**
	 * 文件结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileEndTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileEndTag = new Rexjs(FileEndTag, FilePositionTag);
	
	FileEndTag.props({
		regexp: /$/,
		throw: "end of input",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement, statements){
			switch(false){
				// 如果不是全局语句块，说明不是最外层
				case statements instanceof GlobalStatements:
					break;

				// 如果不是最后一个语句，则说明语句没有完全跳出
				case statement === statements[statements.length - 1]:
					break;

				// 如果存在表达式，说明解析有问题，因为该标签是语句起始标签，而又有上面两点保证，所以当前表达式必定为 null，为了 100% 确保，还是判断一下
				case statement.expression === null:
					break;

				default:
					// 设置当前表达式
					statement.expression = new FileEndExpression(context);
					
					// 终止解析
					parser.regexp.break();
					return;
			}

			// 报错
			parser.error(context);
		}
	});
	
	return FileEndTag;
}(
	Rexjs.FileEndExpression,
	this.GlobalStatements
);
	
}.call(
	this,
	Rexjs.FilePositionTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/file-position.js"
								);


eval(
									function(){
										// 字面量标签相关
~function(){

this.LiteralExpression = function(){
	/**
	 * 字面量表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LiteralExpression(context){
		Expression.call(this, context);
	};
	LiteralExpression = new Rexjs(LiteralExpression, Expression);
	
	return LiteralExpression;
}();

this.LiteralTag = function(LiteralExpression){
	/**
	 * 字面量标签，即用肉眼一眼就可以看出含义的标签
	 * @param {Number} _type - 标签类型
	 */
	function LiteralTag(_type){
		SyntaxTag.call(this, _type);
	};
	LiteralTag = new Rexjs(LiteralTag, SyntaxTag);
	
	LiteralTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new LiteralExpression(context);
		}
	})
	
	return LiteralTag;
}(
	this.LiteralExpression
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/literal-base.js"
								);


eval(
									function(){
										// 字面量子类标签相关
~function(LiteralTag){

this.BooleanTag = function(){
	/**
	 * 布尔标签
	 * @param {Number} _type - 标签类型
	 */
	function BooleanTag(_type){
		LiteralTag.call(this, _type);
	};
	BooleanTag = new Rexjs(BooleanTag, LiteralTag);
	
	BooleanTag.props({
		regexp: /true|false/
	});
	
	return BooleanTag;
}();

this.NullTag = function(){
	/**
	 * null 标签
	 * @param {Number} _type - 标签类型
	 */
	function NullTag(_type){
		LiteralTag.call(this, _type);
	};
	NullTag = new Rexjs(NullTag, LiteralTag);
	
	NullTag.props({
		regexp: /null/
	});
	
	return NullTag;
}();

this.ThisTag = function(visitor){
	/**
	 * this 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThisTag(_type){
		LiteralTag.call(this, _type);
	};
	ThisTag = new Rexjs(ThisTag, LiteralTag);
	
	ThisTag.props({
		regexp: /this/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前语句块申请应用 this 关键字
			statements.applyThis(parser, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ThisTag;
}(
	LiteralTag.prototype.visitor
);

this.RegExpTag = function(visitor){
	/**
	 * 未捕获的正则表达式标签
	 * @param {Number} _type - 标签类型
	 */
	function RegExpTag(_type){
		LiteralTag.call(this, _type);
	};
	RegExpTag = new Rexjs(RegExpTag, LiteralTag);
	
	RegExpTag.props({
		regexp : /\/(?:\\[^\r\n\u2028\u2029]|[^/\\\r\n\u2028\u2029]+)+\/(?:\w|\$)*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var i = 0, m = 0, g = 0, u = 0, y = 0, count = 0, content = context.content;
			
			// 遍历正则标记
			flags:
			for(var n = content.length - 1;n > -1;n--){
				// 判断当前标记
				switch(content[n]){
					case "/":
						break flags;

					case "i":
						count = ++i;
						break;
						
					case "m":
						count = ++m;
						break;
						
					case "g":
						count = ++g;
						break;
						
					case "u":
						count = ++u;
						break;
						
					case "y":
						count = ++y;
						break;
						
					default:
						count = 2;
						break;
				}
				
				// 如果对应标记出现过 2 次
				if(count > 1){
					// 报错
					parser.error(context, ECMAScriptErrors.REGEXP_FLAGS);
					return;
				}
			}
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return RegExpTag;
}(
	LiteralTag.prototype.visitor
);
	
this.NumberTag = function(){
	/**
	 * 数字标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberTag(_type){
		LiteralTag.call(this, _type);
	};
	NumberTag = new Rexjs(NumberTag, LiteralTag);
	
	NumberTag.props({
		// 防止与 DotTag 匹配冲突
		order: ECMAScriptOrders.NUMBER,
		regexp: /0[xX][0-9a-fA-F]+|0{2,}(?!\.)|(?:\d*\.\d+|\d+\.?)(?:e[+-]?\d+)?/,
		throw: "number"
	});
	
	return NumberTag;
}();

this.StringTag = function(){
	/**
	 * 字符串标签
	 * @param {Number} _type - 标签类型
	 */
	function StringTag(_type){
		LiteralTag.call(this, _type);
	};
	StringTag = new Rexjs(StringTag, LiteralTag);
	
	StringTag.props({
		regexp: /"(?:\\(?:[^\r]|\r\n?)|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\(?:[^\r]|\r\n?)|[^'\\\r\n\u2028\u2029]+)*'/,
		throw: "string"
	});
	
	return StringTag;
}();

}.call(
	this,
	this.LiteralTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/literal-inheritor.js"
								);


eval(
									function(){
										// 算数标签相关
~function(){

this.MathematicalNumberTag = function(NumberTag){
	/**
	 * 算数数字标签
	 * @param {Number} _type - 标签类型
	 */
	function MathematicalNumberTag(_type){
		NumberTag.call(this, _type);
	};
	MathematicalNumberTag = new Rexjs(MathematicalNumberTag, NumberTag);
	
	MathematicalNumberTag.props({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加字符串内容
			contentBuilder.appendString(
				// 如果要使用 parseInt 方法
				this.useParse() ?
					// 转换为指定基数的数字
					'(parseInt("' + content.substring(2) + '",' + this.radix + "))" :
					content
			);
		},
		order: ECMAScriptOrders.MATHEMATICAL_NUMBER,
		radix: "10",
		/**
		 * 是否使用 parseInt 方法进行转义
		 */
		useParse: function(){
			return true;
		}
	});
	
	return MathematicalNumberTag;
}(
	this.NumberTag
);

this.BinaryNumberTag = function(MathematicalNumberTag, config){
	/**
	 * 二进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	BinaryNumberTag = new Rexjs(BinaryNumberTag, MathematicalNumberTag);
	
	BinaryNumberTag.props({
		radix: "2",
		regexp: /0[bB][01]+/,
		/**
		 * 是否使用 parseInt 方法进行转义
		 */
		useParse: function(){
			return config.value;
		}
	});
	
	return BinaryNumberTag;
}(
	this.MathematicalNumberTag,
	// config
	ECMAScriptConfig.addBaseConfig("binaryNumber")
);

this.OctalNumberTag = function(MathematicalNumberTag, config){
	/**
	 * 八进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	OctalNumberTag = new Rexjs(OctalNumberTag, MathematicalNumberTag);
	
	OctalNumberTag.props({
		radix: "8",
		regexp: /0[oO][0-7]+/,
		/**
		 * 是否使用 parseInt 方法进行转义
		 */
		useParse: function(){
			return config.value;
		}
	});
	
	return OctalNumberTag;
}(
	this.MathematicalNumberTag,
	// config
	ECMAScriptConfig.addBaseConfig("octalNumber")
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/mathematical-number.js"
								);


eval(
									function(){
										// 标识符标签相关
~function(){

this.IdentifierExpression = function(AssignableExpression){
	/**
	 * 标识符表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function IdentifierExpression(context){
		AssignableExpression.call(this, context);
	};
	IdentifierExpression = new Rexjs(IdentifierExpression, AssignableExpression);

	return IdentifierExpression;
}(
	this.AssignableExpression
);

this.IdentifierTag = function(IdentifierExpression, RegExg, keywords, regexp){
	/**
	 * 标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierTag(_type){
		SyntaxTag.call(this, _type);
	};
	IdentifierTag = new Rexjs(IdentifierTag, SyntaxTag);
	
	IdentifierTag.static({
		/**
		 * 编译该标识符的表达式
		 * @param {String} exception - 会意外冲突的内容，则正则不会匹配到该内容
		 */
		compileRegExp: function(exception){
			return new RegExp(
				"(?:" +
					// 当 exception = "var"，匹配 var$、var_、vara、var中文 等情况
					"(?:" + exception + ")|" +
					// 当 exception = "var"，匹配 var1、var1_、var1$、var1中文 等情况
					"(?=(?:" + exception + ")\\d+)|" +
					// 匹配 abc、_abc、$abc、中文abc 等情况
					"(?!" + exception + ")" +
				")" +
				IDENTIFIER_REGEXP_SOURCE
			);
		},
		/**
		 * 获取所有关键字
		 */
		get keywords(){
			return keywords;
		},
		/**
		 * 设置所有关键字，并根据关键字重新编译该类的正则表达式
		 * @param {Array} value - 包含所有关键字的数组
		 */
		set keywords(value){
			// 记录值
			keywords = value;
			
			// 生成表达式
			regexp = this.compileRegExp(
				keywords.join("|")
			);
		}
	});

	IdentifierTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 判断变量名，是否已被指定收集器收集，如果已被收集则报错
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collected: function(parser, context, statements){
			var content = context.content;

			do {
				// 如果已被收集
				if(this.containsBy(content, statements.collections)){
					// 报错
					parser.error(
						context,
						ECMAScriptErrors.template(this.errorType, context.content)
					);
					return true;
				}

				// 获取下一个语句块
				statements = this.nextStatementsOf(statements);
			}
			// 如果语句块存在
			while(statements);

			return false;
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.const.contains(variable);
		},
		errorType: "CONST",
		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 */
		nextStatementsOf: function(statements){
			return statements.target;
		},
		order: ECMAScriptOrders.IDENTIFIER,
		/**
		 * 获取正则表达式
		 */
		get regexp(){
			return regexp;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		throw: "identifier",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new IdentifierExpression(context);
		}
	});

	// 设置 keywords，虽然值一样，但目的是编译正则
	IdentifierTag.keywords = keywords;
	return IdentifierTag;
}(
	this.IdentifierExpression,
	RegExp,
	// keywords
	[
		"break", "case", "catch", "class", "const", "continue",
		"debugger", "default", "delete", "do", "else", "enum", "export", "extends",
		"false", "finally", "for", "function", "if", "import", "in(?!stanceof)", "instanceof",
		"let", "new", "null", "return", "static", "super", "switch",
		"this", "throw", "true", "try", "typeof",
		"var", "void", "while", "with", "yield"
	],
	// regexp
	null
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/identifier.js"
								);


eval(
									function(){
										// 变量标签相关
~function(){

this.VariableTag = function(IdentifierTag){
	/**
	 * 变量标签
	 * @param {Number} _type - 标签类型
	 */
	function VariableTag(_type){
		IdentifierTag.call(this, _type);
	};
	VariableTag = new Rexjs(VariableTag, IdentifierTag);

	VariableTag.props({
		order: ECMAScriptOrders.VARIABLE
	});
	
	return VariableTag;
}(
	this.IdentifierTag
);

this.VariableDeclarationTag = function(VariableTag, SCOPE_CLOSURE, visitor){
	/**
	 * 变量声明标签
	 * @param {Number} _type - 标签类型
	 */
	function VariableDeclarationTag(_type){
		VariableTag.call(this, _type);
	};
	VariableDeclarationTag = new Rexjs(VariableDeclarationTag, VariableTag);

	VariableDeclarationTag.props({
		/**
		 * 判断该变量名是否还能被定义
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			var content = context.content;

			// 如果已被收集
			if(this.collected(parser, context, statements)){
				return;
			}
			
			// 收集变量名
			statements.collections.declaration.collect(content);
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.blacklist.contains(variable);
		},
		errorType: "REDECLARATION",
		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 */
		nextStatementsOf: function(statements){
			// 如果当前语句块是闭包，那么返回 null（因为不同闭包内，可以多次声明同一变量），否则返回 target
			return (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return VariableDeclarationTag;
}(
	this.VariableTag,
	this.ECMAScriptStatements.SCOPE_CLOSURE,
	this.VariableTag.prototype.visitor
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/variable.js"
								);


eval(
									function(){
										// 分号标签
~function(SemicolonTag){

this.EmptyStatementTag = function(){
	/**
	 * 空语句标签
	 * @param {Number} _type - 标签类型
	 */
	function EmptyStatementTag(_type){
		SemicolonTag.call(this, _type);
	};
	EmptyStatementTag = new Rexjs(EmptyStatementTag, SemicolonTag);
	
	EmptyStatementTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			(
				// 设置当前表达式
				statement.expression = new EmptyExpression(context)
			)
			// 如果有目标语句，则设置 STATE_STATEMENT_END，目的是提取表达式的时候，要包括分号
			.state = statement.target ? STATE_STATEMENT_END : STATE_STATEMENT_ENDED;
		}
	});
	
	return EmptyStatementTag;
}();

this.StatementEndTag = function(unexpected){
	/**
	 * 语句结束标签
	 * @param {Number} _type - 标签类型
	 */
	function StatementEndTag(_type){
		SemicolonTag.call(this, _type);
	};
	StatementEndTag = new Rexjs(StatementEndTag, SemicolonTag);
	
	StatementEndTag.props({
		$class: CLASS_STATEMENT_END,
		$type: TYPE_MISTAKABLE,
		// 防止与 EmptyStatementTag 冲突
		order: ECMAScriptOrders.STATEMENT_END,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.state |= STATE_STATEMENT_END;
		}
	});
	
	return StatementEndTag;
}(
	SemicolonTag.prototype.unexpected
);

this.LastStatementEndTag = function(StatementEndTag){
	/**
	 * 最后一个语句结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function LastStatementEndTag(_type){
		StatementEndTag.call(this, _type);
	};
	LastStatementEndTag = new Rexjs(LastStatementEndTag, StatementEndTag);

	LastStatementEndTag.props({
		regexp: /$/,
		throw: "end of input"
	});

	return LastStatementEndTag;
}(
	this.StatementEndTag
);

}.call(
	this,
	this.SemicolonTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/semicolon.js"
								);


eval(
									function(){
										// 行结束符标签
~function(SpecialLineTerminatorTag, visitor){

this.IllegalLineTerminatorTag = function(){
	/**
	 * 不合法的行结束符标签
	 */
	function IllegalLineTerminatorTag(){
		SpecialLineTerminatorTag.call(this);
	};
	IllegalLineTerminatorTag = new Rexjs(IllegalLineTerminatorTag, SpecialLineTerminatorTag);
	
	IllegalLineTerminatorTag.props({
		order: ECMAScriptOrders.ILLEGAL_LINE_TERMINATOR,
		regexp: /(?:\/\*(?:[^*]|\*(?!\/))*)?(?:\r\n?|\n|\u2028|\u2029)/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE);
		}
	});
	
	return IllegalLineTerminatorTag;
}();

this.StatementBreakTag = function(){
	/**
	 * 语句行结束符标签
	 */
	function StatementBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	StatementBreakTag = new Rexjs(StatementBreakTag, SpecialLineTerminatorTag);
	
	StatementBreakTag.props({
		$class: CLASS_STATEMENT_END,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_END;
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return StatementBreakTag;
}();

this.ExpressionBreakTag = function(){
	/**
	 * 表达式行结束符标签
	 */
	function ExpressionBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	ExpressionBreakTag = new Rexjs(ExpressionBreakTag, SpecialLineTerminatorTag);
	
	ExpressionBreakTag.props({
		// 防止与 StatementBreakTag 冲突
		order: ECMAScriptOrders.EXPRESSION_BREAK,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_ENDABLE;
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ExpressionBreakTag;
}();

}.call(
	this,
	this.SpecialLineTerminatorTag,
	this.SpecialLineTerminatorTag.prototype.visitor
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/line-terminator.js"
								);


eval(
									function(){
										// 注释标签
~function(CommentTag, tags){

this.SingleLineCommentTag = function(){
	/**
	 * 单行注释标签
	 * @param {Number} _type - 标签类型
	 */
	function SingleLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	SingleLineCommentTag = new Rexjs(SingleLineCommentTag, CommentTag);
	
	SingleLineCommentTag.props({
		regexp: /\/\/.*/
	});
	
	return SingleLineCommentTag;
}();

this.OpenMultiLineCommentTag = function(){
	/**
	 * 多行注释起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenMultiLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	OpenMultiLineCommentTag = new Rexjs(OpenMultiLineCommentTag, CommentTag);
	
	OpenMultiLineCommentTag.props({
		regexp: /\/\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.openMultiLineCommentContextTags;
		}
	});
	
	return OpenMultiLineCommentTag;
}();

this.OpenRestrictedCommentTag = function(OpenMultiLineCommentTag){
	/**
	 * 受限制的多行注释起始标签，一般使用在表达式上下文中
	 * @param {Number} _type - 标签类型
	 */
	function OpenRestrictedCommentTag(_type){
		OpenMultiLineCommentTag.call(this, _type);
	};
	OpenRestrictedCommentTag = new Rexjs(OpenRestrictedCommentTag, OpenMultiLineCommentTag);

	OpenRestrictedCommentTag.props({
		order: ECMAScriptOrders.OPEN_RESTRICTED_COMMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.openRestrictedCommentContextTags;
		}
	});
	
	return OpenRestrictedCommentTag;
}(
	this.OpenMultiLineCommentTag
);

this.CommentBreakTag = function(ExpressionBreakTag){
	/**
	 * 注释行结束符标签
	 */
	function CommentBreakTag(){
		ExpressionBreakTag.call(this);
	};
	CommentBreakTag = new Rexjs(CommentBreakTag, ExpressionBreakTag);
	
	CommentBreakTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = tagsMap.restrictedExpressionContextTags;
			return currentTags;
		}
	});
	
	return CommentBreakTag;
}(
	this.ExpressionBreakTag
);

this.CommentContentTag = function(){
	/**
	 * 注释内容标签
	 * @param {Number} _type - 标签类型
	 */
	function CommentContentTag(_type){
		CommentTag.call(this, _type);
	};
	CommentContentTag = new Rexjs(CommentContentTag, CommentTag);
	
	CommentContentTag.props({
		// 防止与单行注释标签或多行注释起始标签冲突
		order: ECMAScriptOrders.COMMENT_CONTENT,
		regexp: /(?:[^*\r\n\u2028\u2029]|\*(?!\/))+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			return currentTags;
		}
	});
	
	return CommentContentTag;
}();

this.CloseMultiLineCommentTag = function(){
	/**
	 * 多行注释结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseMultiLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	CloseMultiLineCommentTag = new Rexjs(CloseMultiLineCommentTag, CommentTag);
	
	CloseMultiLineCommentTag.props({
		regexp: /\*\//,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(){
			return tags;
		}
	});
	
	return CloseMultiLineCommentTag;
}();

}.call(
	this,
	this.CommentTag,
	// tags
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/comment.js"
								);


eval(
									function(){
										// 点属性访问器相关
~function(){

this.AccessorExpression = function(AssignableExpression){
	/**
	 * 属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function AccessorExpression(context, object){
		AssignableExpression.call(this, context);

		this.object = object;
	};
	AccessorExpression = new Rexjs(AccessorExpression, AssignableExpression);
	
	AccessorExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取对象表达式
			this.object.extractTo(contentBuilder);
			
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		},
		object: null,
		property: null
	});
	
	return AccessorExpression;
}(
	this.AssignableExpression
);

this.DotAccessorTag = function(DotTag, AccessorExpression){
	/**
	 * 点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function DotAccessorTag(_type){
		DotTag.call(this, _type);
	};
	DotAccessorTag = new Rexjs(DotAccessorTag, DotTag);
	
	DotAccessorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		// 防止与 NumberTag 冲突
		order: ECMAScriptOrders.DOT_ACCESSOR,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.dotAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new AccessorExpression(context, statement.expression);
		}
	});
	
	return DotAccessorTag;
}(
	this.DotTag,
	this.AccessorExpression
);

this.PropertyNameTag = function(IdentifierTag, RegExp){
	/**
	 * 属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyNameTag(_type){
		IdentifierTag.call(this, _type);
	};
	PropertyNameTag = new Rexjs(PropertyNameTag, IdentifierTag);
	
	PropertyNameTag.props({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.property = context;
		}
	});
	
	return PropertyNameTag;
}(
	this.IdentifierTag,
	RegExp
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/accessor-dot.js"
								);


eval(
									function(){
										// 中括号属性访问器
~function(closeBracketAccessorTag){
	
this.BracketAccessorExpression = function(AccessorExpression){
	/**
	 * 中括号属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function BracketAccessorExpression(context, object){
		AccessorExpression.call(this, context, object);
	};
	BracketAccessorExpression = new Rexjs(BracketAccessorExpression, AccessorExpression);
	
	BracketAccessorExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取对象
			this.object.extractTo(contentBuilder);
			// 提取属性
			this.property.extractTo(contentBuilder);
		}
	});
	
	return BracketAccessorExpression;
}(
	this.AccessorExpression
);
	
this.BracketAccessorStatement = function(){
	/**
	 * 中括号属性访问器语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BracketAccessorStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BracketAccessorStatement = new Rexjs(BracketAccessorStatement, ECMAScriptStatement);
	
	BracketAccessorStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== "]"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出该语句并设置 inner
			this.out().property.inner = this.expression;
			return this.bindingOf();
		}
	});
	
	return BracketAccessorStatement;
}();

this.OpenBracketAccessorTag = function(OpenBracketTag, BracketAccessorExpression, BracketAccessorStatement){
	/**
	 * 起始中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBracketAccessorTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenBracketAccessorTag = new Rexjs(OpenBracketAccessorTag, OpenBracketTag);
	
	OpenBracketAccessorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBracketAccessorTag;
		},
		// 防止与起始数组标签冲突
		order: ECMAScriptOrders.OPEN_BRACKET_ACCESSOR,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置临时表达式
			(
				statement.expression = new BracketAccessorExpression(context, statement.expression)
			)
			// 设置 property
			.property = new PartnerExpression(context);

			// 设置当前语句
			statements.statement = new BracketAccessorStatement(statements);
		}
	});
	
	return OpenBracketAccessorTag;
}(
	this.OpenBracketTag,
	this.BracketAccessorExpression,
	this.BracketAccessorStatement
);

this.CloseBracketAccessorTag = function(CloseBracketTag){
	/**
	 * 结束中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBracketAccessorTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseBracketAccessorTag = new Rexjs(CloseBracketAccessorTag, CloseBracketTag);
	
	CloseBracketAccessorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression.property.close = context;
		}
	});
	
	return CloseBracketAccessorTag;
}(
	this.CloseBracketTag
);

closeBracketAccessorTag = new this.CloseBracketAccessorTag();
	
}.call(
	this,
	// closeBracketAccessorTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/accessor-bracket.js"
								);


eval(
									function(){
										// 逗号相关
~function(commaSiblingTag){

this.CommaExpression = function(){
	/**
	 * 逗号表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} firstExpression - 第一个子表达式
	 */
	function CommaExpression(context, firstExpression){
		ListExpression.call(this, context, ",");

		// 添加第一个子表达式
		this.add(firstExpression);
	};
	CommaExpression = new Rexjs(CommaExpression, ListExpression);

	return CommaExpression;
}();

this.CommaStatement = function(){
	/**
	 * 逗号语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CommaStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CommaStatement = new Rexjs(CommaStatement, ECMAScriptStatement);
	
	CommaStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return this.bindingOf();
		}
	});
	
	return CommaStatement;
}();

this.CommaTag = function(ExpressionSeparatorTag, CommaExpression, CommaStatement){
	/**
	 * 逗号标签
	 * @param {Number} _type - 标签类型
	 */
	function CommaTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	CommaTag = new Rexjs(CommaTag, ExpressionSeparatorTag);
	
	CommaTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return commaSiblingTag;
		},
		regexp: /,/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CommaExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});
	
	return CommaTag;
}(
	this.ExpressionSeparatorTag,
	this.CommaExpression,
	this.CommaStatement
);

this.CommaSiblingTag = function(CommaTag, CommaStatement){
	/**
	 * 兄弟逗号标签，即同一语句下面的非第一个逗号
	 * @param {Number} _type - 标签类型
	 */
	function CommaSiblingTag(_type){
		CommaTag.call(this, _type);
	};
	CommaSiblingTag = new Rexjs(CommaSiblingTag, CommaTag);

	CommaSiblingTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});

	return CommaSiblingTag;
}(
	this.CommaTag,
	this.CommaStatement
);

commaSiblingTag = new this.CommaSiblingTag();
	
}.call(
	this,
	// commaSiblingTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/comma.js"
								);


eval(
									function(){
										// 一元标签基类
~function(){
	
this.UnaryExpression = function(){
	/**
	 * 一元表达式
	 * @param {Context} context - 标签上下文
	 */
	function UnaryExpression(context){
		Expression.call(this, context);
	};
	UnaryExpression = new Rexjs(UnaryExpression, Expression);
	
	UnaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});
	
	return UnaryExpression;
}();

this.PostfixUnaryExpression = function(UnaryExpression){
	/**
	 * 后置一元表达式
	 * @param {Context} context - 标签上下文
	 */
	function PostfixUnaryExpression(context){
		UnaryExpression.call(this, context);
	};
	PostfixUnaryExpression = new Rexjs(PostfixUnaryExpression, UnaryExpression);
	
	PostfixUnaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
		}
	});
	
	return PostfixUnaryExpression;
}(
	this.UnaryExpression
);

this.UnaryStatement = function(){
	/**
	 * 一元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	UnaryStatement = new Rexjs(UnaryStatement, ECMAScriptStatement);
	
	UnaryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression;

			// 如果一元标签验证该标签为表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context, expression)){
				// 跳出语句并设置 operand
				this.out().operand = expression;
			}
		}
	});
	
	return UnaryStatement;
}();

this.UnaryTag = function(UnaryExpression, UnaryStatement, ExpressionSeparatorTag){
	/**
	 * 一元标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryTag(_type){
		SyntaxTag.call(this, _type);
	};
	UnaryTag = new Rexjs(UnaryTag, SyntaxTag);
	
	UnaryTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @param {Expression} operand - 该一元表达式所操作的对象
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置临时表达式
			statement.expression = new UnaryExpression(context);
			// 设置当前语句
			statements.statement = new UnaryStatement(statements);
		}
	});
	
	return UnaryTag;
}(
	this.UnaryExpression,
	this.UnaryStatement,
	this.ExpressionSeparatorTag
);

this.UnaryKeywordTag = function(UnaryTag){
	/**
	 * 一元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryKeywordTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryKeywordTag = new Rexjs(UnaryKeywordTag, UnaryTag);
	
	UnaryKeywordTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return UnaryKeywordTag;
}(
	this.UnaryTag
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/unary-base.js"
								);


eval(
									function(){
										// 执行函数的一元操作符相关
~function(UnaryKeywordTag){

this.ExecutableExpression = function(){
	/**
	 * 可被执行的（函数）表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ExecutableExpression(open){
		PartnerExpression.call(this, open);
	};
	ExecutableExpression = new Rexjs(ExecutableExpression, PartnerExpression);

	return ExecutableExpression;
}();

this.ExecTag = function(ExecutableExpression, isSeparator){
	/**
	 * 执行函数关键字（如：new、try 等）标签
	 * @param {Number} _type - 标签类型
	 */
	function ExecTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	ExecTag = new Rexjs(ExecTag, UnaryKeywordTag);
	
	ExecTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @param {Expression} operand - 该一元表达式所操作的对象
		 */
		isSeparator: function(context, operand){
			/*
				该 isSeparator 是由 try 方法进入，
				而只有 CLASS_EXPRESSION_CONTEXT 标签才能进入 try
			*/
			return operand instanceof ExecutableExpression || isSeparator.call(this, context);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.execContextTags;
		}
	});
	
	return ExecTag;
}(
	this.ExecutableExpression,
	UnaryKeywordTag.prototype.isSeparator
);

}.call(
	this,
	this.UnaryKeywordTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/unary-exec.js"
								);


eval(
									function(){
										// 非赋值一元标签
~function(UnaryTag, UnaryKeywordTag){

this.DeleteTag = function(){
	/**
	 * delete 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DeleteTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	DeleteTag = new Rexjs(DeleteTag, UnaryKeywordTag);
	
	DeleteTag.props({
		regexp: /delete/
	});
	
	return DeleteTag;
}();

this.NewTag = function(ExecTag){
	/**
	 * new 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function NewTag(_type){
		ExecTag.call(this, _type);
	};
	NewTag = new Rexjs(NewTag, ExecTag);
	
	NewTag.props({
		regexp: /new/
	});
	
	return NewTag;
}(
	this.ExecTag
);

this.TypeofTag = function(){
	/**
	 * typeof 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function TypeofTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	TypeofTag = new Rexjs(TypeofTag, UnaryKeywordTag);
	
	TypeofTag.props({
		regexp: /typeof/
	});
	
	return TypeofTag;
}();

this.VoidTag = function(){
	/**
	 * void 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VoidTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	VoidTag = new Rexjs(VoidTag, UnaryKeywordTag);
	
	VoidTag.props({
		regexp: /void/
	});
	
	return VoidTag;
}();

this.PlusTag = function(){
	/**
	 * 正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusTag(_type){
		UnaryTag.call(this, _type);
	};
	PlusTag = new Rexjs(PlusTag, UnaryTag);
	
	PlusTag.props({
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return PlusTag;
}();

this.PlusSiblingTag = function(PlusTag){
	/**
	 * 相邻的正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusSiblingTag(_type){
		PlusTag.call(this, _type);
	};
	PlusSiblingTag = new Rexjs(PlusSiblingTag, PlusTag);
	
	PlusSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.PLUS_SIBLING
	});
	
	return PlusSiblingTag;
}(
	this.PlusTag
);

this.NegationTag = function(){
	/**
	 * 负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationTag(_type){
		UnaryTag.call(this, _type);
	};
	NegationTag = new Rexjs(NegationTag, UnaryTag);
	
	NegationTag.props({
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return NegationTag;
}();

this.NegationSiblingTag = function(NegationTag){
	/**
	 * 重复的负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationSiblingTag(_type){
		NegationTag.call(this, _type);
	};
	NegationSiblingTag = new Rexjs(NegationSiblingTag, NegationTag);
	
	NegationSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.NEGATION_SIBLING
	});
	
	return NegationSiblingTag;
}(
	this.NegationTag
);

this.BitwiseNOTTag = function(){
	/**
	 * 二进制否定标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	BitwiseNOTTag = new Rexjs(BitwiseNOTTag, UnaryTag);
	
	BitwiseNOTTag.props({
		regexp: /~/
	});
	
	return BitwiseNOTTag;
}();

this.LogicalNOTTag = function(){
	/**
	 * 逻辑否定标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	LogicalNOTTag = new Rexjs(LogicalNOTTag, UnaryTag);
	
	LogicalNOTTag.props({
		regexp: /!/
	});
	
	return LogicalNOTTag;
}();
	
}.call(
	this,
	this.UnaryTag,
	this.UnaryKeywordTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/unary-non-assginment.js"
								);


eval(
									function(){
										// 一元赋值标签
~function(VariableTag){

this.UnaryAssignmentStatement = function(UnaryStatement, error){
	/**
	 * 一元赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryAssignmentStatement(statements){
		UnaryStatement.call(this, statements);
	};
	UnaryAssignmentStatement = new Rexjs(UnaryAssignmentStatement, UnaryStatement);
	
	UnaryAssignmentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果满足一元赋值标签条件
			if(this.target.expression.context.tag.operable(parser, this.expression)){
				// 跳出语句并设置 operand
				this.out().operand = this.expression;
				return;
			}

			// 报错
			error(parser, this);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression, tag = this.target.expression.context.tag;

			switch(false){
				// 如果不是分隔符标签
				case tag.isSeparator(context, expression):
					return;
	
				// 如果不能满足一元赋值标签条件
				case tag.operable(parser, expression):
					// 报错
					error(parser, this);
					return;
			}

			// 跳出语句并设置 operand
			this.out().operand = expression;
		}
	});
	
	return UnaryAssignmentStatement;
}(
	this.UnaryStatement,
	// error
	function(parser, statement){
		// 报错
		parser.error(
			statement.target.expression.context,
			ECMAScriptErrors.PREFIX_OPERATION,
			true
		);
	}
);

this.UnaryAssignmentTag = function(UnaryTag, UnaryExpression, UnaryAssignmentStatement, AssignableExpression, AccessorExpression){
	/**
	 * 一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryAssignmentTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryAssignmentTag = new Rexjs(UnaryAssignmentTag, UnaryTag);

	UnaryAssignmentTag.props({
		/**
		 * 判断该一元表达式在当前表达式中，是否能使用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 当前表达式
		 */
		operable: function(parser, expression){
			// 如果当前表达式是赋值表达式
			if(expression instanceof AssignableExpression){
				var ctx = expression.context;

				switch(true){
					// 如果是属性访问表达式
					case expression instanceof AccessorExpression:
						break;

					// 如果已被收集到常量（会触发报错）
					case ctx.tag.collected(parser, ctx, parser.statements):
						return false;
				}

				return true;
			}

			return false;
		},
		order: ECMAScriptOrders.UNARY_ASSIGNMENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new UnaryExpression(context);
			// 设置当前语句
			statements.statement = new UnaryAssignmentStatement(statements);
		}
	});

	return UnaryAssignmentTag;
}(
	this.UnaryTag,
	this.UnaryExpression,
	this.UnaryAssignmentStatement,
	this.AssignableExpression,
	this.AccessorExpression
);

this.PostfixUnaryAssignmentTag = function(UnaryAssignmentTag, PostfixUnaryExpression){
	/**
	 * 后置一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixUnaryAssignmentTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	PostfixUnaryAssignmentTag = new Rexjs(PostfixUnaryAssignmentTag, UnaryAssignmentTag);

	PostfixUnaryAssignmentTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		order: ECMAScriptOrders.POSTFIX_UNARY_ASSIGNMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 如果满足一元赋值标签条件
			if(this.operable(parser, expression)){
				(
					// 设置当前表达式
					statement.expression = new PostfixUnaryExpression(context)
				)
				// 设置 operand 属性
				.operand = expression;

				return;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.POSTFIX_OPERATION, true);
		}
	});

	return PostfixUnaryAssignmentTag;
}(
	this.UnaryAssignmentTag,
	this.PostfixUnaryExpression
);

}.call(
	this,
	this.VariableTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/unary-assginment.js"
								);


eval(
									function(){
										// 递增和递减标签
~function(UnaryAssignmentTag, PostfixUnaryAssignmentTag){

this.IncrementTag = function(){
	/**
	 * 前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	IncrementTag = new Rexjs(IncrementTag, UnaryAssignmentTag);
	
	IncrementTag.props({
		regexp: /\+\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return IncrementTag;
}();

this.IncrementSiblingTag = function(IncrementTag){
	/**
	 * 相邻的前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementSiblingTag(_type){
		IncrementTag.call(this, _type);
	};
	IncrementSiblingTag = new Rexjs(IncrementSiblingTag, IncrementTag);
	
	IncrementSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		}
	});
	
	return IncrementSiblingTag;
}(
	this.IncrementTag
);

this.PostfixIncrementTag = function(){
	/**
	 * 后置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixIncrementTag(_type){
		PostfixUnaryAssignmentTag.call(this, _type);
	};
	PostfixIncrementTag = new Rexjs(PostfixIncrementTag, PostfixUnaryAssignmentTag);
	
	PostfixIncrementTag.props({
		regexp: /\+\+/
	});
	
	return PostfixIncrementTag;
}();

this.DecrementTag = function(){
	/**
	 * 前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	DecrementTag = new Rexjs(DecrementTag, UnaryAssignmentTag);
	
	DecrementTag.props({
		regexp: /--/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return DecrementTag;
}();

this.DecrementSiblingTag = function(DecrementTag){
	/**
	 * 相邻的前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementSiblingTag(_type){
		DecrementTag.call(this, _type);
	};
	DecrementSiblingTag = new Rexjs(DecrementSiblingTag, DecrementTag);
	
	DecrementSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		}
	});
	
	return DecrementSiblingTag;
}(
	this.DecrementTag
);

this.PostfixDecrementTag = function(){
	/**
	 * 后置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixDecrementTag(_type){
		PostfixUnaryAssignmentTag.call(this, _type);
	};
	PostfixDecrementTag = new Rexjs(PostfixDecrementTag, PostfixUnaryAssignmentTag);
	
	PostfixDecrementTag.props({
		regexp: /--/
	});
	
	return PostfixDecrementTag;
}();

}.call(
	this,
	this.UnaryAssignmentTag,
	this.PostfixUnaryAssignmentTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/in(de)crement.js"
								);


eval(
									function(){
										// 二元标签基类
~function(){

this.BinaryExpression = function(){
	/**
	 * 二元表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 该二元表达式左侧运算的表达式
	 */
	function BinaryExpression(context, left){
		Expression.call(this, context);

		this.left = left;
	};
	BinaryExpression = new Rexjs(BinaryExpression, Expression);

	BinaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 先提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 追加运算符
			contentBuilder.appendContext(this.context);
			// 提取右侧表达式
			this.right.extractTo(contentBuilder);
		},
		last: null,
		left: null,
		right: null
	});

	return BinaryExpression;
}();

this.BinaryStatement = function(setRight){
	/**
	 * 二元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BinaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BinaryStatement = new Rexjs(BinaryStatement, ECMAScriptStatement);
	
	BinaryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			setRight(this);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context)){
				setRight(this);
			}
		}
	});
	
	return BinaryStatement;
}(
	// setRight
	function(statement){
		// 跳出语句并给最后一个二元表达式设置 right
		statement.out().last.right = statement.expression;
	}
);

this.BinaryTag = function(ExpressionSeparatorTag, BinaryExpression, BinaryStatement){
	/**
	 * 二元标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	BinaryTag = new Rexjs(BinaryTag, ExpressionSeparatorTag);
	
	BinaryTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
		order: ECMAScriptOrders.BINARY,
		precedence: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new BinaryExpression(context, left);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, precedence = this.precedence;

			// 如果当前表达式是二元表达式而且该二元表达式的运算符优先级小于当前运算符的优先级
			if(expression instanceof BinaryExpression && expression.context.tag.precedence < precedence){
				var exp = expression, right = expression.right;

				// 如果右侧表达式也是二元表达式
				while(right instanceof BinaryExpression){
					// 如果当前二元运算符的优先级小于等于该表达式的运算符优先级
					if(precedence <= right.context.tag.precedence){
						break;
					}

					// 记录上一个表达式
					exp = right;
					// 再获取右侧表达式
					right = right.right;
				}

				// 设置新的右侧表达式
				exp.right = expression.last = this.toExpression(context, right);
			}
			else {
				var binaryExpression = this.toExpression(context, expression);

				// 设置当前表达式并将最后的二元表达式为自己
				statement.expression = binaryExpression.last = binaryExpression;
			}

			// 设置当前语句
			statements.statement = new BinaryStatement(statements);
		}
	});
	
	return BinaryTag;
}(
	this.ExpressionSeparatorTag,
	this.BinaryExpression,
	this.BinaryStatement
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/binary-base.js"
								);


eval(
									function(){
										// 特殊的二元标签
~function(BinaryTag, AssignableExpression, IdentifierExpression, VariableDeclarationTag){

this.AssignmentTag = function(BinaryExpression, BinaryStatement, isSeparator, assignable){
	/**
	 * 二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function AssignmentTag(_type){
		BinaryTag.call(this, _type);
	};
	AssignmentTag = new Rexjs(AssignmentTag, BinaryTag);

	AssignmentTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			// 如果是父类确定的分隔符，但不是箭头符号，那么它就是赋值标签所认定的分隔符
			return isSeparator.call(this, context) && context.content !== "=>";
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			switch(true){
				// 如果可赋值
				case assignable(parser, expression):
					var binaryExpression = this.toExpression(context, expression);

					// 设置当前表达式并将最后的二元表达式为自己
					statement.expression = binaryExpression.last = binaryExpression;
					break;

				// 如果表达式是二元表达式
				case expression instanceof BinaryExpression:
					var last = expression.last, right = last.right;

					// 如果该二元表达式是“赋值表达式”，而且其值也是“可赋值表达式”
					if(last.context.tag.precedence === 0 && assignable(parser, right)){
						// 设置右侧表达式及记录为最后一个二元表达式
						last.right = expression.last = this.toExpression(context, right);
						break;
					}

				default:
					// 报错
					parser.error(context, ECMAScriptErrors.ASSIGNMENT, true);
					return;
			}

			// 设置当前语句
			statements.statement = new BinaryStatement(statements);
		}
	});
	
	return AssignmentTag;
}(
	this.BinaryExpression,
	this.BinaryStatement,
	BinaryTag.prototype.isSeparator,
	// assignable
	function(parser, expression){
		// 如果是赋值表达式
		if(expression instanceof AssignableExpression){
			// 如果是标识符表达式，那么需要验证是否为常量赋值
			if(expression instanceof IdentifierExpression){
				var ctx = expression.context, tag = ctx.tag;

				switch(true){
					// 如果当前是声明变量名标签，则不判断是否被收集，因为在声明中，已经判断，再判断的话，100% 由于重复定义，而报错
					case tag instanceof VariableDeclarationTag:
						break;

					// 如果已经被收集，会导致报错
					case tag.collected(parser, ctx, parser.statements):
						return false;
				}
			}

			return true;
		}

		return false;
	}
);

this.BinaryKeywordTag = function(){
	/**
	 * 二元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryKeywordTag(_type){
		BinaryTag.call(this, _type);
	};
	BinaryKeywordTag = new Rexjs(BinaryKeywordTag, BinaryTag);

	BinaryKeywordTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return BinaryKeywordTag;
}();

}.call(
	this,
	this.BinaryTag,
	this.AssignableExpression,
	this.IdentifierExpression,
	this.VariableDeclarationTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/binary-special.js"
								);


eval(
									function(){
										// 所有具体的二元标签
~function(BinaryTag, AssignmentTag, BinaryKeywordTag){

this.BasicAssignmentTag = function(){
	/**
	 * 二元基础赋值运算符“等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function BasicAssignmentTag(_type){
		AssignmentTag.call(this, _type);
	};
	BasicAssignmentTag = new Rexjs(BasicAssignmentTag, AssignmentTag);
	
	BasicAssignmentTag.props({
		regexp: /=/
	});
	
	return BasicAssignmentTag;
}();

this.ShorthandAssignmentTag = function(){
	/**
	 * 简写的二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function ShorthandAssignmentTag(_type){
		AssignmentTag.call(this, _type);
	};
	ShorthandAssignmentTag = new Rexjs(ShorthandAssignmentTag, AssignmentTag);
	
	ShorthandAssignmentTag.props({
		// 防止与其他二元运算符冲突
		order: ECMAScriptOrders.SHORTHAND_ASSIGNMENT,
		regexp: /\+=|-=|\*=|\/=|%=|<<=|>>=|>>>=|\&=|\|=|\^=/
	});
	
	return ShorthandAssignmentTag;
}();

this.IllegalShorthandAssignmentTag = function(ShorthandAssignmentTag){
	/**
	 * 不合法的简写二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function IllegalShorthandAssignmentTag(_type){
		ShorthandAssignmentTag.call(this, _type);
	};
	IllegalShorthandAssignmentTag = new Rexjs(IllegalShorthandAssignmentTag, ShorthandAssignmentTag);

	IllegalShorthandAssignmentTag.props({
		order: ECMAScriptOrders.ILLEGAL_SHORTHAND_ASSIGNMENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context);
		}
	});

	return IllegalShorthandAssignmentTag;
}(
	this.ShorthandAssignmentTag
);

this.LogicalORTag = function(){
	/**
	 * 逻辑运算符“或”标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalORTag(_type){
		BinaryTag.call(this, _type);
	};
	LogicalORTag = new Rexjs(LogicalORTag, BinaryTag);
	
	LogicalORTag.props({
		// 防止与 "|" 冲突
		order: ECMAScriptOrders.LOGICAL_OR,
		precedence: 1,
		regexp: /\|\|/
	});
	
	return LogicalORTag;
}();

this.LogicalANDTag = function(){
	/**
	 * 逻辑运算符“与”标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalANDTag(_type){
		BinaryTag.call(this, _type);
	};
	LogicalANDTag = new Rexjs(LogicalANDTag, BinaryTag);
	
	LogicalANDTag.props({
		// 防止与 "&" 冲突
		order: ECMAScriptOrders.LOGICAL_AND,
		precedence: 2,
		regexp: /\&\&/
	});
	
	return LogicalANDTag;
}();

this.BitwiseORTag = function(){
	/**
	 * 二进制位运算符“或”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseORTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseORTag = new Rexjs(BitwiseORTag, BinaryTag);
	
	BitwiseORTag.props({
		precedence: 3,
		regexp: /\|/
	});
	
	return BitwiseORTag;
}();

this.BitwiseXORTag = function(){
	/**
	 * 二进制位运算符“非或”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseXORTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseXORTag = new Rexjs(BitwiseXORTag, BinaryTag);
	
	BitwiseXORTag.props({
		precedence: 4,
		regexp: /\^/
	});
	
	return BitwiseXORTag;
}();

this.BitwiseANDTag = function(){
	/**
	 * 二进制位运算符“与”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseANDTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseANDTag = new Rexjs(BitwiseANDTag, BinaryTag);
	
	BitwiseANDTag.props({
		precedence: 5,
		regexp: /\&/
	});
	
	return BitwiseANDTag;
}();

this.IdentityTag = function(){
	/**
	 * 关系运算符“全等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentityTag(_type){
		BinaryTag.call(this, _type);
	};
	IdentityTag = new Rexjs(IdentityTag, BinaryTag);
	
	IdentityTag.props({
		// 防止与 "==" 或 "=" 冲突
		order: ECMAScriptOrders.IDENTITY,
		precedence: 6,
		regexp: /===/
	});
	
	return IdentityTag;
}();

this.NonidentityTag = function(){
	/**
	 * 关系运算符“不全等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function NonidentityTag(_type){
		BinaryTag.call(this, _type);
	};
	NonidentityTag = new Rexjs(NonidentityTag, BinaryTag);
	
	NonidentityTag.props({
		// 防止与 "!=" 冲突
		order: ECMAScriptOrders.NONIDENTITY,
		precedence: 6,
		regexp: /!==/
	});
	
	return NonidentityTag;
}();


this.EqualityTag = function(){
	/**
	 * 关系运算符“等于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function EqualityTag(_type){
		BinaryTag.call(this, _type);
	};
	EqualityTag = new Rexjs(EqualityTag, BinaryTag);
	
	EqualityTag.props({
		order: ECMAScriptOrders.EQUALITY,
		precedence: 6,
		regexp: /==/
	});
	
	return EqualityTag;
}();

this.InequalityTag = function(){
	/**
	 * 关系运算符“不等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function InequalityTag(_type){
		BinaryTag.call(this, _type);
	};
	InequalityTag = new Rexjs(InequalityTag, BinaryTag);
	
	InequalityTag.props({
		order: ECMAScriptOrders.INEQUALITY,
		precedence: 6,
		regexp: /!=/
	});
	
	return InequalityTag;
}();

this.LessThanOrEqualTag = function(){
	/**
	 * 关系运算符“小于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function LessThanOrEqualTag(_type){
		BinaryTag.call(this, _type);
	};
	LessThanOrEqualTag = new Rexjs(LessThanOrEqualTag, BinaryTag);

	LessThanOrEqualTag.props({
		order: ECMAScriptOrders.LESS_THAN_OR_EQUAL,
		precedence: 7,
		regexp: /<=/
	});
	
	return LessThanOrEqualTag;
}();

this.GreaterThanOrEqualTag = function(){
	/**
	 * 关系运算符“大于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function GreaterThanOrEqualTag(_type){
		BinaryTag.call(this, _type);
	};
	GreaterThanOrEqualTag = new Rexjs(GreaterThanOrEqualTag, BinaryTag);
	
	GreaterThanOrEqualTag.props({
		order: ECMAScriptOrders.GREATER_THAN_OR_EQUAL,
		precedence: 7,
		regexp: />=/
	});
	
	return GreaterThanOrEqualTag;
}();

this.LessThanTag = function(){
	/**
	 * 关系运算符“小于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function LessThanTag(_type){
		BinaryTag.call(this, _type);
	};
	LessThanTag = new Rexjs(LessThanTag, BinaryTag);
	
	LessThanTag.props({
		precedence: 7,
		regexp: /</
	});
	
	return LessThanTag;
}();

this.GreaterThanTag = function(){
	/**
	 * 关系运算符“大于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function GreaterThanTag(_type){
		BinaryTag.call(this, _type);
	};
	GreaterThanTag = new Rexjs(GreaterThanTag, BinaryTag);
	
	GreaterThanTag.props({
		precedence: 7,
		regexp: />/
	});
	
	return GreaterThanTag;
}();

this.InstanceofTag = function(){
	/**
	 * 关系运算符“instanceof”标签
	 * @param {Number} _type - 标签类型
	 */
	function InstanceofTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	InstanceofTag = new Rexjs(InstanceofTag, BinaryKeywordTag);
	
	InstanceofTag.props({
		precedence: 7,
		regexp: /instanceof/
	});
	
	return InstanceofTag;
}();

this.InTag = function(){
	/**
	 * 关系运算符“in”标签
	 * @param {Number} _type - 标签类型
	 */
	function InTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	InTag = new Rexjs(InTag, BinaryKeywordTag);
	
	InTag.props({
		precedence: 7,
		regexp: /in(?!stanceof)/
	});
	
	return InTag;
}();

this.UnsignedRightShiftTag = function(){
	/**
	 * 二进制运算符“无符号右位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function UnsignedRightShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	UnsignedRightShiftTag = new Rexjs(UnsignedRightShiftTag, BinaryTag);
	
	UnsignedRightShiftTag.props({
		order: ECMAScriptOrders.UNSIGNED_RIGHT_SHIFT,
		precedence: 8,
		regexp: />>>/
	});
	
	return UnsignedRightShiftTag;
}();

this.LeftShiftTag = function(){
	/**
	 * 二进制运算符“左位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function LeftShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	LeftShiftTag = new Rexjs(LeftShiftTag, BinaryTag);
	
	LeftShiftTag.props({
		order: ECMAScriptOrders.LEFT_SHIFT,
		precedence: 8,
		regexp: /<</
	});
	
	return LeftShiftTag;
}();

this.RightShiftTag = function(){
	/**
	 * 二进制运算符“右位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function RightShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	RightShiftTag = new Rexjs(RightShiftTag, BinaryTag);
	
	RightShiftTag.props({
		order: ECMAScriptOrders.RIGHT_SHIFT,
		precedence: 8,
		regexp: />>/
	});
	
	return RightShiftTag;
}();

this.AdditionTag = function(){
	/**
	 * 二元运算符“加号”标签
	 * @param {Number} _type - 标签类型
	 */
	function AdditionTag(_type){
		BinaryTag.call(this, _type);
	};
	AdditionTag = new Rexjs(AdditionTag, BinaryTag);
	
	AdditionTag.props({
		precedence: 9,
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return AdditionTag;
}();

this.SubtractionTag = function(){
	/**
	 * 二元运算符“减号”标签
	 * @param {Number} _type - 标签类型
	 */
	function SubtractionTag(_type){
		BinaryTag.call(this, _type);
	};
	SubtractionTag = new Rexjs(SubtractionTag, BinaryTag);
	
	SubtractionTag.props({
		precedence: 9,
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return SubtractionTag;
}();

this.DivisionTag = function(){
	/**
	 * 二元运算符“除号”标签
	 * @param {Number} _type - 标签类型
	 */
	function DivisionTag(_type){
		BinaryTag.call(this, _type);
	};
	DivisionTag = new Rexjs(DivisionTag, BinaryTag);
	
	DivisionTag.props({
		precedence: 10,
		regexp: /\//
	});
	
	return DivisionTag;
}();

this.MultiplicationTag = function(){
	/**
	 * 二元运算符“乘号”标签
	 * @param {Number} _type - 标签类型
	 */
	function MultiplicationTag(_type){
		BinaryTag.call(this, _type);
	};
	MultiplicationTag = new Rexjs(MultiplicationTag, BinaryTag);
	
	MultiplicationTag.props({
		precedence: 10,
		regexp: /\*/
	});
	
	return MultiplicationTag;
}();

this.RemainderTag = function(){
	/**
	 * 二元运算符“百分号”标签
	 * @param {Number} _type - 标签类型
	 */
	function RemainderTag(_type){
		BinaryTag.call(this, _type);
	};
	RemainderTag = new Rexjs(RemainderTag, BinaryTag);
	
	RemainderTag.props({
		precedence: 10,
		regexp: /%/
	});
	
	return RemainderTag;
}();
	
}.call(
	this,
	this.BinaryTag,
	this.AssignmentTag,
	this.BinaryKeywordTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/binary-all.js"
								);


eval(
									function(){
										// 幂运算表达式相关
~function(BinaryExpression){

this.ExponentiationExpression = function(config, extractTo){
	/**
	 * 幂运算表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 左侧表达式
	 */
	function ExponentiationExpression(context, left){
		BinaryExpression.call(this, context, left);
	};
	ExponentiationExpression = new Rexjs(ExponentiationExpression, BinaryExpression);

	ExponentiationExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析幂运算
			if(config.value){
				// 追加算数方法
				contentBuilder.appendString("Math.pow(");
				// 提取左侧的算数底值
				this.left.extractTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 提取幂
				this.right.extractTo(contentBuilder);
				// 追加方法结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return ExponentiationExpression;
}(
	// config
	ECMAScriptConfig.addBaseConfig("exponentiation"),
	BinaryExpression.prototype.extractTo
);

this.ExponentiationTag = function(BinaryTag, ExponentiationExpression){
	/**
	 * 幂运算标签
	 * @param {Number} _type - 标签类型
	 */
	function ExponentiationTag(_type){
		BinaryTag.call(this, _type);
	};
	ExponentiationTag = new Rexjs(ExponentiationTag, BinaryTag);
	
	ExponentiationTag.props({
		// 防止与 "*" 冲突
		order: ECMAScriptOrders.EXPONENTIATION,
		precedence: 11,
		regexp: /\*\*/,
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new ExponentiationExpression(context, left);
		}
	});
	
	return ExponentiationTag;
}(
	this.BinaryTag,
	this.ExponentiationExpression
);

}.call(
	this,
	this.BinaryExpression
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/exponentiation.js"
								);


eval(
									function(){
										// 三元表达式相关
~function(colonTag){

this.TernaryExpression = function(){
	/**
	 * 三元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TernaryExpression(context){
		Expression.call(this, context);
	};
	TernaryExpression = new Rexjs(TernaryExpression, Expression);

	TernaryExpression.props({
		condition: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取条件表达式
			this.condition.extractTo(contentBuilder);
			// 追加问号上下文
			contentBuilder.appendContext(this.context);
			// 提取成立条件表达式
			this.positive.extractTo(contentBuilder);
			// 追加冒号上下文
			contentBuilder.appendContext(this.colonContext);
			// 提取否定条件表达式
			this.negative.extractTo(contentBuilder);
		},
		negative: null,
		positive: null
	});

	return TernaryExpression;
}();

this.PositiveStatement = function(){
	/**
	 * 三元表达式的肯定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PositiveStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PositiveStatement = new Rexjs(PositiveStatement, ECMAScriptStatement);

	PositiveStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是冒号
			if(context.content !== ":"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 positive
			this.out().positive = this.expression;
			return this.bindingOf();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 报错
				parser.error(context);
			}
		}
	});

	return PositiveStatement;
}();

this.NegativeStatement = function(){
	/**
	 * 三元表达式的否定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function NegativeStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	NegativeStatement = new Rexjs(NegativeStatement, ECMAScriptStatement);

	NegativeStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 negative
			this.out().negative = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 negative
				this.out().negative = this.expression;
			}
		}
	});

	return NegativeStatement;
}();

this.QuestionTag = function(ExpressionSeparatorTag, TernaryExpression, PositiveStatement){
	/**
	 * 三元运算符“问号”标签
	 * @param {Number} _type - 标签类型
	 */
	function QuestionTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	QuestionTag = new Rexjs(QuestionTag, ExpressionSeparatorTag);

	QuestionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return colonTag;
		},
		regexp: /\?/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化三元表达式
			var ternaryExpression = new TernaryExpression(context);

			// 设置三元表达式的条件
			ternaryExpression.condition = statement.expression;
			// 设置当前表达式
			statement.expression = ternaryExpression;
			// 设置当前语句
			statements.statement = new PositiveStatement(statements);
		}
	});

	return QuestionTag;
}(
	this.ExpressionSeparatorTag,
	this.TernaryExpression,
	this.PositiveStatement
);

this.ColonTag = function(NegativeStatement){
	/**
	 * 冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function ColonTag(_type){
		SyntaxTag.call(this, _type);
	};
	ColonTag = new Rexjs(ColonTag, SyntaxTag);

	ColonTag.props({
		regexp: /:/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置冒号上下文
			statement.expression.colonContext = context;
			// 设置当前语句
			statements.statement = new NegativeStatement(statements);
		}
	});
	
	return ColonTag;
}(
	this.NegativeStatement
);

colonTag = new this.ColonTag();

}.call(
	this,
	// colonTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ternary.js"
								);


eval(
									function(){
										// 函数调用相关
~function(BracketAccessorExpression, UnaryKeywordTag, parameterSeparatorTag, closeCallTag, extractTo){

this.CallExpression = function(ExecutableExpression, AccessorExpression, UnaryStatement, compileWithAccessor, compileWithNew, compileDefault){
	/**
	 * 函数调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 */
	function CallExpression(open, statement){
		ExecutableExpression.call(this, open);

		this.operand = statement.expression;
		this.inner = new ListExpression(null, ",");

		// 如果是一元语句
		if(statement instanceof UnaryStatement){
			this.new = statement.target.expression.context.content === "new";
		}
	};
	CallExpression = new Rexjs(CallExpression, ExecutableExpression);

	CallExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var operand = this.operand;

			// 如果需要编译拓展符
			if(this.needCompileSpread){
				switch(true){
					// 如果是 new 实例化
					case this.new:
						compileWithNew(contentBuilder, this, operand);
						return;

					// 如果是对象方法的调用
					case operand instanceof AccessorExpression:
						// 根据访问器编译
						compileWithAccessor(contentBuilder, this, operand, this.variable);
						return;

					default:
						// 编译默认情况
						compileDefault(contentBuilder, this, operand);
						return;
				}
			}
			
			// 提取操作对象
			operand.extractTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		needCompileSpread: false,
		new: false,
		operand: null,
		spread: false,
		variable: ""
	});

	return CallExpression;
}(
	this.ExecutableExpression,
	this.AccessorExpression,
	this.UnaryStatement,
	// compileWithAccessor
	function(contentBuilder, expression, operand, variable){
		// 追加临时变量名
		contentBuilder.appendString("(" + variable + "=");
		// 提取拥有此方法的对象
		operand.object.extractTo(contentBuilder);
		// 追加临时变量名的结束小括号
		contentBuilder.appendString(")");

		// 如果是中括号属性访问表达式
		if(operand instanceof BracketAccessorExpression){
			// 提取中括号
			operand.property.extractTo(contentBuilder);
		}
		else {
			// 提取点操作符
			contentBuilder.appendContext(operand.context);
			// 提取属性
			contentBuilder.appendContext(operand.property);
		}
		
		// 追加 apply 方法
		contentBuilder.appendString(".apply(" + variable + ",Rexjs.SpreadItem.combine");
		// 调用父类方法
		extractTo.call(expression, contentBuilder);
		// 追加 apply 方法的结束小括号
		contentBuilder.appendString(")");
	},
	// compileWithNew
	function(contentBuilder, expression, operand){
		// 追加 bind 方法
		contentBuilder.appendString("(Function.bind.apply(");
		// 提取该调用的方法
		operand.extractTo(contentBuilder);
		// 追加拓展符编译的方法
		contentBuilder.appendString(",Rexjs.SpreadItem.combine");
		// 追加函数调用的起始小括号
		contentBuilder.appendContext(expression.open);
		// 追加 bind 所指定的 this
		contentBuilder.appendString("void 0,");
		// 提取函数调用参数
		expression.inner.extractTo(contentBuilder);
		// 追加函数调用的结束小括号
		contentBuilder.appendContext(expression.close);
		// 追加 bind 方法的结束小括号和函数立即执行的小括号（注：bind 方法与 apply 不同，不具有立即执行效果）
		contentBuilder.appendString("))()");
	},
	// compileDefault
	function(contentBuilder, expression, operand){
		// 追加 apply
		contentBuilder.appendString("Function.apply.call(");
		// 提取操作对象
		operand.extractTo(contentBuilder);
		// 追加 apply 方法的参数
		contentBuilder.appendString(",void 0,Rexjs.SpreadItem.combine");
		// 调用父类方法
		extractTo.call(expression, contentBuilder);
		// 追加 apply 方法的结束小括号
		contentBuilder.appendString(")");
	}
);

this.CallStatement = function(){
	/**
	 * 函数调用语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CallStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CallStatement = new Rexjs(CallStatement, ECMAScriptStatement);
	
	CallStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context, ECMAScriptErrors.CALL);
				return null;
			}
			
			// 跳出该语句并设置表达式
			this.out().inner.set(this.expression);
			// 返回关闭分组小括号标签
			return this.bindingOf();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回关闭分组小括号标签
			return this.tagOf().separator;
		}
	});
	
	return CallStatement;
}();

this.OpenCallTag = function(OpenParenTag, CallExpression, CallStatement){
	/**
	 * 起始函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCallTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCallTag = new Rexjs(OpenCallTag, OpenParenTag);
	
	OpenCallTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeCallTag;
		},
		// 防止与分组小括号冲突
		order: ECMAScriptOrders.OPEN_CALL,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return parameterSeparatorTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CallExpression(context, statement);
			
			// 设置当前语句
			(
				statements.statement = new CallStatement(statements)
			)
			// 设置表达式
			.expression = new DefaultExpression();
		}
	});
	
	return OpenCallTag;
}(
	this.OpenParenTag,
	this.CallExpression,
	this.CallStatement
);

this.ParameterSeparatorTag = function(CommaTag, CallStatement){
	/**
	 * 函数调用参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ParameterSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ParameterSeparatorTag = new Rexjs(ParameterSeparatorTag, CommaTag);

	ParameterSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});

	return ParameterSeparatorTag;
}(
	this.CommaTag,
	this.CallStatement
);

this.CloseCallTag = function(CloseParenTag){
	/**
	 * 结束函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCallTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCallTag = new Rexjs(CloseCallTag, CloseParenTag);
	
	CloseCallTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseCallTag;
}(
	this.CloseParenTag
);

parameterSeparatorTag = new this.ParameterSeparatorTag();
closeCallTag = new this.CloseCallTag();

}.call(
	this,
	this.BracketAccessorExpression,
	this.UnaryKeywordTag,
	// parameterSeparatorTag
	null,
	// closeCallTag
	null,
	// extractTo
	PartnerExpression.prototype.extractTo
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/call.js"
								);


eval(
									function(){
										// 拓展参数相关
~function(config){

this.SpreadExpression = function(){
	/**
	 * 拓展参数表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function SpreadExpression(context){
		Expression.call(this, context);
	};
	SpreadExpression = new Rexjs(SpreadExpression, Expression);

	SpreadExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译拓展符
			if(config.value){
				// 追加编译拓展符方法
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取参数
				this.operand.extractTo(contentBuilder);
				// 追加拓展符方法的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});

	return SpreadExpression;
}();

this.SpreadStatement = function(){
	/**
	 * 拓展参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SpreadStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SpreadStatement = new Rexjs(SpreadStatement, ECMAScriptStatement);

	SpreadStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 operand
				this.out().operand = this.expression;
			}
		}
	});

	return SpreadStatement;
}();

this.SpreadTag = function(SpreadExpression, SpreadStatement, AccessorExpression){
	/**
	 * 拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function SpreadTag(_type){
		SyntaxTag.call(this, _type);
	};
	SpreadTag = new Rexjs(SpreadTag, SyntaxTag);
	
	SpreadTag.props({
		// 防止与数字、点访问器冲突
		order: ECMAScriptOrders.SPREAD,
		regexp: /\.{3}/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var callExpression = statement.target.expression;

			// 设置当前表达式
			statement.expression = new SpreadExpression(context);
			// 设置当前语句
			statements.statement = new SpreadStatement(statements);

			// 如果已有拓展符
			if(callExpression.spread){
				return;
			}

			switch(false){
				// 如果函数调用表达式的操作对象不是属性表达式
				case callExpression.operand instanceof AccessorExpression:
					break;

				// 如果已经存在变量名
				case callExpression.variable === "":
					break;

				default:
					// 生成变量名
					callExpression.variable = statements.collections.generate();
					break;
			}

			// 设置 call 表达式 spread 属性，表示有拓展符
			callExpression.spread = true;
			// 告知 call 表达式，需要编译 spread
			callExpression.needCompileSpread = config.value;
		}
	});
	
	return SpreadTag;
}(
	this.SpreadExpression,
	this.SpreadStatement,
	this.AccessorExpression
);

}.call(
	this,
	// config
	ECMAScriptConfig.addBaseConfig("spread")
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/spread.js"
								);


eval(
									function(){
										// 解构表达式相关
~function(config){

this.DestructibleExpression = function(){
	/**
	 * 可解构的表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function DestructibleExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	DestructibleExpression = new Rexjs(DestructibleExpression, PartnerExpression);

	DestructibleExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		declaration: false,
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(){},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(){}
	});

	return DestructibleExpression;
}();

this.DestructuringExpression = function(AssignableExpression){
	/**
	 * 解构表达式
	 * @param {Context} context - 标签上下文
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringExpression(context, origin){
		AssignableExpression.call(this, context);

		this.origin = origin;
	};
	DestructuringExpression = new Rexjs(DestructuringExpression, AssignableExpression);

	DestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {Expression} expression - 解构当前项
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(){},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 直接提取源表达式
			this.origin.extractTo(contentBuilder);
		},
		origin: null
	});

	return DestructuringExpression;
}(
	this.AssignableExpression
);

this.DestructuringItemExpression = function(DestructuringExpression){
	/**
	 * 解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringItemExpression(origin){
		DestructuringExpression.call(this, origin.context, origin);
	};
	DestructuringItemExpression = new Rexjs(DestructuringItemExpression, DestructuringExpression);

	DestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();

			// 提取源表达式到临时内容生成器
			this.origin.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		},
		/**
		 * 获取嵌套类型解构项的变量名生成器
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		getVariableBuilder: function(contentBuilder, anotherBuilder){
			// 根据长度判断
			switch(this.origin.inner.length){
				// 如果是 0，说明没有解构内容，不需要解构
				case 0:
					return null;

				// 如果是 1，说明可以直接用 $Rexjs_0[0] 形式直接使用，不需要单独使用变量名记录
				case 1:
					return anotherBuilder;
			}

			var variable = this.variable, builder = new ContentBuilder();

			// 追加变量名到临时内容生成器
			builder.appendString(variable);

			// 追加变量名的赋值操作
			contentBuilder.appendString(
				"," + variable + "=" + anotherBuilder.result
			);

			return builder;
		},
		rest: false,
		variable: ""
	});

	return DestructuringItemExpression;
}(
	this.DestructuringExpression
);

this.DestructuringDefaultItemExpression = function(DestructuringItemExpression){
	/**
	 * 解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function DestructuringDefaultItemExpression(origin, statements){
		DestructuringItemExpression.call(this, origin);

		// 如果需要解析解构表达式
		if(config.value){
			// 给刚生成的解构赋值表达式设置变量名
			this.variable = statements.collections.generate();
		}
	};
	DestructuringDefaultItemExpression = new Rexjs(DestructuringDefaultItemExpression, DestructuringItemExpression);

	DestructuringDefaultItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 将默认值表达式转换为三元表达式
			this.toTernary(this.origin, contentBuilder, anotherBuilder);
		},
		/**
		 * 将默认值表达式转换为三元表达式
		 * @param {BinaryExpression} expression - 默认值二元表达式
		 * @param {ContentBuilder} contentBuilder - 主内容生成器
		 * @param {ContentBuilder} valueBuilder - 属性值生成器
		 */
		toTernary: function(expression, contentBuilder, valueBuilder){
			var variable = this.variable, leftBuilder = new ContentBuilder(), rightBuilder = new ContentBuilder();

			// 提取左侧表达式到临时内容生成器
			expression.left.extractTo(leftBuilder);
			// 提取右侧表达式到临时内容生成器
			expression.right.extractTo(rightBuilder);

			// 追加赋值操作
			contentBuilder.appendString(
				"," + leftBuilder.result + "=(" +
					variable + "=" + valueBuilder.result + "," +
					// 三元表达式，判断是否为 undefined
					variable + "===void 0?" +
						rightBuilder.result +
						":" + variable +
				")"
			);
		}
	});

	return DestructuringDefaultItemExpression;
}(
	this.DestructuringItemExpression
);

}.call(
	this,
	// config
	ECMAScriptConfig.addBaseConfig("destructuring")
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/destructuring.js"
								);


eval(
									function(){
										// 数组相关
~function(DestructibleExpression, DestructuringExpression, DestructuringItemExpression, DestructuringDefaultItemExpression, IdentifierExpression, AssignableExpression, BinaryExpression, BasicAssignmentTag, closeArrayTag, arrayItemSeparatorTag, destructItem){

this.ArrayDestructuringExpression = function(){
	/**
	 * 数组解构表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ArrayDestructuringExpression(origin){
		DestructuringExpression.call(this, origin.open, origin);
	};
	ArrayDestructuringExpression = new Rexjs(ArrayDestructuringExpression, DestructuringExpression);

	ArrayDestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(destructItem, contentBuilder, anotherBuilder);
		}
	});

	return ArrayDestructuringExpression;
}();

this.ArrayDestructuringItemExpression = function(){
	/**
	 * 数组解构项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	function ArrayDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ArrayDestructuringItemExpression = new Rexjs(ArrayDestructuringItemExpression, DestructuringItemExpression);

	ArrayDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(
				destructItem,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, anotherBuilder)
			);
		}
	});

	return ArrayDestructuringItemExpression;
}();

this.ArrayRestDestructuringItemExpression = function(){
	/**
	 * 数组省略解构项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	function ArrayRestDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ArrayRestDestructuringItemExpression = new Rexjs(ArrayRestDestructuringItemExpression, DestructuringItemExpression);

	ArrayRestDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();
			
			// 提取源表达式到临时内容生成器
			this.origin.operand.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		},
		rest: true
	});

	return ArrayRestDestructuringItemExpression;
}();

this.ArrayExpression = function(ArrayDestructuringExpression, ArrayDestructuringItemExpression, ArrayRestDestructuringItemExpression, SpreadExpression, config, extractTo, collected, error){
	/**
	 * 数组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArrayExpression(open){
		DestructibleExpression.call(this, open);
	};
	ArrayExpression = new Rexjs(ArrayExpression, DestructibleExpression);

	ArrayExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(parser){
			var inner = this.inner;

			// 遍历
			for(var i = inner.min, j = inner.length;i < j;i++){
				var expression = inner[i];

				switch(true){
					// 如果是可赋值的表达式，即 标识符 或 属性访问器
					case expression instanceof AssignableExpression:
						// 如果已经被收集到常量内
						if(collected(parser, expression)){
							// collected 方法内已经报错
							return;
						}

						// 转化表达式
						expression = new DestructuringItemExpression(expression);
						break;

					// 如果是可解构的表达式
					case expression instanceof DestructibleExpression:
						expression = expression.toDestructuringItem(parser);
						break;

					// 如果是空表达式
					case expression instanceof EmptyExpression:
						continue;
					
					// 如果是二元运算表达式
					case expression instanceof BinaryExpression:
						// 如果二元运算表达式的标签是赋值符号
						if(expression.context.tag instanceof BasicAssignmentTag){
							// 如果二元表达式左侧不是解构表达式
							if(expression.left instanceof DestructuringExpression === false){
								// 转化表达式
								expression = new DestructuringDefaultItemExpression(expression, parser.statements);
								break;
							}
						}

						// 报错
						error(parser, expression);
						return;

					// 如果是拓展表达式
					case expression instanceof SpreadExpression:
						// 如果不是数组最后一项
						if(i !== j - 1){
							// 报错
							error(parser, expression, "REST_ELEMENT");
							return;
						}

						// 如果是可赋值的表达式，即 标识符 或 属性访问器
						if(expression.operand instanceof AssignableExpression){
							// 如果已经被收集到常量内
							if(collected(parser, expression.operand)){
								// collected 方法内已经报错
								return;
							}

							// 转化表达式
							expression = new ArrayRestDestructuringItemExpression(expression);
							break;
						}

						// 报错
						error(parser, expression.operand);
						return;

					default:
						// 报错
						error(parser, expression);
						return;
				}

				// 重新设置表达式
				inner[i] = inner.latest = expression;
			}
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译拓展符
			if(this.needCompileSpread){
				// 追加拓展项合并方法字符串
				contentBuilder.appendString(
					"(Rexjs.SpreadItem.combineBy("
				);

				// 调用父类方法
				extractTo.call(this, contentBuilder);

				// // 追加拓展项合并方法的结束小括号
				contentBuilder.appendString(
					"))"
				);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		needCompileSpread: false,
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(parser){
			// 转换内部表达式
			this.convert(parser, this.inner);
			return new ArrayDestructuringExpression(this);
		},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(parser){
			var inner = this.inner, expression = new ArrayDestructuringItemExpression(this);

			// 如果需要解析解构表达式 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(config.value && inner.length > 1){
				var collections = parser.statements.collections;

				// 给刚生成的解构赋值表达式设置变量名
				expression.variable = (
					// 如果是声明形式的解构赋值
					this.declaration ?
						// 只需提供，不用在语句块进行定义
						collections.provide() :
						// 需要提供并定义
						collections.generate()
				);
			}

			// 转换内部表达式
			this.convert(parser, this.inner);
			return expression;
		}
	});

	return ArrayExpression;
}(
	this.ArrayDestructuringExpression,
	this.ArrayDestructuringItemExpression,
	this.ArrayRestDestructuringItemExpression,
	this.SpreadExpression,
	// config
	ECMAScriptConfig.destructuring,
	DestructibleExpression.prototype.extractTo,
	// collected
	function(parser, expression){
		// 如果是标识符表达式
		if(expression instanceof IdentifierExpression){
			var context = expression.context;

			// 判断是否收集到常量中
			return context.tag.collected(parser, context, parser.statements);
		}

		return false;
	},
	// error
	function(parser, expression, _errorName){
		parser.error(
			expression.context,
			_errorName ? ECMAScriptErrors[_errorName] : null
		);
	}
);

this.ArrayStatement = function(){
	/**
	 * 数组语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArrayStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArrayStatement = new Rexjs(ArrayStatement, ECMAScriptStatement);

	ArrayStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 判断标签内容
			switch(context.content){
				case ",":
					// 跳出语句并添加表达式
					this.out().inner.add(this.expression);
					// 返回标签
					return this.tagOf().separator;

				case "]":
					// 跳出语句并设置表达式
					this.out().inner.set(this.expression);
					// 返回结束标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回标签
			return this.tagOf().separator;
		}
	});

	return ArrayStatement;
}();

this.OpenArrayTag = function(OpenBracketTag, ArrayExpression, ArrayStatement){
	/**
	 * 起始数组标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrayTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenArrayTag = new Rexjs(OpenArrayTag, OpenBracketTag);
	
	OpenArrayTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrayTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return arrayItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArrayContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ArrayExpression(context);
			// 设置当前语句
			statements.statement = new ArrayStatement(statements);
		}
	});
	
	return OpenArrayTag;
}(
	this.OpenBracketTag,
	this.ArrayExpression,
	this.ArrayStatement
);

this.ArrayItemSeparatorTag = function(CommaTag, ArrayStatement){
	/**
	 * 数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArrayItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArrayItemSeparatorTag = new Rexjs(ArrayItemSeparatorTag, CommaTag);
	
	ArrayItemSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArrayContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			(
				statements.statement = new ArrayStatement(statements)
			)
			// 设置语句表达式为空表达式，目的是与默认表达式区分，因为空数组是默认表达式，可以使用 set 来过滤，而其他空项不应该被过滤，所以使用空表达式
			.expression = new EmptyExpression(null);
		}
	});
	
	return ArrayItemSeparatorTag;
}(
	this.CommaTag,
	this.ArrayStatement
);

this.CloseArrayTag = function(CloseBracketTag){
	/**
	 * 结束数组标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrayTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseArrayTag = new Rexjs(CloseArrayTag, CloseBracketTag);
	
	CloseArrayTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructibleExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseArrayTag;
}(
	this.CloseBracketTag
);

arrayItemSeparatorTag = new this.ArrayItemSeparatorTag();
closeArrayTag = new this.CloseArrayTag();

}.call(
	this,
	this.DestructibleExpression,
	this.DestructuringExpression,
	this.DestructuringItemExpression,
	this.DestructuringDefaultItemExpression,
	this.IdentifierExpression,
	this.AssignableExpression,
	this.BinaryExpression,
	this.BasicAssignmentTag,
	// closeArrayTag
	null,
	// arrayItemSeparatorTag
	null,
	// destructItem
	function(expression, contentBuilder, anotherBuilder, index){
		// 如果是空表达式
		if(expression.empty){
			return;
		}

		// 初始化变量名内容生成器
		var builder = new ContentBuilder();

		// 追加当前项的变量名
		builder.appendString(
			anotherBuilder.result + (
				expression.rest ?
					".slice(" + index + ")" :
					"[" + index + "]"
			)
		);

		// 提取并编译表达式文本内容
		expression.compileTo(contentBuilder, builder);
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/array.js"
								);


eval(
									function(){
										// 数组拓展项相关
~function(config){

this.ArraySpreadItemExpression = function(SpreadExpression){
	/**
	 * 数组拓展项表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArraySpreadItemExpression(context){
		SpreadExpression.call(this, context);
	};
	ArraySpreadItemExpression = new Rexjs(ArraySpreadItemExpression, SpreadExpression);

	ArraySpreadItemExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译拓展符
			if(config.value){
				// 追加初始化拓展项
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取操作对象
				this.operand.extractTo(contentBuilder);
				// 追加初始化拓展项的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.operand.extractTo(contentBuilder);
		}
	});

	return ArraySpreadItemExpression;
}(
	this.SpreadExpression
);

this.ArraySpreadTag = function(SpreadTag, ArraySpreadItemExpression, SpreadStatement){
	/**
	 * 数组拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArraySpreadTag(_type){
		SpreadTag.call(this, _type);
	};
	ArraySpreadTag = new Rexjs(ArraySpreadTag, SpreadTag);
	
	ArraySpreadTag.props({
		/**
		 * 获取是否需要编译
		 */
		get compile(){
			return config.value;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 告知数组表达式，是否需要编译拓展符
			statement.target.expression.needCompileSpread = config.value;

			// 设置当前表达式
			statement.expression = new ArraySpreadItemExpression(context);
			// 设置当前语句
			statements.statement = new SpreadStatement(statements);
		}
	});
	
	return ArraySpreadTag;
}(
	this.SpreadTag,
	this.ArraySpreadItemExpression,
	this.SpreadStatement
);

}.call(
	this,
	// config
	ECMAScriptConfig.addBaseConfig("arraySpreadItem")
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/array-spread-item.js"
								);


eval(
									function(){
										// 数组解构赋值相关
~function(BasicAssignmentTag, variableDeclarationArrayItemSeparatorTag, closeDeclarationArrayTag){

this.DeclarationArrayExpression = function(ArrayExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} arrayOf - 该数组所属的声明表达式
	 */
	function DeclarationArrayExpression(open, arrayOf){
		ArrayExpression.call(this, open);

		this.arrayOf = arrayOf;
	};
	DeclarationArrayExpression = new Rexjs(DeclarationArrayExpression, ArrayExpression);

	DeclarationArrayExpression.props({
		arrayOf: null,
		declaration: true,
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){}
	});

	return DeclarationArrayExpression;
}(
	this.ArrayExpression
);

this.DeclarationArrayItemAssignmentReadyStatement = function(){
	/**
	 * 变量声明数组项赋值准备语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationArrayItemAssignmentReadyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DeclarationArrayItemAssignmentReadyStatement = new Rexjs(DeclarationArrayItemAssignmentReadyStatement, ECMAScriptStatement);
	
	DeclarationArrayItemAssignmentReadyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			this.out();
			return null;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句
				this.out();
			}

			return null;
		}
	});

	return DeclarationArrayItemAssignmentReadyStatement;
}();

this.OpenDeclarationArrayTag = function(OpenArrayTag, DeclarationArrayExpression, ArrayStatement){
	/**
	 * 变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDeclarationArrayTag(_type){
		OpenArrayTag.call(this, _type);
	};
	OpenDeclarationArrayTag = new Rexjs(OpenDeclarationArrayTag, OpenArrayTag);
	
	OpenDeclarationArrayTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDeclarationArrayTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return variableDeclarationArrayItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new DeclarationArrayExpression(context, statement.target.expression);
			// 设置当前语句
			statements.statement = new ArrayStatement(statements);
		}
	});

	return OpenDeclarationArrayTag;
}(
	this.OpenArrayTag,
	this.DeclarationArrayExpression,
	this.ArrayStatement
);

this.DeclarationArrayItemTag = function(VariableDeclarationTag, DestructuringItemExpression, IdentifierExpression){
	/**
	 * 变量声明数组项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	DeclarationArrayItemTag = new Rexjs(DeclarationArrayItemTag, VariableDeclarationTag);
	
	DeclarationArrayItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
				context.tag = statement.target.expression.arrayOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);

			// 设置当前表达式
			statement.expression = new DestructuringItemExpression(
				new IdentifierExpression(context)
			);
		}
	});
	
	return DeclarationArrayItemTag;
}(
	this.VariableDeclarationTag,
	this.DestructuringItemExpression,
	this.IdentifierExpression
);

this.DeclarationArrayItemSeparatorTag = function(ArrayItemSeparatorTag){
	/**
	 * 变量声明数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemSeparatorTag(_type){
		ArrayItemSeparatorTag.call(this, _type);
	};
	DeclarationArrayItemSeparatorTag = new Rexjs(DeclarationArrayItemSeparatorTag, ArrayItemSeparatorTag);
	
	DeclarationArrayItemSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
		}
	});

	return DeclarationArrayItemSeparatorTag;
}(
	this.ArrayItemSeparatorTag
);

this.DeclarationArrayItemAssignmentTag = function(DeclarationArrayItemAssignmentReadyStatement, DestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明数组项赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DeclarationArrayItemAssignmentTag = new Rexjs(DeclarationArrayItemAssignmentTag, BasicAssignmentTag);
	
	DeclarationArrayItemAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化赋值准备语句
			var readyStatement = new DeclarationArrayItemAssignmentReadyStatement(statements);

			// 设置准备语句的表达式
			readyStatement.expression = statement.expression;
			// 设置当前语句
			statements.statement = readyStatement;
			
			// 调用父类访问器
			visitor.call(this, parser, context, readyStatement, statements);

			// 覆盖当前语句的表达式
			statement.expression = new DestructuringDefaultItemExpression(readyStatement.expression, statements);
		}
	});

	return DeclarationArrayItemAssignmentTag;
}(
	this.DeclarationArrayItemAssignmentReadyStatement,
	this.DestructuringDefaultItemExpression,
	BasicAssignmentTag.prototype.visitor
);

this.CloseDeclarationArrayTag = function(CloseArrayTag){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDeclarationArrayTag(_type){
		CloseArrayTag.call(this, _type);
	};
	CloseDeclarationArrayTag = new Rexjs(CloseDeclarationArrayTag, CloseArrayTag);
	
	CloseDeclarationArrayTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});
	
	return CloseDeclarationArrayTag;
}(
	this.CloseArrayTag
);

variableDeclarationArrayItemSeparatorTag = new this.DeclarationArrayItemSeparatorTag();
closeDeclarationArrayTag = new this.CloseDeclarationArrayTag();

}.call(
	this,
	this.BasicAssignmentTag,
	// variableDeclarationArrayItemSeparatorTag
	null,
	// closeDeclarationArrayTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-array.js"
								);


eval(
									function(){
										// 声明数组省略项相关
~function(SpreadStatement){

this.DeclarationArrayRestStatement = function(out){
	/**
	 * 变量声明数组省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationArrayRestStatement(statements){
		SpreadStatement.call(this, statements);
	};
	DeclarationArrayRestStatement = new Rexjs(DeclarationArrayRestStatement, SpreadStatement);

	DeclarationArrayRestStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			return out.call(this).origin;
		}
	});

	return DeclarationArrayRestStatement;
}(
	SpreadStatement.prototype.out
);

this.DeclarationArrayRestItemTag = function(DeclarationArrayItemTag, IdentifierExpression){
	/**
	 * 变量声明数组省略项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestItemTag(_type){
		DeclarationArrayItemTag.call(this, _type);
	};
	DeclarationArrayRestItemTag = new Rexjs(DeclarationArrayRestItemTag, DeclarationArrayItemTag);

	DeclarationArrayRestItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
				context.tag = statement.target.target.expression.arrayOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);

			// 设置当前表达式
			statement.expression = new IdentifierExpression(context);
		}
	});

	return DeclarationArrayRestItemTag;
}(
	this.DeclarationArrayItemTag,
	this.IdentifierExpression
);

this.DeclarationArrayRestTag = function(ArraySpreadTag, ArrayRestDestructuringItemExpression, ArraySpreadItemExpression, DeclarationArrayRestStatement){
	/**
	 * 变量声明数组省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestTag(_type){
		ArraySpreadTag.call(this, _type);
	};
	DeclarationArrayRestTag = new Rexjs(DeclarationArrayRestTag, ArraySpreadTag);
	
	DeclarationArrayRestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ArrayRestDestructuringItemExpression(
				new ArraySpreadItemExpression(context)
			);

			// 设置当前语句
			statements.statement = new DeclarationArrayRestStatement(statements);
		}
	});

	return DeclarationArrayRestTag;
}(
	this.ArraySpreadTag,
	this.ArrayRestDestructuringItemExpression,
	this.ArraySpreadItemExpression,
	this.DeclarationArrayRestStatement
);

this.DeclarationArrayRestItemSeparatorTag = function(DeclarationArrayItemSeparatorTag){
	/**
	 * 变量声明数组省略项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestItemSeparatorTag(_type){
		DeclarationArrayItemSeparatorTag.call(this, _type);
	};
	DeclarationArrayRestItemSeparatorTag = new Rexjs(DeclarationArrayRestItemSeparatorTag, DeclarationArrayItemSeparatorTag);
	
	DeclarationArrayRestItemSeparatorTag.props({
		$type: TYPE_MATCHABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 报错
			parser.error(statement.target.expression.context, ECMAScriptErrors.REST_ELEMENT);
		}
	});

	return DeclarationArrayRestItemSeparatorTag;
}(
	this.DeclarationArrayItemSeparatorTag
);

}.call(
	this,
	this.SpreadStatement
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-array-rest-item.js"
								);


eval(
									function(){
										// 变量声明数组项标签相关
~function(CloseDeclarationArrayTag, closeNestedDeclarationArrayItemTag){

this.OpenNestedDeclarationArrayItemTag = function(OpenDeclarationArrayTag, DeclarationArrayExpression, ArrayStatement){
	/**
	 * 嵌套的变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenNestedDeclarationArrayItemTag(_type){
		OpenDeclarationArrayTag.call(this, _type);
	};
	OpenNestedDeclarationArrayItemTag = new Rexjs(OpenNestedDeclarationArrayItemTag, OpenDeclarationArrayTag);
	
	OpenNestedDeclarationArrayItemTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeNestedDeclarationArrayItemTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new DeclarationArrayExpression(
				context,
				statement.target.expression.arrayOf
			);

			// 设置当前语句
			statements.statement = new ArrayStatement(statements);
		}
	});

	return OpenNestedDeclarationArrayItemTag;
}(
	this.OpenDeclarationArrayTag,
	this.DeclarationArrayExpression,
	this.ArrayStatement
);

this.CloseNestedDeclarationArrayItemTag = function(visitor){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseNestedDeclarationArrayItemTag(_type){
		CloseDeclarationArrayTag.call(this, _type);
	};
	CloseNestedDeclarationArrayItemTag = new Rexjs(CloseNestedDeclarationArrayItemTag, CloseDeclarationArrayTag);
	
	CloseNestedDeclarationArrayItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseNestedDeclarationArrayItemTag;
}(
	CloseDeclarationArrayTag.prototype.visitor
);

closeNestedDeclarationArrayItemTag = new this.CloseNestedDeclarationArrayItemTag();

}.call(
	this,
	this.CloseDeclarationArrayTag,
	// closeNestedDeclarationArrayItemTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/nested-declaration-array-item.js"
								);


eval(
									function(){
										// 语句块相关
~function(closeBlockTag){

this.BlockExpression = function(){
	/**
	 * 语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function BlockExpression(open){
		PartnerExpression.call(this, open);
	};
	BlockExpression = new Rexjs(BlockExpression, PartnerExpression);
	
	BlockExpression.props({
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});
	
	return BlockExpression;
}();

this.DefaultBlockBodyExpression = function(){
	/**
	 * 默认语句块主体表达式
	 */
	function DefaultBlockBodyExpression(){
		DefaultExpression.call(this);
	};
	DefaultBlockBodyExpression = new Rexjs(DefaultBlockBodyExpression, DefaultExpression);

	DefaultBlockBodyExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return DefaultBlockBodyExpression;
}();

this.BlockBodyStatement = function(DefaultBlockBodyExpression){
	/**
	 * 语句块主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BlockBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BlockBodyStatement = new Rexjs(BlockBodyStatement, ECMAScriptStatement);
	
	BlockBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				return null;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		expression: new DefaultBlockBodyExpression(),
		/**
		 * 跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		out: function(parser){
			// 返回语句块表达式
			return (
				// 恢复语句块
				parser.statements = this.statements.target
			)
			.statement
			.expression;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.context.tag;
		}
	});
	
	return BlockBodyStatement;
}(
	this.DefaultBlockBodyExpression
);

this.BlockBodyStatements = function(ECMAScriptStatements, BlockBodyStatement){
	/**
	 * 语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function BlockBodyStatements(collections){
		ECMAScriptStatements.call(this, collections);
	};
	BlockBodyStatements = new Rexjs(BlockBodyStatements, ECMAScriptStatements);
	
	BlockBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 返回外层语句块的处理结果
			return this.target.applySuper(parser, context);
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 返回外层语句块的处理结果
			return this.target.applySuperCall(parser, context, open);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BlockBodyStatement(this);
		},
		scope: ECMAScriptStatements.SCOPE_BLOCK
	});
	
	return BlockBodyStatements;
}(
	this.ECMAScriptStatements,
	this.BlockBodyStatement
);

this.OpenBlockTag = function(OpenBraceTag, BlockExpression, BlockBodyStatements, ECMAScriptVariableCollections){
	/**
	 * 起始语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBlockTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenBlockTag = new Rexjs(OpenBlockTag, OpenBraceTag);
	
	OpenBlockTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockTag;
		},
		/**
		 * 进入语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			(
				parser.statements = new BlockBodyStatements(
					// 初始化变量名收集器集合
					new ECMAScriptVariableCollections(
						statements.collections.index
					)
				)
			)
			.target = statements;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new BlockExpression(context);
			
			// 进入语句块内部
			this.in(parser, statements);
		}
	});
	
	return OpenBlockTag;
}(
	this.OpenBraceTag,
	this.BlockExpression,
	this.BlockBodyStatements,
	this.ECMAScriptVariableCollections
);

this.CloseBlockTag = function(CloseBraceTag){
	/**
	 * 结束语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBlockTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseBlockTag = new Rexjs(CloseBlockTag, CloseBraceTag);
	
	CloseBlockTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseBlockTag;
}(
	this.CloseBraceTag
);

closeBlockTag = new this.CloseBlockTag();

}.call(
	this,
	// closeBlockTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/block.js"
								);


eval(
									function(){
										// 语句块组件相关
~function(OpenBlockTag, CloseBlockTag, closeBlockComponentTag){

this.BlockComponentStatement = function(){
	/**
	 * 语句块组件语句，目的是为其他表达式提供模拟环境
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BlockComponentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BlockComponentStatement = new Rexjs(BlockComponentStatement, ECMAScriptStatement);

	BlockComponentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 报错，在这之前，应该主动跳出该语句
			parser.error(context);
		}
	});

	return BlockComponentStatement;
}();

this.OpenBlockComponentTag = function(BlockComponentStatement, visitor){
	/**
	 * switch 主体起始标签
	 */
	function OpenBlockComponentTag(_type){
		OpenBlockTag.call(this, _type);
	};
	OpenBlockComponentTag = new Rexjs(OpenBlockComponentTag, OpenBlockTag);
	
	OpenBlockComponentTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockComponentTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(
				this,
				parser,
				context,
				// 设置当前语句
				statements.statement = new BlockComponentStatement(statements),
				statements
			);
		}
	});
	
	return OpenBlockComponentTag;
}(
	this.BlockComponentStatement,
	OpenBlockTag.prototype.visitor
);

this.CloseBlockComponentTag = function(visitor){
	/**
	 * switch 主体起始标签
	 */
	function CloseBlockComponentTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseBlockComponentTag = new Rexjs(CloseBlockComponentTag, CloseBlockTag);
	
	CloseBlockComponentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 跳出语句并设置表达式的 block 属性
			statement.out().block = statement.expression;
		}
	});
	
	return CloseBlockComponentTag;
}(
	CloseBlockTag.prototype.visitor
);

closeBlockComponentTag = new this.CloseBlockComponentTag();

}.call(
	this,
	this.OpenBlockTag,
	this.CloseBlockTag,
	// closeBlockComponentTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/block-component.js"
								);


eval(
									function(){
										// 函数表达式相关
~function(){

this.FunctionExpression = function(config){
	/**
	 * 函数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionExpression(context){
		Expression.call(this, context);
	};
	FunctionExpression = new Rexjs(FunctionExpression, Expression);

	FunctionExpression.props({
		arguments: null,
		/**
		 * 获取表达式主体语句块
		 */
		get block(){
			return this.body;
		},
		/**
		 * 设置表达式主体语句块
		 * @param {BlockExpression} value - 需要设置的表达式主体语句块
		 */
		set block(value){
			this.body = value;
		},
		body: null,
		head: null,
		generator: null,
		name: new DefaultExpression(),
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var defaultArgumentBuilder = new ContentBuilder();

			// 提取函数头部
			this.head.extractTo(contentBuilder);
			// 提取函数名称
			this.name.extractTo(contentBuilder);
			// 提取函数参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		}
	});

	return FunctionExpression;
}(
	// config
	ECMAScriptConfig.addBaseConfig("generator")
);

this.FunctionTag = function(FunctionExpression){
	/**
	 * 函数标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionTag(_type){
		SyntaxTag.call(this, _type);
	};
	FunctionTag = new Rexjs(FunctionTag, SyntaxTag);

	FunctionTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /function/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			(
				statement.expression = new FunctionExpression(context)
			)
			// 设置函数表达式头部
			.head = new Expression(context);
		}
	});

	return FunctionTag;
}(
	this.FunctionExpression
);

this.FunctionNameTag = function(VariableDeclarationTag, FunctionDeclarationExpression){
	/**
	 * 函数名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	FunctionNameTag = new Rexjs(FunctionNameTag, VariableDeclarationTag);

	FunctionNameTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionArgumentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的名称
			statement.expression.name = new Expression(context);
		}
	});

	return FunctionNameTag;
}(
	this.VariableDeclarationTag,
	this.FunctionDeclarationExpression
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/function.js"
								);


eval(
									function(){
										// 函数声明标签相关
~function(FunctionNameTag){

this.FunctionDeclarationExpression = function(FunctionExpression){
	/**
	 * 函数声明表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionDeclarationExpression(context){
		FunctionExpression.call(this, context);

		this.head = new Expression(context);
	};
	FunctionDeclarationExpression = new Rexjs(FunctionDeclarationExpression, FunctionExpression);

	FunctionDeclarationExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return FunctionDeclarationExpression;
}(
	this.FunctionExpression
);

this.FunctionDeclarationTag = function(FunctionTag, FunctionDeclarationExpression){
	/**
	 * 函数声明标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionDeclarationTag(_type){
		FunctionTag.call(this, _type);
	};
	FunctionDeclarationTag = new Rexjs(FunctionDeclarationTag, FunctionTag);

	FunctionDeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionDeclarationContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new FunctionDeclarationExpression(context);
		}
	});

	return FunctionDeclarationTag;
}(
	this.FunctionTag,
	this.FunctionDeclarationExpression
);

this.FunctionVariableTag = function(visitor){
	/**
	 * 函数变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionVariableTag(_type){
		FunctionNameTag.call(this, _type);
	};
	FunctionVariableTag = new Rexjs(FunctionVariableTag, FunctionNameTag);

	FunctionVariableTag.props({
		order: ECMAScriptOrders.FUNCTION_VARIABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
		
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return FunctionVariableTag;
}(
	FunctionNameTag.prototype.visitor
);

}.call(
	this,
	this.FunctionNameTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/function-declaration.js"
								);


eval(
									function(){
										// 函数生成器符号相关
~function(){

this.GeneratorHeaderExpression = function(){
	function GeneratorHeaderExpression(context){
		Expression.call(this, context);
	};
	GeneratorHeaderExpression = new Rexjs(GeneratorHeaderExpression, Expression);


	return GeneratorHeaderExpression;
}();

this.GeneratorTag = function(){
	/**
	 * 函数生成器标签
	 * @param {Number} _type - 标签类型
	 */
	function GeneratorTag(_type){
		SyntaxTag.call(this, _type);
	};
	GeneratorTag = new Rexjs(GeneratorTag, SyntaxTag);

	GeneratorTag.props({
		regexp: /\*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的 generator 属性
			statement.expression.generator = context;
		}
	});

	return GeneratorTag;
}();

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/generator.js"
								);


eval(
									function(){
										// 函数参数表达式相关
~function(argumentSeparatorTag, closeArgumentsTag){

this.ArgumentsExpression = function(VariableCollection){
	/**
	 * 函数参数列表表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArgumentsExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
		this.collection = new VariableCollection();
	};
	ArgumentsExpression = new Rexjs(ArgumentsExpression, PartnerExpression);

	ArgumentsExpression.props({
		collection: null
	});

	return ArgumentsExpression;
}(
	Rexjs.VariableCollection
);

this.ArgumentExpression = function(IdentifierExpression){
	/**
	 * 参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ArgumentExpression(context){
		IdentifierExpression.call(this, context);
	};
	ArgumentExpression = new Rexjs(ArgumentExpression, IdentifierExpression);

	return ArgumentExpression;
}(
	this.IdentifierExpression
);

this.ArgumentStatement = function(){
	/**
	 * 参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArgumentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArgumentStatement = new Rexjs(ArgumentStatement, ECMAScriptStatement);

	ArgumentStatement.props({
		expression: new DefaultExpression(),
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并获取 inner
			var inner = this.out().arguments.inner;

			// 判断标签内容
			switch(context.content){
				// 如果是逗号（参数名上下文只允许接等于号赋值标签，所以逗号会进入 catch）
				case ",":
					// 添加参数表达式
					inner.add(this.expression);
					// 返回分隔符标签
					return this.tagOf().separator;

				// 如果是结束小括号，则说明是
				case ")":
					// 设置参数表达式（空参数，是默认表达式，要用 set 方法）
					inner.set(this.expression);
					// 返回参数结束小括号标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加参数表达式
			this.out().arguments.inner.add(this.expression);
			// 返回分隔符标签
			return this.tagOf().separator;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.arguments.open.tag;
		}
	});

	return ArgumentStatement;
}();

this.OpenArgumentsTag = function(OpenParenTag, ArgumentsExpression, ArgumentStatement){
	/**
	 * 起始函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArgumentsTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenArgumentsTag = new Rexjs(OpenArgumentsTag, OpenParenTag);

	OpenArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArgumentsTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return argumentSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArgumentsContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的的参数
			statement.expression.arguments = new ArgumentsExpression(context);
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return OpenArgumentsTag;
}(
	this.OpenParenTag,
	this.ArgumentsExpression,
	this.ArgumentStatement
);

this.ArgumentNameTag = function(VariableDeclarationTag, ArgumentExpression){
	/**
	 * 参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ArgumentNameTag = new Rexjs(ArgumentNameTag, VariableDeclarationTag);

	ArgumentNameTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {VariableCollection} collection - 参数名收集器
		 */
		collectTo: function(parser, context, collection){
			var content = context.content;

			// 如果已经定义，说明是重复的参数名
			if(collection.contains(content)){
				// 报错
				parser.error(context, ECMAScriptErrors.DUPLICATE_PARAMETER_NAME);
				return;
			}

			// 参数列表收集变量名
			collection.collect(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statement.target.expression.arguments.collection);

			// 设置当前表达式
			statement.expression = new ArgumentExpression(context);
		}
	});

	return ArgumentNameTag;
}(
	this.VariableDeclarationTag,
	this.ArgumentExpression
);

this.ArgumentSeparatorTag = function(CommaTag, ArgumentStatement){
	/**
	 * 参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArgumentSeparatorTag = new Rexjs(ArgumentSeparatorTag, CommaTag);

	ArgumentSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentSeparatorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return ArgumentSeparatorTag;
}(
	this.CommaTag,
	this.ArgumentStatement
);

this.CloseArgumentsTag = function(CloseParenTag){
	/**
	 * 结束函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArgumentsTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseArgumentsTag = new Rexjs(CloseArgumentsTag, CloseParenTag);

	CloseArgumentsTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionBodyTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置参数表达式的 close 属性
			statement.expression.arguments.close = context;
		}
	});

	return CloseArgumentsTag;
}(
	this.CloseParenTag
);

argumentSeparatorTag = new this.ArgumentSeparatorTag();
closeArgumentsTag = new this.CloseArgumentsTag();

}.call(
	this,
	// argumentSeparatorTag
	null,
	// closeArgumentsTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/argument.js"
								);


eval(
									function(){
										// 默认函数参数相关
~function(BasicAssignmentTag){

this.DefaultArgumentExpression = function(ArgumentExpression, config){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultArgumentExpression(context){
		ArgumentExpression.call(this, context);
	};
	DefaultArgumentExpression = new Rexjs(DefaultArgumentExpression, ArgumentExpression);

	DefaultArgumentExpression.props({
		assignment: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译默认参数
			if(config.value){
				var context = this.context;

				// 追加参数名至 contentBuilder
				contentBuilder.appendContext(context);

				// 追加参数名至 anotherBuilder
				anotherBuilder.appendContext(context);
				// 判断是否为 undefined
				anotherBuilder.appendString("===void 0&&(");

				// 将赋值表达式提取至临时生成器
				this.assignment.extractTo(anotherBuilder);
				// 再对临时生成器添加分号
				anotherBuilder.appendString(");");
				return;
			}

			// 直接正式提取赋值表达式
			this.assignment.extractTo(contentBuilder);
		}
	});

	return DefaultArgumentExpression;
}(
	this.ArgumentExpression,
	// config
	ECMAScriptConfig.addBaseConfig("defaultArgument")
);

this.ArgumentAssignmentStatement = function(){
	/**
	 * 默认参数赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArgumentAssignmentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArgumentAssignmentStatement = new Rexjs(ArgumentAssignmentStatement, ECMAScriptStatement);

	ArgumentAssignmentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 assignment
			this.out().assignment = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 assignment
				this.out().assignment = this.expression;
			}
		}
	});

	return ArgumentAssignmentStatement;
}();

this.ArgumentAssignmentTag = function(DefaultArgumentExpression, ArgumentAssignmentStatement, visitor){
	/**
	 * 默认参数赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	ArgumentAssignmentTag = new Rexjs(ArgumentAssignmentTag, BasicAssignmentTag);

	ArgumentAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置当前表达式
			statement.expression = new DefaultArgumentExpression(expression.context);

			(
				// 初始化参数赋值语句
				statements.statement = statement = new ArgumentAssignmentStatement(statements)
			)
			// 设置 expression
			.expression = expression;
			
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ArgumentAssignmentTag;
}(
	this.DefaultArgumentExpression,
	this.ArgumentAssignmentStatement,
	BasicAssignmentTag.prototype.visitor
);

}.call(
	this,
	this.BasicAssignmentTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/argument-default.js"
								);


eval(
									function(){
										// 函数省略参数相关
~function(){

this.RestArgumentExpression = function(ArgumentExpression, config){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 拓展符语法标签上下文
	 * @param {Number} index - 省略参数位于参数列表中的索引
	 */
	function RestArgumentExpression(context, index){
		ArgumentExpression.call(this, context);

		this.index = index;
	};
	RestArgumentExpression = new Rexjs(RestArgumentExpression, ArgumentExpression);

	RestArgumentExpression.props({
		name: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译省略参数
			if(config.value){
				// 将默认参数名追加至临时生成器
				anotherBuilder.appendContext(this.name);
				// 将赋值运算追加至临时生成器
				anotherBuilder.appendString("=Rexjs.toArray(arguments," + this.index + ");");
			}
			else {
				// 直接正式添加省略符
				contentBuilder.appendContext(this.context);
			}

			// 正式的追加参数名
			contentBuilder.appendContext(this.name);
		},
		index: 0
	});

	return RestArgumentExpression;
}(
	this.ArgumentExpression,
	// config
	ECMAScriptConfig.addBaseConfig("restArgument")
);

this.RestTag = function(SpreadTag, RestArgumentExpression){
	/**
	 * 参数省略符标签
	 * @param {Number} _type - 标签类型
	 */
	function RestTag(_type){
		SpreadTag.call(this, _type);
	};
	RestTag = new Rexjs(RestTag, SpreadTag);

	RestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restArgumentNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			statement.expression = new RestArgumentExpression(
				context,
				statement.target.expression.arguments.inner.length
			);
		}
	});

	return RestTag;
}(
	this.SpreadTag,
	this.RestArgumentExpression
);

this.RestArgumentNameTag = function(ArgumentNameTag){
	/**
	 * 省略参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function RestArgumentNameTag(_type){
		ArgumentNameTag.call(this, _type);
	};
	RestArgumentNameTag = new Rexjs(RestArgumentNameTag, ArgumentNameTag);

	RestArgumentNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restArgumentNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statement.target.expression.arguments.collection);

			// 设置省略参数名
			statement.expression.name = context;
		}
	});

	return RestArgumentNameTag;
}(
	this.ArgumentNameTag
);

this.RestArgumentSeparatorTag = function(ArgumentSeparatorTag){
	/**
	 * 省略参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function RestArgumentSeparatorTag(_type){
		ArgumentSeparatorTag.call(this, _type);
	};
	RestArgumentSeparatorTag = new Rexjs(RestArgumentSeparatorTag, ArgumentSeparatorTag);

	RestArgumentSeparatorTag.props({
		$type: TYPE_MATCHABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 报错
			parser.error(statement.expression.context, ECMAScriptErrors.REST_PARAMETER);
		}
	});

	return RestArgumentSeparatorTag;
}(
	this.ArgumentSeparatorTag
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/argument-rest.js"
								);


eval(
									function(){
										// 函数主体表达式相关
~function(BlockExpression, closeFunctionBodyTag){

this.FunctionBodyExpression = function(extractTo, insertDefaults){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function FunctionBodyExpression(open){
		BlockExpression.call(this, open);
	};
	FunctionBodyExpression = new Rexjs(FunctionBodyExpression, BlockExpression);

	FunctionBodyExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo: function(contentBuilder, defaultArgumentBuilder){
			var defaults = defaultArgumentBuilder.result;

			// 如果没有默认或省略参数
			if(defaults.length === 0){
				// 直接提取函数主体
				extractTo.call(this, contentBuilder);
				return;
			}
			
			// 插入默认参数
			insertDefaults(contentBuilder, this, defaults);
		},
		state: BlockExpression.STATE_NONE
	});
	
	return FunctionBodyExpression;
}(
	BlockExpression.prototype.extractTo,
	// insertDefaults
	function(contentBuilder, expression, defaults){
		var inner = expression.inner, builder = new ContentBuilder();
		
		// 追加起始大括号
		contentBuilder.appendContext(expression.open);
		// 提取第一个表达式至临时生成器
		inner[0].expression.extractTo(builder);

		// 判断临时生成器内容
		switch(builder.result){
			// 如果是 'use strict'
			case "'use strict'":
			// 如果是 "use strict"
			case '"use strict"':
				// 正式提取第一个语句
				inner[0].extractTo(contentBuilder);
				// 追加分号
				contentBuilder.appendString(";");

				// 设置 inner 的最小解析索引为 1，即不再解析第一个语句，从第二语句开始
				inner.min = 1;
				break;
		}

		// 提取默认参数
		contentBuilder.appendString(defaults);
		// 提取函数内部语句
		expression.inner.extractTo(contentBuilder);
		// 追加结束大括号
		contentBuilder.appendContext(expression.close);
	}
);

this.GeneratorBodyExpression = function(FunctionBodyExpression){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function GeneratorBodyExpression(open){
		FunctionBodyExpression.call(this, open);
	};
	GeneratorBodyExpression = new Rexjs(GeneratorBodyExpression, FunctionBodyExpression);

	GeneratorBodyExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		// extractTo: function(contentBuilder, defaultArgumentBuilder){debugger
			
		// }
	});
	
	return GeneratorBodyExpression;
}(
	this.FunctionBodyExpression
);

this.FunctionBodyStatements = function(BlockBodyStatements, ECMAScriptVariableCollections, VariableIndex){
	/**
	 * 函数主体语句块
	 */
	function FunctionBodyStatements(){
		BlockBodyStatements.call(
			this,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	FunctionBodyStatements = new Rexjs(FunctionBodyStatements, BlockBodyStatements);
	
	FunctionBodyStatements.props({
		/**
		 * 获取当前所处闭包
		 */
		get closure(){
			return this;
		},
		scope: BlockBodyStatements.SCOPE_CLOSURE
	});
	
	return FunctionBodyStatements;
}(
	this.BlockBodyStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

this.OpenFunctionBodyTag = function(OpenBlockComponentTag, FunctionBodyExpression, GeneratorBodyExpression, FunctionBodyStatements, BlockComponentStatement, config, forEach){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenFunctionBodyTag(_type){
		OpenBlockComponentTag.call(this, _type);
	};
	OpenFunctionBodyTag = new Rexjs(OpenFunctionBodyTag, OpenBlockComponentTag);

	OpenFunctionBodyTag.props({
		/**
		 * 获取绑定的函数主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeFunctionBodyTag;
		},
		/**
		 * 进入函数主体语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			(
				// 设置当前语句块
				parser.statements = new FunctionBodyStatements()
			)
			// 设置目标语句块
			.target = statements;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var declarationCollection, functionBodyExpression, expression = statement.expression;
			
			functionBodyExpression = (
				// 如果有生成器并且需要解析
				expression.generator && config.value ?
					new GeneratorBodyExpression(context):
					new FunctionBodyExpression(context)
			);

			(
				// 设置当前语句
				statements.statement = new BlockComponentStatement(statements)
			)
			// 设置表达式
			.expression = functionBodyExpression;

			// 进入函数主体语句块内部
			this.in(parser, statements);
			
			// 获取函数主体语句块的声明集合，注意：parser.statements 并不就是 statements
			declarationCollection = parser.statements.collections.declaration;

			// 收集参数名到声明集合下
			forEach(
				expression.arguments.collection,
				declarationCollection.collect,
				declarationCollection
			);
		}
	});

	return OpenFunctionBodyTag;
}(
	this.OpenBlockComponentTag,
	this.FunctionBodyExpression,
	this.GeneratorBodyExpression,
	this.FunctionBodyStatements,
	this.BlockComponentStatement,
	// config
	ECMAScriptConfig.generator,
	Rexjs.forEach
);

this.CloseFunctionBodyTag = function(CloseBlockComponentTag){
	/**
	 * 结束函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseFunctionBodyTag(_type){
		CloseBlockComponentTag.call(this, _type);
	};
	CloseFunctionBodyTag = new Rexjs(CloseFunctionBodyTag, CloseBlockComponentTag);

	CloseFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
		}
	});

	return CloseFunctionBodyTag;
}(
	this.CloseBlockComponentTag
);

closeFunctionBodyTag = new this.CloseFunctionBodyTag();

}.call(
	this,
	this.BlockExpression,
	// closeFunctionBodyTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/function-body.js"
								);


eval(
									function(){
										// new.target 表达式相关
~function(ECMAScriptStatements, PropertyNameTag){

this.TargetExpression = function(AccessorExpression){
	/**
	 * new.target 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TargetExpression(context){
		AccessorExpression.call(this, context, null);
	};
	TargetExpression = new Rexjs(TargetExpression, AccessorExpression);

	TargetExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 new 关键字
			contentBuilder.appendString("new");
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		}
	});

	return TargetExpression;
}(
	this.AccessorExpression
);

this.TargetAccessorTag = function(DotAccessorTag, TargetExpression){
	/**
	 * target 访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function TargetAccessorTag(_type){
		DotAccessorTag.call(this, _type);
	};
	TargetAccessorTag = new Rexjs(TargetAccessorTag, DotAccessorTag);

	TargetAccessorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.targetAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 设置当前语句为 target，目的是因为当前已经不属于一元操作语句
				statements.statement = statement.target
			)
			// 设置当前语句的表达式
			.expression = new TargetExpression(context);
		}
	});

	return TargetAccessorTag;
}(
	this.DotAccessorTag,
	this.TargetExpression
);

this.TargetTag = function(SCOPE_CLOSURE, SCOPE_LAZY, visitor){
	/**
	 * target 标签
	 * @param {Number} _type - 标签类型
	 */
	function TargetTag(_type){
		PropertyNameTag.call(this, _type);
	};
	TargetTag = new Rexjs(TargetTag, PropertyNameTag);

	TargetTag.props({
		order: ECMAScriptOrders.TARGET,
		regexp: /target/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var s = statements;

			doBlock:
			do {
				// 判断作用域类型
				switch(s.scope & SCOPE_LAZY){
					// 如果是惰性闭包
					case SCOPE_LAZY:
						break doBlock;

					// 如果是普通闭包
					case SCOPE_CLOSURE:
						// 调用父类方法
						visitor.call(this, parser, context, statement, statements);
						return;

					// 如果不是闭包
					default:
						s = s.target;
						break;
				}
			}
			while(s);

			// 报错
			parser.error(statement.expression.context, ECMAScriptErrors.TARGET);
		}
	});

	return TargetTag;
}(
	ECMAScriptStatements.SCOPE_CLOSURE,
	ECMAScriptStatements.SCOPE_LAZY,
	PropertyNameTag.prototype.visitor
);

}.call(
	this,
	this.ECMAScriptStatements,
	this.PropertyNameTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/target.js"
								);


eval(
									function(){
										// 分组小括号标签相关
~function(IdentifierExpression, ArgumentExpression, DefaultArgumentExpression, RestArgumentExpression, groupingSeparatorTag, closeGroupingTag, collectTo){

this.GroupingExpression = function(){
	/**
	 * 分组小括号表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function GroupingExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	GroupingExpression = new Rexjs(GroupingExpression, PartnerExpression);

	GroupingExpression.props({
		asArguments: false,
		restIndex: -1
	});

	return GroupingExpression;
}();

this.IllegibleRestArgumentExpression = function(){
	/**
	 * 难以辨别的、可能非法的省略参数表达式
	 * @param {Context} context - 拓展符语法标签上下文
	 * @param {Number} index - 省略参数位于参数列表中的索引
	 */
	function IllegibleRestArgumentExpression(context, index){
		RestArgumentExpression.call(this, context, index);
	};
	IllegibleRestArgumentExpression = new Rexjs(IllegibleRestArgumentExpression, RestArgumentExpression);

	IllegibleRestArgumentExpression.props({
		/**
		 * 获取参数名上下文
		 */
		get name(){
			return this.operand.context;
		},
		operand: null
	});

	return IllegibleRestArgumentExpression;
}();

this.GroupingStatement = function(){
	/**
	 * 分组小括号语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function GroupingStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	GroupingStatement = new Rexjs(GroupingStatement, ECMAScriptStatement);
	
	GroupingStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context);
				return null;
			}

			var groupingExpression = this.out(), inner = groupingExpression.inner;

			// 设置表达式
			inner.set(this.expression);

			// 如果经过上面设置表达式后，长度还是 0，就说明是空的小括号，就应该是要作为箭头函数参数存在
			if(inner.length === 0){
				// 设置 asArguments，表示这个分组表达式要作为箭头函数的参数使用
				groupingExpression.asArguments = true;
			}

			// 返回关闭分组小括号标签
			return this.bindingOf();
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			return this.tagOf().separator;
		}
	});
	
	return GroupingStatement;
}();

this.IllegibleRestArgumentStatement = function(){
	/**
	 * 难以辨别的、可能非法的省略参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IllegibleRestArgumentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IllegibleRestArgumentStatement = new Rexjs(IllegibleRestArgumentStatement, ECMAScriptStatement);

	IllegibleRestArgumentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出该语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出该语句并设置 operand
				this.out().operand = this.expression;
			}
		}
	});

	return IllegibleRestArgumentStatement;
}();

this.GroupingContextStatement = function(ArgumentsExpression, BinaryExpression, ifIdentifier, ifBinary, error){
	/**
	 * 分组小括号上下文语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function GroupingContextStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	GroupingContextStatement = new Rexjs(GroupingContextStatement, ECMAScriptStatement);

	GroupingContextStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 获取当前语句表达式
		 */
		get expression(){
			return this.target.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.out();

			// 如果不是箭头符号
			if(context.content !== "=>"){
				// 如果要作为参数，即 有省略参数符号 或 空的小括号
				if(expression.asArguments){
					// 报错
					error(parser, expression);
				}

				return;
			}

			var inner = expression.inner, argumentsExpression = new ArgumentsExpression(expression.open);

			// 遍历项
			for(var i = 0, j = inner.length;i < j;i++){
				var exp = inner[i];

				switch(true){
					// 如果是标识符表达式
					case exp instanceof IdentifierExpression:
						i = ifIdentifier(parser, exp, argumentsExpression, i, j);
						break;

					// 如果是二元表达式
					case exp instanceof BinaryExpression:
						i = ifBinary(parser, exp, argumentsExpression, i, j);
						break;

					default:
						// 报错
						parser.error(exp.context);
						return;
				}
			}

			// 设置参数表达式的 close
			argumentsExpression.close = expression.close;
			// 将分组小括号表达式转化成参数列表表达式，并替换分组小括号表达式
			this.target.expression = argumentsExpression;
		}
	});

	return GroupingContextStatement;
}(
	this.ArgumentsExpression,
	this.BinaryExpression,
	// ifIdentifier
	function(parser, expression, argumentsExpression, i, j){
		var context;

		// 如果是省略参数表达式
		if(expression instanceof RestArgumentExpression){
			// 如果省略参数不是最后一项
			if(i !== j - 1){
				// 报错
				parser.error(expression.context, ECMAScriptErrors.REST_PARAMETER);
				return j;
			}

			var operand = expression.operand;

			// 如果省略符的操作对象是标识符表达式
			if(operand instanceof IdentifierExpression){
				context = operand.context;
			}
			else {
				// 报错
				parser.error(expression.operand.context);
				return j;
			}
		}
		// 如果不是省略参数表达式，那么就是普通形式的参数
		else {
			context = expression.context;
			expression = new ArgumentExpression(context);
		}

		// 收集参数名
		collectTo.call(context.tag, parser, context, argumentsExpression.collection);
		// 添加参数表达式
		argumentsExpression.inner.add(expression);
		return i;
	},
	// ifBinary
	function(parser, expression, argumentsExpression, i, j){
		var left = expression.left, context = left.context;

		switch(false){
			// 如果左侧表达式不是标识符表达式
			case left instanceof IdentifierExpression:
				// 报错
				parser.error(left);
				return j;

			// 如果不是等于号
			case expression.context.content === "=":
				// 报错
				parser.error(expression.context);
				return j;

			// 默认，即默认值参数表达式
			default:
				var defaultArgumentExpression = new DefaultArgumentExpression(context);

				// 设置默认参数表达式的 assignment 属性
				defaultArgumentExpression.assignment = expression;
	
				// 收集参数名
				collectTo.call(context.tag, parser, context, argumentsExpression.collection);
				// 添加默认参数表达式
				argumentsExpression.inner.add(defaultArgumentExpression);
				return i;
		}
	},
	// error
	function(parser, expression){
		var restIndex = expression.restIndex;

		parser.error(restIndex > -1 ? expression.inner[restIndex].context : expression.close);
	}
);

this.OpenGroupingTag = function(OpenParenTag, GroupingExpression, GroupingStatement){
	/**
	 * 起始分组小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenGroupingTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenGroupingTag = new Rexjs(OpenGroupingTag, OpenParenTag);
	
	OpenGroupingTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeGroupingTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return groupingSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openGroupingContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new GroupingExpression(context);
			// 设置当前语句
			statements.statement = new GroupingStatement(statements);
		}
	});
	
	return OpenGroupingTag;
}(
	this.OpenParenTag,
	this.GroupingExpression,
	this.GroupingStatement
);

this.IllegibleRestTag = function(RestTag, IllegibleRestArgumentExpression, IllegibleRestArgumentStatement){
	/**
	 * 难以辨别的、可能非法的省略参数标签
	 * @param {Number} _type - 标签类型
	 */
	function IllegibleRestTag(_type){
		RestTag.call(this, _type);
	};
	IllegibleRestTag = new Rexjs(IllegibleRestTag, RestTag);

	IllegibleRestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var groupingExpression = statement.target.expression;

			// 设置当前表达式
			statement.expression = new IllegibleRestArgumentExpression(
				context,
				groupingExpression.inner.length
			);

			// 设置当前语句
			statements.statement = new IllegibleRestArgumentStatement(statements);

			// 如果已经标记过该属性
			if(groupingExpression.asArguments){
				return;
			}
			
			// 设置表达式属性，标识视为参数
			groupingExpression.asArguments = true;
			// 设置参数起始索引
			groupingExpression.restIndex = groupingExpression.inner.length;
		}
	});

	return IllegibleRestTag;
}(
	this.RestTag,
	this.IllegibleRestArgumentExpression,
	this.IllegibleRestArgumentStatement
);

this.GroupingSeparatorTag = function(CommaTag, GroupingStatement){
	/**
	 * 分组小括号分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function GroupingSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	GroupingSeparatorTag = new Rexjs(GroupingSeparatorTag, CommaTag);

	GroupingSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openGroupingContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new GroupingStatement(statements);
		}
	});

	return GroupingSeparatorTag;
}(
	this.CommaTag,
	this.GroupingStatement
);

this.CloseGroupingTag = function(CloseParenTag, GroupingContextStatement){
	/**
	 * 结束分组小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseGroupingTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseGroupingTag = new Rexjs(CloseGroupingTag, CloseParenTag);
	
	CloseGroupingTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
			// 设置当前语句
			statements.statement = new GroupingContextStatement(statements);
		}
	});
	
	return CloseGroupingTag;
}(
	this.CloseParenTag,
	this.GroupingContextStatement
);

groupingSeparatorTag = new this.GroupingSeparatorTag();
closeGroupingTag = new this.CloseGroupingTag();

}.call(
	this,
	this.IdentifierExpression,
	this.ArgumentExpression,
	this.DefaultArgumentExpression,
	this.RestArgumentExpression,
	// groupingSeparatorTag
	null,
	// closeGroupingTag
	null,
	this.ArgumentNameTag.prototype.collectTo
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/grouping.js"
								);


eval(
									function(){
										// 箭头函数相关
~function(FunctionExpression, ArgumentsExpression, OpenFunctionBodyTag, CloseFunctionBodyTag, closeArrowFunctionBodyTag){

this.ArrowFunctionExpression = function(config){
	/**
	 * 箭头函数表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} args - 函数参数列表表达式
	 */
	function ArrowFunctionExpression(context, args){
		FunctionExpression.call(this, context);

		this.arguments = args;
	};
	ArrowFunctionExpression = new Rexjs(ArrowFunctionExpression, FunctionExpression);

	ArrowFunctionExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var defaultArgumentBuilder = new ContentBuilder();

			// 如果需要编译箭头函数
			if(config.value){
				/*
					这里有包括了两层函数，
					因为箭头函数里的 this 与 arguments 都是指向外层的，箭头函数自己没有 arguments
				*/

				// 追加外层函数头部代码
				contentBuilder.appendString("(function");
				// 提取并编译函数参数
				this.arguments.compileTo(contentBuilder, defaultArgumentBuilder);
				// 追加内层函数头部代码 与 默认参数
				contentBuilder.appendString("{" + defaultArgumentBuilder.result + "return function()");
				
				// 清空默认参数，因为在上面已经被追加至生成器内
				defaultArgumentBuilder.result = "";

				// 提取并编译函数主体
				this.body.compileTo(contentBuilder, defaultArgumentBuilder);
				// 追加两层函数的尾部代码
				contentBuilder.appendString(".apply(this[0],this[1])}.bind([this, arguments]))");
				return;
			}
			
			// 提取参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 追加箭头符号
			contentBuilder.appendContext(this.context);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		}
	});

	return ArrowFunctionExpression;
}(
	// config
	ECMAScriptConfig.addBaseConfig("arrowFunction")
);

this.SingleArgumentExpression = function(ArgumentsExpression, ArgumentExpression){
	/**
	 * 单参数表达式
	 * @param {Context} argumentContext - 参数上下文
	 */
	function SingleArgumentExpression(argumentContext){
		ArgumentsExpression.call(this, null);

		// 添加参数表达式
		this.inner.add(
			new ArgumentExpression(argumentContext)
		);

		// 收集参数名
		this.collection.collect(argumentContext.content);
	};
	SingleArgumentExpression = new Rexjs(SingleArgumentExpression, ArgumentsExpression);

	SingleArgumentExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加参数起始小括号
			contentBuilder.appendString("(");
			// 提取参数名
			this.inner.extractTo(contentBuilder);
			// 追加参数结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取参数名
			this.inner.extractTo(contentBuilder);
		}
	});

	return SingleArgumentExpression;
}(
	this.ArgumentsExpression,
	this.ArgumentExpression
);

this.ArrowFunctionBodyExpression = function(FunctionBodyExpression){
	/**
	 * 箭头函数主体表达式
	 * @param {Expression} inner - 函数主体返回值表达式
	 */
	function ArrowFunctionBodyExpression(inner){
		FunctionBodyExpression.call(this, null);

		this.inner = inner;
	};
	ArrowFunctionBodyExpression = new Rexjs(ArrowFunctionBodyExpression, FunctionBodyExpression);

	ArrowFunctionBodyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		compileTo: function(contentBuilder, defaultArgumentBuilder){
			var defaults = defaultArgumentBuilder.result;

			// 追加函数主体起始大括号
			contentBuilder.appendString("{");

			// 如果没有默认或省略参数
			if(defaults.length > 0){
				// 插入默认参数
				contentBuilder.appendString(defaults);
			}

			// 追加 return 关键字
			contentBuilder.appendString("return ");
			// 提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
			// 追加 表达式结束分号 与 函数主体结束大括号
			contentBuilder.appendString(";}");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo: function(contentBuilder, defaultArgumentBuilder){
			// 如果有默认参数
			if(defaultArgumentBuilder.result.length > 0){
				// 进行编译
				this.compileTo(contentBuilder, defaultArgumentBuilder);
				return;
			}

			// 直接提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
		}
	});

	return ArrowFunctionBodyExpression;
}(
	this.FunctionBodyExpression
);

this.ArrowContextStatement = function(SingleStatement, ArrowFunctionBodyExpression){
	/**
	 * 箭头符号上下文语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArrowContextStatement(statements){
		SingleStatement.call(this, statements);
	};
	ArrowContextStatement = new Rexjs(ArrowContextStatement, SingleStatement);

	ArrowContextStatement.props({
		expression: new DefaultExpression(),
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = new ArrowFunctionBodyExpression(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				this.requestOut(parser, context);
			}
		}
	});

	return ArrowContextStatement;
}(
	this.SingleStatement,
	this.ArrowFunctionBodyExpression
);

this.ArrowTag = function(ExpressionSeparatorTag, ArrowFunctionExpression, SingleArgumentExpression, IdentifierExpression, ArgumentsExpression, ArrowContextStatement){
	/**
	 * 箭头标签
	 * @param {Number} _type - 标签类型
	 */
	function ArrowTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	ArrowTag = new Rexjs(ArrowTag, ExpressionSeparatorTag);

	ArrowTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		// 防止与“=”冲突
		order: ECMAScriptOrders.ARROW,
		regexp: /=>/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.arrowContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			switch(true){
				// 如果是标识符表达式
				case expression instanceof IdentifierExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(
						context,
						new SingleArgumentExpression(expression.context)
					);
					break;

				// 如果是参数列表表达式
				case expression instanceof ArgumentsExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(context, expression);
					break;

				default:
					// 报错
					parser.error(expression);
					return;
			}

			// 如果箭头符号换行了
			if((expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
				// 报错
				parser.error(context, ECMAScriptErrors.NEWLINE_BEFORE_ARROW);
				return;
			}

			// 设置当前语句
			statements.statement = new ArrowContextStatement(statements);
		}
	});

	return ArrowTag;
}(
	this.ExpressionSeparatorTag,
	this.ArrowFunctionExpression,
	this.SingleArgumentExpression,
	this.IdentifierExpression,
	this.ArgumentsExpression,
	this.ArrowContextStatement
);

this.OpenArrowFunctionBodyTag = function(SCOPE_LAZY, visitor){
	/**
	 * 起始箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrowFunctionBodyTag(_type){
		OpenFunctionBodyTag.call(this, _type);
	};
	OpenArrowFunctionBodyTag = new Rexjs(OpenArrowFunctionBodyTag, OpenFunctionBodyTag);

	OpenArrowFunctionBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrowFunctionBodyTag;
		},
		order: ECMAScriptOrders.OPEN_ARROW_FUNCTION_BODY,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 跳出当前语句
			statement.out();
			// 调用父类方法
			visitor.call(this, parser, context, statements.statement, statements);

			// 将 FunctionBodyStatements 作用域设置为惰性闭包
			parser.statements.scope = SCOPE_LAZY;
		}
	});

	return OpenArrowFunctionBodyTag;
}(
	this.ECMAScriptStatements.SCOPE_LAZY,
	OpenFunctionBodyTag.prototype.visitor
);

this.CloseArrowFunctionBodyTag = function(visitor){
	/**
	 * 结束箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrowFunctionBodyTag(_type){
		CloseFunctionBodyTag.call(this, _type);
	};
	CloseArrowFunctionBodyTag = new Rexjs(CloseArrowFunctionBodyTag, CloseFunctionBodyTag);

	CloseArrowFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closeArrowFunctionBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式状态
			statement.expression.state = STATE_STATEMENT_ENDABLE;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseArrowFunctionBodyTag;
}(
	CloseFunctionBodyTag.prototype.visitor
);

closeArrowFunctionBodyTag = new this.CloseArrowFunctionBodyTag();

}.call(
	this,
	this.FunctionExpression,
	this.ArgumentsExpression,
	this.OpenFunctionBodyTag,
	this.CloseFunctionBodyTag,
	// closeArrowFunctionBodyTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/arrow.js"
								);


eval(
									function(){
										// 对象属性相关
~function(){

this.PropertyDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 属性解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function PropertyDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	PropertyDestructuringItemExpression = new Rexjs(PropertyDestructuringItemExpression, DestructuringItemExpression);

	PropertyDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加属性对象
			builder.appendString(anotherBuilder.result);

			// 解构属性名
			origin.name.destructTo(builder);
			// 解构属性值
			origin.value.destructTo(contentBuilder, builder);
		}
	});

	return PropertyDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.PropertyDestructuringDefaultItemExpression = function(DestructuringDefaultItemExpression){
	/**
	 * 属性解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {BinaryExpression} assignment - 默认值赋值表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function PropertyDestructuringDefaultItemExpression(origin, assignment, statements){
		DestructuringDefaultItemExpression.call(this, origin, statements);

		this.assignment = assignment;
	};
	PropertyDestructuringDefaultItemExpression = new Rexjs(PropertyDestructuringDefaultItemExpression, DestructuringDefaultItemExpression);

	PropertyDestructuringDefaultItemExpression.props({
		assignment: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var origin = this.origin, value = origin.value;

			// 解构属性名
			origin.name.extractTo(contentBuilder);
			// 追加等号
			contentBuilder.appendContext(value.context);
			// 追加值
			value.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加属性对象
			builder.appendString(anotherBuilder.result);
			// 解构属性名
			origin.name.destructTo(builder);

			// 将默认值表达式转换为三元表达式
			this.toTernary(this.assignment, contentBuilder, builder);
		}
	});

	return PropertyDestructuringDefaultItemExpression;
}(
	this.DestructuringDefaultItemExpression
);

this.PropertyExpression = function(BinaryExpression, ShorthandPropertyValueExpression){
	/**
	 * 对象属性表达式
	 */
	function PropertyExpression(){
		BinaryExpression.call(this, null, null);
	};
	PropertyExpression = new Rexjs(PropertyExpression, BinaryExpression);

	PropertyExpression.props({
		/**
		 * 获取该属性是否为访问器属性
		 */
		get accessible(){
			return this.named(this.accessor);
		},
		accessor: null,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 如果是访问器
			if(this.accessible){
				// 追加 defineProperty 的调用
				contentBuilder.appendString("Object.defineProperty(" + anotherBuilder.result + ",");
				// 提取属性名
				this.name.defineTo(contentBuilder);
				// 追加属性描述符
				contentBuilder.appendString(",{configurable:true,enumerable:true,");
				// 追加访问器内容
				contentBuilder.appendString(this.accessor.content);
				// 提取属性值
				this.value.defineTo(contentBuilder);
				// 追加结束调用
				contentBuilder.appendString("}),");
				return;
			}

			// 追加临时变量名
			contentBuilder.appendString(anotherBuilder.result);
			// 编译属性名
			this.name.compileTo(contentBuilder);
			// 编译属性值
			this.value.compileTo(contentBuilder);
			// 追加表达式分隔符逗号
			contentBuilder.appendString(",");
		},
		/**
		 * 获取标签上下文
		 */
		get context(){
			return this.value.context;
		},
		/**
		 * 设置标签上下文
		 * @parma {Context} value - 标签上下文
		 */
		set context(value){},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果是访问器
			if(this.accessible){
				// 追加访问器
				contentBuilder.appendContext(this.accessor);
				// 追加空格
				contentBuilder.appendSpace();
				// 提取属性名称
				this.name.extractTo(contentBuilder);
				// 直接以简写形式提取表达式文本内容
				this.value.shortTo(contentBuilder);
				return;
			}

			// 提取属性名称
			this.name.extractTo(contentBuilder);
			// 提取属性值
			this.value.extractTo(contentBuilder);
		},
		/**
		 * 获取该二元表达式所关联的最后一个二元表达式
		 */
		get last(){
			return this;
		},
		/**
		 * 设置该二元表达式所关联的最后一个二元表达式
		 * @parma {BinaryExpression} value - 二元表达式
		 */
		set last(value){},
		/**
		 * 获取该二元表达式的左侧表达式
		 */
		get left(){
			return this.name;
		},
		/**
		 * 设置该二元表达式的左侧表达式
		 * @parma {Expression} value - 左侧表达式
		 */
		set left(value){},
		name: null,
		/**
		 * 判断非属性名标签上下文是否已经用于属性名
		 * @param {Context} context - 需要判断的指定标签
		 */
		named: function(context){
			switch(context){
				// 如果 context 不存在
				case null:
					break;

				// 如果 context 仅仅是属性名
				case this.name.context:
					break;

				default:
					return true;
			}

			return false;
		},
		/**
		 * 获取该二元表达式的右侧表达式
		 */
		get right(){
			return this.value.operand;
		},
		/**
		 * 设置该二元表达式的右侧表达式
		 * @parma {Expression} value - 左侧表达式
		 */
		set right(value){},
		superDepth: 1,
		value: null
	});

	return PropertyExpression;
}(
	this.BinaryExpression,
	this.ShorthandPropertyValueExpression3
);

this.LiteralPropertyNameExpression = function(){
	/**
	 * 对象字面量属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LiteralPropertyNameExpression(context){
		Expression.call(this, context);
	};
	LiteralPropertyNameExpression = new Rexjs(LiteralPropertyNameExpression, Expression);

	LiteralPropertyNameExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		destructTo: function(contentBuilder){
			// 调用编译表达式
			this.compileTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加起始中括号
			contentBuilder.appendString("[");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
			// 追加结束中括号
			contentBuilder.appendString("]");
		}
	});

	return LiteralPropertyNameExpression;
}();

this.PropertyValueExpression = function(){
	/**
	 * 对象属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function PropertyValueExpression(context){
		Expression.call(this, context);
	};
	PropertyValueExpression = new Rexjs(PropertyValueExpression, Expression);

	PropertyValueExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			this.extractTo(contentBuilder);
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		destructTo: function(contentBuilder, anotherBuilder){
			// 如果是子解构项
			if(this.destructuringItem){
				// 提取操作对象
				this.operand.compileTo(contentBuilder, anotherBuilder);
				return;
			}

			// 追加表达式分隔符
			contentBuilder.appendString(",");
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 追加赋值操作表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		},
		destructuringItem: false,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加赋值符号
			contentBuilder.appendString("=");
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加冒号分隔符
			contentBuilder.appendContext(this.context);
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});

	return PropertyValueExpression;
}();

this.PropertyValueStatement = function(setOperand){
	/**
	 * 对象属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyValueStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PropertyValueStatement = new Rexjs(PropertyValueStatement, ECMAScriptStatement);

	PropertyValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 设置 operand
			setOperand(this);
		},
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 设置 operand
				setOperand(this);
			}
		}
	});

	return PropertyValueStatement;
}(
	// setOperand
	function(statement){
		// 跳出语句并设置 operand
		statement.out().value.operand = statement.expression;
	}
);

this.PropertyStatement = function(PropertyExpression, ifComma){
	/**
	 * 对象属性语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.initExpression();
	};
	PropertyStatement = new Rexjs(PropertyStatement, ECMAScriptStatement);

	PropertyStatement.props({
		assigned: false,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return null;
			}

			var expression = this.expression, objectExpression = this.out();

			switch(true){
				// 如果表达式是空项
				case expression.name === null:
					break;

				// 如果可能是访问器
				case expression.accessible:
					// 核对访问器函数
					expression.accessor.tag.checkFunction(parser, expression.value.operand, context);

				default:
					// 跳出语句并添加表达式
					objectExpression.inner.add(expression);
					break;
			}

			return this.bindingOf();
		},
		/**
		 * 初始化该语句的表达式
		 */
		initExpression: function(){
			this.expression = new PropertyExpression();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			switch(context.content){
				// 如果是冒号
				case ":":
				// 如果是等于号
				case "=":
					// 如果已经赋值过，即 键值对值 或 属性默认值
					if(this.assigned){
						break;
					}

					this.assigned = true;
					return null;

				// 如果是逗号
				case ",":
					return ifComma(parser, this, this.expression, context);
			}

			// 报错
			parser.error(context);
		}
	});

	return PropertyStatement;
}(
	this.PropertyExpression,
	// ifComma
	function(parser, statement, expression, context){
		// 如果是属性访问器
		if(expression.accessible){
			// 核对访问器函数
			expression.accessor.tag.checkFunction(
				parser,
				expression.value.operand,
				context
			);
		}

		// 跳出语句并
		statement.out().inner.add(expression);
		// 返回分隔符标签
		return statement.tagOf().separator;
	}
);

this.PropertyNameSeparatorTag = function(ColonTag, PropertyValueExpression, PropertyValueStatement){
	/**
	 * 对象属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyNameSeparatorTag(_type){
		ColonTag.call(this, _type);
	};
	PropertyNameSeparatorTag = new Rexjs(PropertyNameSeparatorTag, ColonTag);

	PropertyNameSeparatorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置对象属性表达式的值
			statement.expression.value = new PropertyValueExpression(context);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		}
	});

	return PropertyNameSeparatorTag;
}(
	this.ColonTag,
	this.PropertyValueExpression,
	this.PropertyValueStatement
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property.js"
								);


eval(
									function(){
										// 对象字面量属性名相关
~function(require, requireOfMethodName, visitor, visitorOfMathematicalNumeral){

require = function(){
	/**
	 * 获取此标签接下来所需匹配的标签列表
	 * @param {TagsMap} tagsMap - 标签集合映射
	 */
	return function(tagsMap){
		return tagsMap.propertyNameContextTags;
	};
}();

requireOfMethodName = function(){
	/**
	 * 获取此标签接下来所需匹配的标签列表
	 * @param {TagsMap} tagsMap - 标签集合映射
	 */
	return function(tagsMap){
		return tagsMap.shorthandMethodArgumentsTags;
	};
}();

visitor = function(LiteralPropertyNameExpression){
	/**
	 * 标签访问器
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(parser, context, statement){
		// 设置表达式的 name 属性
		statement.expression.name = new LiteralPropertyNameExpression(context);
	};
}(
	this.LiteralPropertyNameExpression
);

visitorOfMathematicalNumeral = function(){
	/**
	 * 标签访问器
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(parser, context, statement, statements){
		// 如果需要用 parseInt
		if(this.useParse()){
			// 自动化生成变量
			statement.target.expression.autoVariable(statements);
		}
		
		// 调用 visitor 方法
		visitor.call(this, parser, context, statement, statements);
	};
}();

this.StringPropertyNameTag = function(StringTag){
	/**
	 * 字符串属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function StringPropertyNameTag(_type){
		StringTag.call(this, _type);
	};
	StringPropertyNameTag = new Rexjs(StringPropertyNameTag, StringTag);

	StringPropertyNameTag.props({
		require: require,
		visitor: visitor
	});

	return StringPropertyNameTag;
}(
	this.StringTag
);

this.StringMethodNameTag = function(StringPropertyNameTag){
	/**
	 * 字符串方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function StringMethodNameTag(context){
		StringPropertyNameTag.call(this, context);
	};
	StringMethodNameTag = new Rexjs(StringMethodNameTag, StringPropertyNameTag);

	StringMethodNameTag.props({
		require: requireOfMethodName
	});

	return StringMethodNameTag;
}(
	this.StringPropertyNameTag
);

this.NumberPropertyNameTag = function(NumberTag){
	/**
	 * 数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberPropertyNameTag(_type){
		NumberTag.call(this, _type);
	};
	NumberPropertyNameTag = new Rexjs(NumberPropertyNameTag, NumberTag);

	NumberPropertyNameTag.props({
		require: require,
		visitor: visitor
	});

	return NumberPropertyNameTag;
}(
	this.NumberTag
);

this.NumberMethodNameTag = function(NumberPropertyNameTag){
	/**
	 * 数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberMethodNameTag(context){
		NumberPropertyNameTag.call(this, context);
	};
	NumberMethodNameTag = new Rexjs(NumberMethodNameTag, NumberPropertyNameTag);

	NumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return NumberMethodNameTag;
}(
	this.NumberPropertyNameTag
);

this.BinaryNumberPropertyNameTag = function(BinaryNumberTag){
	/**
	 * 二进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberPropertyNameTag(_type){
		BinaryNumberTag.call(this, _type);
	};
	BinaryNumberPropertyNameTag = new Rexjs(BinaryNumberPropertyNameTag, BinaryNumberTag);
	
	BinaryNumberPropertyNameTag.props({
		require: require,
		visitor: visitorOfMathematicalNumeral
	});
	
	return BinaryNumberPropertyNameTag;
}(
	this.BinaryNumberTag
);

this.BinaryNumberMethodNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 二进制数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberMethodNameTag(context){
		BinaryNumberPropertyNameTag.call(this, context);
	};
	BinaryNumberMethodNameTag = new Rexjs(BinaryNumberMethodNameTag, BinaryNumberPropertyNameTag);

	BinaryNumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return BinaryNumberMethodNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.OctalNumberPropertyNameTag = function(OctalNumberTag){
	/**
	 * 八进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberPropertyNameTag(_type){
		OctalNumberTag.call(this, _type);
	};
	OctalNumberPropertyNameTag = new Rexjs(OctalNumberPropertyNameTag, OctalNumberTag);
	
	OctalNumberPropertyNameTag.props({
		require: require,
		visitor: visitorOfMathematicalNumeral
	});
	
	return OctalNumberPropertyNameTag;
}(
	this.OctalNumberTag
);

this.OctalNumberMethodNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 八进制数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberMethodNameTag(context){
		OctalNumberPropertyNameTag.call(this, context);
	};
	OctalNumberMethodNameTag = new Rexjs(OctalNumberMethodNameTag, OctalNumberPropertyNameTag);

	OctalNumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return OctalNumberMethodNameTag;
}(
	this.OctalNumberPropertyNameTag
);

}.call(
	this,
	// require
	null,
	// requireOfMethodName
	null,
	// visitor
	null,
	// visitorOfMathematicalNumeral
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-iteral-name.js"
								);


eval(
									function(){
										// 对象标识符属性名相关
~function(PropertySeparatorTag, RegExp){

this.IdentifierPropertyNameExpression = function(LiteralPropertyNameExpression){
	/**
	 * 对象标识符属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function IdentifierPropertyNameExpression(context){
		LiteralPropertyNameExpression.call(this, context);
	};
	IdentifierPropertyNameExpression = new Rexjs(IdentifierPropertyNameExpression, LiteralPropertyNameExpression);

	IdentifierPropertyNameExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加起始双引号
			contentBuilder.appendString('"');
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
			// 追加结束双引号
			contentBuilder.appendString('"');
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		destructTo: function(contentBuilder){
			// 追加对象访问符
			contentBuilder.appendString(".");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加点访问器
			contentBuilder.appendString(".");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return IdentifierPropertyNameExpression;
}(
	this.LiteralPropertyNameExpression
);

this.ShorthandPropertyValueExpression = function(PropertyValueExpression, config){
	/**
	 * 简写属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ShorthandPropertyValueExpression(context){
		PropertyValueExpression.call(this, context);
	};
	ShorthandPropertyValueExpression = new Rexjs(ShorthandPropertyValueExpression, PropertyValueExpression);

	ShorthandPropertyValueExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加冒号和变量名
			contentBuilder.appendString("=" + this.context.content);
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		destructTo: function(contentBuilder, anotherBuilder){
			// 追加逗号表达式分隔符
			contentBuilder.appendString(",");
			// 追加变量名
			contentBuilder.appendContext(this.context);
			// 追加赋值表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析
			if(config.value){
				// 追加冒号和变量名
				contentBuilder.appendString(":" + this.context.content);
			}
		}
	});

	return ShorthandPropertyValueExpression;
}(
	this.PropertyValueExpression,
	// config
	ECMAScriptConfig.addBaseConfig("shorthandProperty")
);

this.IdentifierPropertyValueStatement = function(PropertyValueStatement, ShorthandPropertyValueExpression){
	/**
	 * 对象标识符属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IdentifierPropertyValueStatement(statements){
		PropertyValueStatement.call(this, statements);
	};
	IdentifierPropertyValueStatement = new Rexjs(IdentifierPropertyValueStatement, PropertyValueStatement);

	IdentifierPropertyValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			var propertyExpression = this.out();

			// 设置 value 为简写属性值表达式
			propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
		},
		expression: new DefaultExpression(),
		try: function(parser, context){
			// 跳出语句
			var propertyExpression = this.out();

			// 如果是逗号
			if(context.content === ","){
				// 设置 value 为简写属性值表达式
				propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
			}
		}
	});

	return IdentifierPropertyValueStatement;
}(
	this.PropertyValueStatement,
	this.ShorthandPropertyValueExpression
);

this.IdentifierPropertyNameTag = function(IdentifierTag, IdentifierPropertyNameExpression, ShorthandPropertyValueExpression){
	/**
	 * 标识符属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierPropertyNameTag(_type){
		IdentifierTag.call(this, _type);
	};
	IdentifierPropertyNameTag = new Rexjs(IdentifierPropertyNameTag, IdentifierTag);

	IdentifierPropertyNameTag.props({
		order: ECMAScriptOrders.IDENTIFIER_PROPERTY_NAME,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.identifierPropertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置表达式的 name 属性
			expression.name = new IdentifierPropertyNameExpression(context);
			// 设置当前语句
			expression.value = new ShorthandPropertyValueExpression(context);
		}
	});

	return IdentifierPropertyNameTag;
}(
	this.IdentifierTag,
	this.IdentifierPropertyNameExpression,
	this.ShorthandPropertyValueExpression
);

this.IdentifierMethodNameTag = function(IdentifierPropertyNameTag){
	/**
	 * 标识符方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierMethodNameTag(context){
		IdentifierPropertyNameTag.call(this, context);
	};
	IdentifierMethodNameTag = new Rexjs(IdentifierMethodNameTag, IdentifierPropertyNameTag);

	IdentifierMethodNameTag.props({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		}
	});

	return IdentifierMethodNameTag;
}(
	this.IdentifierPropertyNameTag
);

this.WordPropertyNameTag = function(IdentifierPropertyNameTag, POSTFIX_REGEXP_SOURCE){
	/**
	 * 词组属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function WordPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	WordPropertyNameTag = new Rexjs(WordPropertyNameTag, IdentifierPropertyNameTag);

	WordPropertyNameTag.static({
		/**
		 * 编译该标识符的表达式
		 * @param {String} identifier - 需提供的标识符，并该正则只匹配该标识符
		 */
		compileRegExp: function(identifier){
			return new RegExp(identifier + POSTFIX_REGEXP_SOURCE);
		}
	});

	WordPropertyNameTag.props({
		order: ECMAScriptOrders.WORD_PROPERTY_NAME,
		regexp: /[A-Za-z]+/
	});

	return WordPropertyNameTag;
}(
	this.IdentifierPropertyNameTag,
	// POSTFIX_REGEXP_SOURCE
	"(?!\\d+|\\d*" + IDENTIFIER_REGEXP_SOURCE + ")"
);

this.KeywordPropertyNameTag = function(WordPropertyNameTag, IdentifierPropertyNameExpression){
	/**
	 * 关键字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function KeywordPropertyNameTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	KeywordPropertyNameTag = new Rexjs(KeywordPropertyNameTag, WordPropertyNameTag);

	KeywordPropertyNameTag.props({
		order: ECMAScriptOrders.KEYWORD_PROPERTY_NAME,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new IdentifierPropertyNameExpression(context); 
		}
	});

	return KeywordPropertyNameTag;
}(
	this.WordPropertyNameTag,
	this.IdentifierPropertyNameExpression
);

}.call(
	this,
	this.PropertySeparatorTag,
	RegExp
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-identifier-name.js"
								);


eval(
									function(){
										// 属性初始值标签相关
~function(PropertyValueExpression){

this.PropertyInitializerExpression = function(config, extractTo, toTernary){
	/**
	 * 属性初始值表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} variable - 对象简写属性所对应的变量名
	 */
	function PropertyInitializerExpression(context, variable){
		PropertyValueExpression.call(this, context);

		this.variable = variable;
	};
	PropertyInitializerExpression = new Rexjs(PropertyInitializerExpression, PropertyValueExpression);

	PropertyInitializerExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 以三元表达式的形式追加
			toTernary(contentBuilder, this, "=");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析该表达式
			if(config.value){
				// 以三元表达式的形式追加
				toTernary(contentBuilder, this, ":");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: null
	});

	return PropertyInitializerExpression;
}(
	// config
	ECMAScriptConfig.addRexjsConfig("propertyInitializer"),
	PropertyValueExpression.prototype.extractTo,
	// toTernary
	function(contentBuilder, expression, assignment){
		var variableContent = expression.variable.context.content;
			
		// 追加 undefined 判断
		contentBuilder.appendString(
			assignment + variableContent + "===void 0?"
		);

		// 提取属性值
		expression.operand.extractTo(contentBuilder);

		// 追加三元运算的否定结果表达式
		contentBuilder.appendString(
			":" + variableContent
		);
	}
);

this.PropertyInitializerTag = function(BasicAssignmentTag, PropertyInitializerExpression, PropertyValueStatement){
	/**
	 * 属性初始值标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyInitializerTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	PropertyInitializerTag = new Rexjs(PropertyInitializerTag, BasicAssignmentTag);

	PropertyInitializerTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置属性表达式的值
			expression.value = new PropertyInitializerExpression(context, expression.name);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		}
	});

	return PropertyInitializerTag;
}(
	this.BasicAssignmentTag,
	this.PropertyInitializerExpression,
	this.PropertyValueStatement
);

}.call(
	this,
	this.PropertyValueExpression
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-initializer.js"
								);


eval(
									function(){
										// 对象计算式属性相关
~function(closeComputedPropertyNameTag, closeComputedMethodNameTag){

this.ComputedPropertyNameExpression = function(){
	/**
	 * 属性计算式表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ComputedPropertyNameExpression(open){
		PartnerExpression.call(this, open);
	};
	ComputedPropertyNameExpression = new Rexjs(ComputedPropertyNameExpression, PartnerExpression);

	ComputedPropertyNameExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			this.extractTo(contentBuilder);
		},
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加起始小括号，防止 inner 里面是逗号表达式，会出现意外
			contentBuilder.appendString("(");
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		destructTo: function(contentBuilder){
			// 直接提取
			this.extractTo(contentBuilder);
		}
	});

	return ComputedPropertyNameExpression;
}();

this.ObjectComputedNameStatement = function(){
	/**
	 * 对象计算式语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ObjectComputedNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ObjectComputedNameStatement = new Rexjs(ObjectComputedNameStatement, ECMAScriptStatement);

	ObjectComputedNameStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束中括号
			if(context.content !== "]"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 inner
			this.out().name.inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.name.context.tag;
		},
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 报错
				parser.error(context);
			}
		}
	})

	return ObjectComputedNameStatement;
}();

this.OpenComputedPropertyNameTag = function(OpenBracketTag, ComputedPropertyNameExpression, ObjectComputedNameStatement, config){
	/**
	 * 起始对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedPropertyNameTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenComputedPropertyNameTag = new Rexjs(OpenComputedPropertyNameTag, OpenBracketTag);

	OpenComputedPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedPropertyNameTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new ComputedPropertyNameExpression(context);

			// 如果需要编译计算式名称
			if(config.value){
				// 自动化生成变量
				statement.target.expression.autoVariable(statements);
			}
			
			// 设置当前属性
			statements.statement = new ObjectComputedNameStatement(statements);
		}
	});

	return OpenComputedPropertyNameTag;
}(
	this.OpenBracketTag,
	this.ComputedPropertyNameExpression,
	this.ObjectComputedNameStatement,
	// config
	ECMAScriptConfig.addBaseConfig("computedName")
);

this.CloseComputedPropertyNameTag = function(CloseBracketTag){
	/**
	 * 结束对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedPropertyNameTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseComputedPropertyNameTag = new Rexjs(CloseComputedPropertyNameTag, CloseBracketTag);

	CloseComputedPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.name.close = context;
		}
	});

	return CloseComputedPropertyNameTag;
}(
	this.CloseBracketTag
);

this.OpenComputedMethodNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedMethodNameTag(context){
		OpenComputedPropertyNameTag.call(this, context);
	};
	OpenComputedMethodNameTag = new Rexjs(OpenComputedMethodNameTag, OpenComputedPropertyNameTag);

	OpenComputedMethodNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedPropertyNameTag;
		}
	});

	return OpenComputedMethodNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseComputedMethodNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedMethodNameTag(context){
		CloseComputedPropertyNameTag.call(this, context);
	};
	CloseComputedMethodNameTag = new Rexjs(CloseComputedMethodNameTag, CloseComputedPropertyNameTag);

	CloseComputedMethodNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		}
	});

	return CloseComputedMethodNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeComputedPropertyNameTag = new this.CloseComputedPropertyNameTag();
closeComputedMethodNameTag = new this.CloseComputedMethodNameTag();

}.call(
	this,
	// closeComputedPropertyNameTag
	null,
	// closeComputedMethodNameTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-computed-name.js"
								);


eval(
									function(){
										// 对象简写方法相关
~function(OpenArgumentsTag, closeShorthandMethodArgumentsTag, closeShorthandMethodBodyTag){

this.ShorthandMethodExpression = function(FunctionExpression){
	/**
	 * 简写方法表达式
	 */
	function ShorthandMethodExpression(){
		FunctionExpression.call(this, null);
	};
	ShorthandMethodExpression = new Rexjs(ShorthandMethodExpression, FunctionExpression);

	ShorthandMethodExpression.props({
		head: new DefaultExpression()
	});

	return ShorthandMethodExpression;
}(
	this.FunctionExpression
);
	
this.ShorthandMethodValueExpression = function(PropertyValueExpression, config){
	/**
	 * 简写方法值表达式
	 */
	function ShorthandMethodValueExpression(){
		PropertyValueExpression.call(this, null);
	};
	ShorthandMethodValueExpression = new Rexjs(ShorthandMethodValueExpression, PropertyValueExpression);

	ShorthandMethodValueExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加冒号
			contentBuilder.appendString(":function");
			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加 赋值等于号 和 函数头部
			contentBuilder.appendString("=function");
			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析
			if(config.value){
				// 以定义属性的模式提取表达式文本内容
				this.defineTo(contentBuilder);
				return;
			}

			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		},
		/**
		 * 直接以简写形式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		shortTo: function(contentBuilder){
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		}
	});

	return ShorthandMethodValueExpression;
}(
	this.PropertyValueExpression,
	// config
	ECMAScriptConfig.addBaseConfig("shorthandMethod")
);

this.ShorthandMethodValueStatement = function(PropertyValueStatement, ShorthandMethodExpression){
	/**
	 * 对象简写方法值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ShorthandMethodValueStatement(statements){
		PropertyValueStatement.call(this, statements);

		this.expression = new ShorthandMethodExpression();
	};
	ShorthandMethodValueStatement = new Rexjs(ShorthandMethodValueStatement, PropertyValueStatement);

	ShorthandMethodValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出语句并设置属性值表达式的 operand 属性
			this.out().value.operand = this.expression;
		}
	});

	return ShorthandMethodValueStatement;
}(
	this.PropertyValueStatement,
	this.ShorthandMethodExpression
);

this.ShorthandMethodBodyStatements = function(FunctionBodyStatements){
	/**
	 * 简写方法主体语句块
	 */
	function ShorthandMethodBodyStatements(){
		FunctionBodyStatements.call(this);
	};
	ShorthandMethodBodyStatements = new Rexjs(ShorthandMethodBodyStatements, FunctionBodyStatements);

	ShorthandMethodBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 相当于申请应用 this 关键字
			this.applyThis(parser, context);
			// 返回属性表达式的 superDepth 属性
			return parser.statements.target.statement.target.target.expression.superDepth;
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 报错
			parser.error(open, ECMAScriptErrors.SUPER_CALL);
			return 0;
		}
	});

	return ShorthandMethodBodyStatements;
}(
	this.FunctionBodyStatements
);

this.OpenShorthandMethodArgumentsTag = function(ShorthandMethodValueExpression, ShorthandMethodValueStatement, visitor){
	/**
	 * 对象起始简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenShorthandMethodArgumentsTag(_type){
		OpenArgumentsTag.call(this, _type);
	};
	OpenShorthandMethodArgumentsTag = new Rexjs(OpenShorthandMethodArgumentsTag, OpenArgumentsTag);

	OpenShorthandMethodArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeShorthandMethodArgumentsTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置对象属性表达式的属性值
			statement.expression.value = new ShorthandMethodValueExpression();

			// 调用父类方法
			visitor.call(
				this,
				parser,
				context,
				statements.statement = new ShorthandMethodValueStatement(statements),
				statements
			);
		}
	});

	return OpenShorthandMethodArgumentsTag;
}(
	this.ShorthandMethodValueExpression,
	this.ShorthandMethodValueStatement,
	OpenArgumentsTag.prototype.visitor
);

this.CloseShorthandMethodArgumentsTag = function(CloseArgumentsTag){
	/**
	 * 对象结束简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseShorthandMethodArgumentsTag(_type){
		CloseArgumentsTag.call(this, _type);
	};
	CloseShorthandMethodArgumentsTag = new Rexjs(CloseShorthandMethodArgumentsTag, CloseArgumentsTag);

	CloseShorthandMethodArgumentsTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodBodyTags;
		}
	});

	return CloseShorthandMethodArgumentsTag;
}(
	this.CloseArgumentsTag
);

this.OpenShorthandMethodBodyTag = function(OpenFunctionBodyTag, ShorthandMethodBodyStatements){
	/**
	 * 对象简写方法参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenShorthandMethodBodyTag(_type){
		OpenFunctionBodyTag.call(this, _type);
	};
	OpenShorthandMethodBodyTag = new Rexjs(OpenShorthandMethodBodyTag, OpenFunctionBodyTag);

	OpenShorthandMethodBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeShorthandMethodBodyTag;
		},
		/**
		 * 进入函数主体语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			(
				parser.statements = new ShorthandMethodBodyStatements()
			)
			.target = statements;
		}
	});

	return OpenShorthandMethodBodyTag;
}(
	this.OpenFunctionBodyTag,
	this.ShorthandMethodBodyStatements
);

this.CloseShorthandMethodBodyTag = function(CloseFunctionBodyTag){
	/**
	 * 对象简写方法参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseShorthandMethodBodyTag(_type){
		CloseFunctionBodyTag.call(this, _type);
	};
	CloseShorthandMethodBodyTag = new Rexjs(CloseShorthandMethodBodyTag, CloseFunctionBodyTag);

	CloseShorthandMethodBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertySeparatorTags;
		}
	});

	return CloseShorthandMethodBodyTag;
}(
	this.CloseFunctionBodyTag
);

closeShorthandMethodArgumentsTag = new this.CloseShorthandMethodArgumentsTag();
closeShorthandMethodBodyTag = new this.CloseShorthandMethodBodyTag();

}.call(
	this,
	this.OpenArgumentsTag,
	// closeShorthandMethodArgumentsTag
	null,
	// closeShorthandMethodBodyTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-shorthand-method.js"
								);


eval(
									function(){
										// 对象属性访问器相关
~function(WordPropertyNameTag){

this.PropertyAccessorTag = function(FunctionExpression, AccessorStatement, visitor){
	/**
	 * 对象属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyAccessorTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	PropertyAccessorTag = new Rexjs(PropertyAccessorTag, WordPropertyNameTag);

	PropertyAccessorTag.props({
		/**
		 * 核对表达式是否为满足条件的函数表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 需要核对的表达式
		 * @param {Context} context- 当前解析内容的上下文
		 */
		checkFunction: function(parser, expression, context){
			// 如果是函数表达式
			if(expression instanceof FunctionExpression){
				var length = expression.arguments.inner.length;
				
				switch(true){
					// 如果长度小于最小参数长度
					case length < this.minArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.minArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					// 如果长度大于最大参数长度
					case length > this.maxArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.maxArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					default:
						return true;
				}
			}
			else {
				// 报错
				parser.error(context);
			}
			
			return false;
		},
		errorType: "",
		maxArgs: 0,
		minArgs: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 accessor 属性，记录 context
			statement.expression.accessor = context;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return PropertyAccessorTag;
}(
	this.FunctionExpression,
	this.AccessorStatement,
	WordPropertyNameTag.prototype.visitor
);

this.GetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	function GetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	GetTag = new Rexjs(GetTag, PropertyAccessorTag);

	GetTag.props({
		errorType: "GETTER",
		regexp: PropertyAccessorTag.compileRegExp("get")
	});

	return GetTag;
}(
	this.PropertyAccessorTag
);

this.SetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	function SetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	SetTag = new Rexjs(SetTag, PropertyAccessorTag);

	SetTag.props({
		errorType: "SETTER",
		maxArgs: 1,
		minArgs: 1,
		regexp: PropertyAccessorTag.compileRegExp("set")
	});

	return SetTag;
}(
	this.PropertyAccessorTag
);

}.call(
	this,
	this.WordPropertyNameTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-accessor.js"
								);


eval(
									function(){
										// 对象属性拓展项相关
~function(config){

this.SpreadPropertyExpression = function(PropertyExpression, SpreadExpression){
	/**
	 * 拓展属性表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SpreadPropertyExpression(context){
		PropertyExpression.call(this);

		// 设置属性值
		this.value = new SpreadExpression(context);
	};
	SpreadPropertyExpression = new Rexjs(SpreadPropertyExpression, PropertyExpression);

	SpreadPropertyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加对象赋值方法
			contentBuilder.appendString("Rexjs.SpreadItem.assign(" + anotherBuilder.result + ",");
			// 提取操作对象
			this.value.operand.extractTo(contentBuilder);
			// 追加方法结束小括号以及属性分隔符逗号
			contentBuilder.appendString("),");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 直接提取属性值
			this.value.extractTo(contentBuilder);
		},
		name: new DefaultExpression()
	});

	return SpreadPropertyExpression;
}(
	this.PropertyExpression,
	this.SpreadExpression
);

this.PropertySpreadTag = function(SpreadTag, SpreadPropertyExpression, SpreadStatement){
	/**
	 * 对象属性拓展项标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertySpreadTag(_type){
		SpreadTag.call(this, _type);
	};
	PropertySpreadTag = new Rexjs(PropertySpreadTag, SpreadTag);
	
	PropertySpreadTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = new SpreadPropertyExpression(context), boxStatement = new BoxStatement(statements);

			// 如果需要编译对象属性拓展项
			if(config.value){
				// 让对象表达式自动生成临时变量
				statement.target.expression.autoVariable(statements);
			}

			// 设置当前语句的表达式
			statement.expression = expression;
			// 设置盒语句的表达式，以模拟环境
			boxStatement.expression = expression.value;
			// 设置当前语句，以模拟环境
			statements.statement = boxStatement;
			// 再次设置当前语句
			statements.statement = new SpreadStatement(statements);
		}
	});
	
	return PropertySpreadTag;
}(
	this.SpreadTag,
	this.SpreadPropertyExpression,
	this.SpreadStatement
);

}.call(
	this,
	// config
	ECMAScriptConfig.addBaseConfig("propertySpreadItem")
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-spread-item.js"
								);


eval(
									function(){
										// 对象相关
~function(DestructuringExpression, propertySeparatorTag, closeObjectTag, destructItem){

this.ObjectDestructuringExpression = function(DestructuringExpression){
	/**
	 * 对象解构表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ObjectDestructuringExpression(origin){
		DestructuringExpression.call(this, origin.open, origin);
	};
	ObjectDestructuringExpression = new Rexjs(ObjectDestructuringExpression, DestructuringExpression);

	ObjectDestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(destructItem, contentBuilder, anotherBuilder);
		}
	});

	return ObjectDestructuringExpression;
}(
	this.DestructuringExpression
);

this.ObjectDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 对象解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ObjectDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ObjectDestructuringItemExpression = new Rexjs(ObjectDestructuringItemExpression, DestructuringItemExpression);

	ObjectDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(
				destructItem,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, anotherBuilder)
			);
		}
	});

	return ObjectDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.ObjectExpression = function(
	DestructibleExpression, ObjectDestructuringExpression,
	ObjectDestructuringItemExpression, PropertyDestructuringItemExpression, PropertyDestructuringDefaultItemExpression,
	LiteralPropertyNameExpression, ComputedPropertyNameExpression, ShorthandMethodExpression, PropertyInitializerExpression,
	IdentifierExpression, AssignableExpression, BinaryExpression,
	BasicAssignmentTag,
	config,
	extractTo, compileItem, collected
){
	/**
	 * 对象表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ObjectExpression(open){
		DestructibleExpression.call(this, open);
	};
	ObjectExpression = new Rexjs(ObjectExpression, DestructibleExpression);

	ObjectExpression.props({
		/**
		 * 自动化生成变量
		 * @param {ECMAScriptStatements} statements - 当前语句块
		 */
		autoVariable: function(statements){
			// 如果已经记录了变量
			if(this.variable){
				return;
			}

			// 记录变量
			this.variable = statements.collections.generate();
		},
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(parser){
			var exp, inner = this.inner;

			outerBlock:
			{
				// 遍历
				for(var i = inner.min, j = inner.length;i < j;i++){
					var expression = inner[i], name = expression.name, value = expression.value, operand = value.operand;
					
					exp = operand;

					// 判断属性名
					switch(true){
						// 如果是字面量属性名
						case name instanceof LiteralPropertyNameExpression:
							// 如果是简写属性默认值表达式
							if(value instanceof PropertyInitializerExpression){
								// 转化表达式
								expression = new PropertyDestructuringDefaultItemExpression(expression, expression, parser.statements);
								break;
							}
							
							// 如果是简写属性
							if(operand === null){
								// 如果已经被收集到常量内
								if(collected(parser, name, true)){
									break outerBlock;
								}

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;
							}

						// 如果是计算式属性名
						case name instanceof ComputedPropertyNameExpression:
							// 判断属性值，这里一定会对应上面的属性名判断，因为在匹配标签上下文的时候，就已经保护了表达式的正确性
							switch(true){
								// 如果是可赋值的属性值
								case operand instanceof AssignableExpression:
									// 如果已经被收集到常量内
									if(collected(parser, operand, operand instanceof IdentifierExpression)){
										break outerBlock;
									}

									// 转化表达式
									expression = new PropertyDestructuringItemExpression(expression);
									break;

								// 如果是二元表达式
								case operand instanceof BinaryExpression:
									// 如果二元运算表达式的标签是赋值符号
									if(operand.context.tag instanceof BasicAssignmentTag){
										// 如果二元表达式左侧是解构表达式
										if(operand.left instanceof DestructuringExpression){
											break outerBlock;
										}

										// 转化表达式
										expression = new PropertyDestructuringDefaultItemExpression(expression, operand, parser.statements);
										break;
									}

									break outerBlock;

								// 如果是可解构的表达式
								case operand instanceof DestructibleExpression:
									// 表明是嵌套解构子项
									value.destructuringItem = true;
									// 转化为解构子项
									value.operand = operand.toDestructuringItem(parser);

									// 转化表达式
									expression = new PropertyDestructuringItemExpression(expression);
									break;

								// 如果是简写表达式
								case operand instanceof ShorthandMethodExpression:
									// 设置需要报错的表达式
									exp = expression.accessible ? name : operand.arguments;
									break outerBlock;

								default:
									break outerBlock;
							}

							break;

						default:
							exp = name;
							break outerBlock;
					}

					// 重新设置表达式
					inner[i] = inner.latest = expression;
				}

				return;
			}

			// 报错
			parser.error(exp.context);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var variable = this.variable;

			// 如果存在变量名，说明需要分步设置属性
			if(variable){
				var anotherBuilder = new ContentBuilder();

				// 追加临时变量名
				anotherBuilder.appendString(variable);

				// 追加函数闭包头部
				contentBuilder.appendString("(" + variable + "={},");
				// 编译内容
				this.inner.forEach(compileItem, contentBuilder, anotherBuilder);
				// 追加函数闭包尾部
				contentBuilder.appendString(variable + ")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(parser){
			// 转换内部表达式
			this.convert(parser, this.inner);
			return new ObjectDestructuringExpression(this);
		},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(parser){
			var inner = this.inner, expression = new ObjectDestructuringItemExpression(this);

			// 如果需要解析解构表达式 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(config.value && inner.length > 1){
				var collections = parser.statements.collections;

				// 给刚生成的解构赋值表达式设置变量名
				expression.variable = (
					// 如果是声明形式的解构赋值
					this.declaration ?
						// 只需提供，不用在语句块进行定义
						collections.provide() :
						// 需要提供并定义
						collections.generate()
				);
			}

			// 转换内部表达式
			this.convert(parser, this.inner);
			return expression;
		},
		variable: ""
	});

	return ObjectExpression;
}(
	this.DestructibleExpression,
	this.ObjectDestructuringExpression,
	this.ObjectDestructuringItemExpression,
	this.PropertyDestructuringItemExpression,
	this.PropertyDestructuringDefaultItemExpression,
	this.LiteralPropertyNameExpression,
	this.ComputedPropertyNameExpression,
	this.ShorthandMethodExpression,
	this.PropertyInitializerExpression,
	this.IdentifierExpression,
	this.AssignableExpression,
	this.BinaryExpression,
	this.BasicAssignmentTag,
	DestructuringExpression.config,
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder, anotherBuilder){
		item.compileTo(contentBuilder, anotherBuilder);
	},
	// collected
	function(parser, expression, identifier){
		// 如果是标识符表达式
		if(identifier){
			var context = expression.context;

			// 判断是否收集到常量中
			return context.tag.collected(parser, context, parser.statements);
		}

		return false;
	}
);

this.OpenObjectTag = function(OpenBraceTag, ObjectExpression, PropertyStatement){
	/**
	 * 起始对象标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenObjectTag = new Rexjs(OpenObjectTag, OpenBraceTag);

	OpenObjectTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return propertySeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ObjectExpression(context);
			// 设置当前语句
			statements.statement = new PropertyStatement(statements);
		}
	});

	return OpenObjectTag;
}(
	this.OpenBraceTag,
	this.ObjectExpression,
	this.PropertyStatement
);

this.PropertySeparatorTag = function(CommaTag, PropertyStatement){
	/**
	 * 对象属性的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertySeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	PropertySeparatorTag = new Rexjs(PropertySeparatorTag, CommaTag);

	PropertySeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new PropertyStatement(statements);
		}
	});

	return PropertySeparatorTag;
}(
	this.CommaTag,
	this.PropertyStatement
);

this.CloseObjectTag = function(CloseBraceTag){
	/**
	 * 结束对象标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseObjectTag = new Rexjs(CloseObjectTag, CloseBraceTag);

	CloseObjectTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructibleExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.close = context;
		}
	});

	return CloseObjectTag;
}(
	this.CloseBraceTag
);

propertySeparatorTag = new this.PropertySeparatorTag();
closeObjectTag = new this.CloseObjectTag();

}.call(
	this,
	this.DestructuringExpression,
	// propertySeparatorTag
	null,
	// closeObjectTag
	null,
	// destructItem
	function(expression, contentBuilder, anotherBuilder){
		expression.compileTo(contentBuilder, anotherBuilder);
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/object.js"
								);


eval(
									function(){
										// 对象声明解构赋值相关
~function(variableDeclarationPropertySeparatorTag, closeDeclarationObjectTag){
	
this.DeclarationObjectExpression = function(ObjectExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} objectOf - 该对象所属的声明表达式
	 */
	function DeclarationObjectExpression(open, objectOf){
		ObjectExpression.call(this, open);

		this.objectOf = objectOf;
	};
	DeclarationObjectExpression = new Rexjs(DeclarationObjectExpression, ObjectExpression);

	DeclarationObjectExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		declaration: true,
		objectOf: null
	});

	return DeclarationObjectExpression;
}(
	this.ObjectExpression
);

this.OpenDeclarationObjectTag = function(OpenObjectTag, DeclarationObjectExpression, PropertyStatement){
	/**
	 * 变量声明对象起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDeclarationObjectTag(_type){
		OpenObjectTag.call(this, _type);
	};
	OpenDeclarationObjectTag = new Rexjs(OpenDeclarationObjectTag, OpenObjectTag);

	OpenDeclarationObjectTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDeclarationObjectTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return variableDeclarationPropertySeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new DeclarationObjectExpression(context, statement.target.expression);
			// 设置当前语句
			statements.statement = new PropertyStatement(statements);
		}
	});

	return OpenDeclarationObjectTag;
}(
	this.OpenObjectTag,
	this.DeclarationObjectExpression,
	this.PropertyStatement
);

this.DeclarationPropertySeparatorTag = function(PropertySeparatorTag){
	/**
	 * 对象属性的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertySeparatorTag(_type){
		PropertySeparatorTag.call(this, _type);
	};
	DeclarationPropertySeparatorTag = new Rexjs(DeclarationPropertySeparatorTag, PropertySeparatorTag);

	DeclarationPropertySeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyNameTags;
		}
	});

	return DeclarationPropertySeparatorTag;
}(
	this.PropertySeparatorTag
);

this.CloseDeclarationObjectTag = function(CloseObjectTag){
	/**
	 * 结束变量声明对象标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDeclarationObjectTag(_type){
		CloseObjectTag.call(this, _type);
	};
	CloseDeclarationObjectTag = new Rexjs(CloseDeclarationObjectTag, CloseObjectTag);

	CloseDeclarationObjectTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});

	return CloseDeclarationObjectTag;
}(
	this.CloseObjectTag
);

variableDeclarationPropertySeparatorTag = new this.DeclarationPropertySeparatorTag();
closeDeclarationObjectTag = new this.CloseDeclarationObjectTag();

}.call(
	this,
	// variableDeclarationPropertySeparatorTag
	null,
	// closeDeclarationObjectTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-object.js"
								);


eval(
									function(){
										// 对象解构声明的属性名相关
~function(IdentifierPropertyNameTag, PropertyDestructuringItemExpression, closeComputedDeclarationPropertyNameTag, require){

this.IdentifierDeclarationPropertyNameStatement = function(both){
	/**
	 * 标识符声明属性名称语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IdentifierDeclarationPropertyNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IdentifierDeclarationPropertyNameStatement = new Rexjs(IdentifierDeclarationPropertyNameStatement, ECMAScriptStatement);

	IdentifierDeclarationPropertyNameStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return both(
				parser,
				this,
				context.content === "}"
			);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			return both(
				parser,
				this,
				context.content === ","
			);
		}
	});

	return IdentifierDeclarationPropertyNameStatement;
}(
	// both
	function(parser, statement, isSeparator){
		// 跳出语句并获取表达式
		var expression = statement.out();

		// 如果是分隔符
		if(isSeparator){
			var context = expression.name.context, variable = statement.target.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			context.tag = variable;

			// 收集变量名
			variable.collectTo(parser, context, parser.statements);

			// 重新设置表达式
			statement.target.expression = new PropertyDestructuringItemExpression(expression);
		}

		return null;
	}
);

this.IdentifierDeclarationPropertyNameTag = function(IdentifierDeclarationPropertyNameStatement, visitor){
	/**
	 * 标识符声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierDeclarationPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	IdentifierDeclarationPropertyNameTag = new Rexjs(IdentifierDeclarationPropertyNameTag, IdentifierPropertyNameTag);

	IdentifierDeclarationPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.identifierDeclarationPropertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置当前语句
			statements.statement = new IdentifierDeclarationPropertyNameStatement(statements);
		}
	});

	return IdentifierDeclarationPropertyNameTag;
}(
	this.IdentifierDeclarationPropertyNameStatement,
	IdentifierPropertyNameTag.prototype.visitor
);

this.NumberDeclarationPropertyNameTag = function(NumberPropertyNameTag){
	/**
	 * 数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberDeclarationPropertyNameTag(_type){
		NumberPropertyNameTag.call(this, _type);
	};
	NumberDeclarationPropertyNameTag = new Rexjs(NumberDeclarationPropertyNameTag, NumberPropertyNameTag);

	NumberDeclarationPropertyNameTag.props({
		require: require
	});

	return NumberDeclarationPropertyNameTag;
}(
	this.NumberPropertyNameTag
);

this.BinaryNumberDeclarationPropertyNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 二进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberDeclarationPropertyNameTag(_type){
		BinaryNumberPropertyNameTag.call(this, _type);
	};
	BinaryNumberDeclarationPropertyNameTag = new Rexjs(BinaryNumberDeclarationPropertyNameTag, BinaryNumberPropertyNameTag);

	BinaryNumberDeclarationPropertyNameTag.props({
		require: require
	});

	return BinaryNumberDeclarationPropertyNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.OctalNumberDeclarationPropertyNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 八进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberDeclarationPropertyNameTag(_type){
		OctalNumberPropertyNameTag.call(this, _type);
	};
	OctalNumberDeclarationPropertyNameTag = new Rexjs(OctalNumberDeclarationPropertyNameTag, OctalNumberPropertyNameTag);

	OctalNumberDeclarationPropertyNameTag.props({
		require: require
	});

	return OctalNumberDeclarationPropertyNameTag;
}(
	this.OctalNumberPropertyNameTag
);

this.KeywordDeclarationPropertyNameTag = function(KeywordPropertyNameTag){
	/**
	 * 关键字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function KeywordDeclarationPropertyNameTag(_type){
		KeywordPropertyNameTag.call(this, _type);
	};
	KeywordDeclarationPropertyNameTag = new Rexjs(KeywordDeclarationPropertyNameTag, KeywordPropertyNameTag);

	KeywordDeclarationPropertyNameTag.props({
		require: require
	});

	return KeywordDeclarationPropertyNameTag;
}(
	this.KeywordPropertyNameTag
);

this.StringDeclarationPropertyNameTag = function(StringPropertyNameTag){
	/**
	 * 字符串声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function StringDeclarationPropertyNameTag(_type){
		StringPropertyNameTag.call(this, _type);
	};
	StringDeclarationPropertyNameTag = new Rexjs(StringDeclarationPropertyNameTag, StringPropertyNameTag);

	StringDeclarationPropertyNameTag.props({
		require: require
	});

	return StringDeclarationPropertyNameTag;
}(
	this.StringPropertyNameTag
);

this.OpenComputedDeclarationPropertyNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedDeclarationPropertyNameTag(_type){
		OpenComputedPropertyNameTag.call(this, _type);
	};
	OpenComputedDeclarationPropertyNameTag = new Rexjs(OpenComputedDeclarationPropertyNameTag, OpenComputedPropertyNameTag);

	OpenComputedDeclarationPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedDeclarationPropertyNameTag;
		}
	});

	return OpenComputedDeclarationPropertyNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseComputedDeclarationPropertyNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedDeclarationPropertyNameTag(_type){
		CloseComputedPropertyNameTag.call(this, _type);
	};
	CloseComputedDeclarationPropertyNameTag = new Rexjs(CloseComputedDeclarationPropertyNameTag, CloseComputedPropertyNameTag);

	CloseComputedDeclarationPropertyNameTag.props({
		require: require
	});

	return CloseComputedDeclarationPropertyNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeComputedDeclarationPropertyNameTag = new this.CloseComputedDeclarationPropertyNameTag();

}.call(
	this,
	this.IdentifierPropertyNameTag,
	this.PropertyDestructuringItemExpression,
	// closeComputedDeclarationPropertyNameTag
	null,
	// require
	function(tagsMap){
		return tagsMap.declarationPropertyNameSeparatorTags;
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-property-name.js"
								);


eval(
									function(){
										// 对象解构声明的属性名分隔符相关
~function(PropertyInitializerTag, PropertyNameSeparatorTag, initBoxStatement){

this.DeclarationPropertyNameInitializerTag = function(PropertyDestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明属性名初始化标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyNameInitializerTag(_type){
		PropertyInitializerTag.call(this, _type);
	};
	DeclarationPropertyNameInitializerTag = new Rexjs(DeclarationPropertyNameInitializerTag, PropertyInitializerTag);

	DeclarationPropertyNameInitializerTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, ctx = expression.name.context,
			
				variable = statement.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			ctx.tag = variable;

			// 收集变量名
			variable.collectTo(parser, ctx, statements);

			// 调用父类访问器
			visitor.call(
				this,
				parser,
				context,
				initBoxStatement(statement, statements),
				statements
			);

			// 重写表达式
			statement.expression = new PropertyDestructuringDefaultItemExpression(expression, expression, statements);
		}
	});

	return DeclarationPropertyNameInitializerTag;
}(
	this.PropertyDestructuringDefaultItemExpression,
	PropertyInitializerTag.prototype.visitor
);

this.DeclarationPropertyNameSeparatorTag = function(visitor){
	/**
	 * 变量声明属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyNameSeparatorTag(_type){
		PropertyNameSeparatorTag.call(this, _type);
	};
	DeclarationPropertyNameSeparatorTag = new Rexjs(DeclarationPropertyNameSeparatorTag, PropertyNameSeparatorTag);

	DeclarationPropertyNameSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyValueTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(
				this,
				parser,
				context,
				initBoxStatement(statement, statements),
				statements
			);
		}
	});

	return DeclarationPropertyNameSeparatorTag;
}(
	PropertyNameSeparatorTag.prototype.visitor
);

}.call(
	this,
	this.PropertyInitializerTag,
	this.PropertyNameSeparatorTag,
	// initBoxStatement
	function(statement, statements){
		var boxStatement = new BoxStatement(statements);
	
		// 设置盒子语句的表达式，以模拟非解构时的语句环境
		boxStatement.expression = statement.expression;
		// 设置当前语句为盒子语句
		statements.statement = boxStatement;

		return boxStatement;
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-property-separator.js"
								);


eval(
									function(){
										// 对象解构声明的属性值相关
~function(PropertyDestructuringItemExpression, CloseDeclarationObjectTag, VariableDeclarationTag, BasicAssignmentTag, closeArrayDeclarationPropertyValueTag, closeObjectDeclarationPropertyValueTag){

this.OpenObjectDeclarationPropertyValueTag = function(OpenDeclarationObjectTag, DeclarationObjectExpression, PropertyStatement){
	/**
	 * 对象声明属性值（即：对象解构中所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectDeclarationPropertyValueTag(_type){
		OpenDeclarationObjectTag.call(this, _type);
	};
	OpenObjectDeclarationPropertyValueTag = new Rexjs(OpenObjectDeclarationPropertyValueTag, OpenDeclarationObjectTag);
	
	OpenObjectDeclarationPropertyValueTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectDeclarationPropertyValueTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyStatement = statement.target.target, propertyExpression = propertyStatement.expression;

			// 设置当前表达式
			statement.expression = new DeclarationObjectExpression(
				context,
				propertyStatement.target.expression.objectOf
			);

			// 设置当前语句
			statements.statement = new PropertyStatement(statements);

			// 设置 destructuringItem 属性，以标识为解构子项
			propertyExpression.value.destructuringItem = true;
			// 重新设置属性语句的表达式为属性解构子项表达式
			propertyStatement.expression = new PropertyDestructuringItemExpression(propertyExpression);
		}
	});

	return OpenObjectDeclarationPropertyValueTag;
}(
	this.OpenDeclarationObjectTag,
	this.DeclarationObjectExpression,
	this.PropertyStatement
);

this.CloseObjectDeclarationPropertyValueTag = function(visitor){
	/**
	 * 对象声明属性值（即：对象解构中所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectDeclarationPropertyValueTag(_type){
		CloseDeclarationObjectTag.call(this, _type);
	};
	CloseObjectDeclarationPropertyValueTag = new Rexjs(CloseObjectDeclarationPropertyValueTag, CloseDeclarationObjectTag);
	
	CloseObjectDeclarationPropertyValueTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertySeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseObjectDeclarationPropertyValueTag;
}(
	CloseDeclarationObjectTag.prototype.visitor
);

this.OpenArrayDeclarationPropertyValueTag = function(OpenNestedDeclarationArrayItemTag, DeclarationArrayExpression, ArrayStatement){
	/**
	 * 数组声明属性值（即：对象解构中所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrayDeclarationPropertyValueTag(_type){
		OpenNestedDeclarationArrayItemTag.call(this, _type);
	};
	OpenArrayDeclarationPropertyValueTag = new Rexjs(OpenArrayDeclarationPropertyValueTag, OpenNestedDeclarationArrayItemTag);
	
	OpenArrayDeclarationPropertyValueTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrayDeclarationPropertyValueTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyStatement = statement.target.target, propertyExpression = propertyStatement.expression;

			// 设置当前表达式
			statement.expression = new DeclarationArrayExpression(
				context,
				propertyStatement.target.expression.objectOf
			);

			// 设置当前语句
			statements.statement = new ArrayStatement(statements);

			// 设置 destructuringItem 属性，以标识为解构子项
			propertyExpression.value.destructuringItem = true;
			// 重新设置属性语句的表达式为属性解构子项表达式
			propertyStatement.expression = new PropertyDestructuringItemExpression(propertyExpression);
		}
	});

	return OpenArrayDeclarationPropertyValueTag;
}(
	this.OpenNestedDeclarationArrayItemTag,
	this.DeclarationArrayExpression,
	this.ArrayStatement
);

this.CloseArrayDeclarationPropertyValueTag = function(CloseNestedDeclarationArrayItemTag){
	/**
	 * 数组声明属性值（即：对象解构中所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrayDeclarationPropertyValueTag(_type){
		CloseNestedDeclarationArrayItemTag.call(this, _type);
	};
	CloseArrayDeclarationPropertyValueTag = new Rexjs(CloseArrayDeclarationPropertyValueTag, CloseNestedDeclarationArrayItemTag);
	
	CloseArrayDeclarationPropertyValueTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertySeparatorTags;
		}
	});
	
	return CloseArrayDeclarationPropertyValueTag;
}(
	this.CloseNestedDeclarationArrayItemTag
);

this.DeclarationPropertyValueTag = function(PropertyDestructuringItemExpression, visitor){
	/**
	 * 对象解构声明的属性值标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyValueTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	DeclarationPropertyValueTag = new Rexjs(DeclarationPropertyValueTag, VariableDeclarationTag);
	
	DeclarationPropertyValueTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyValueContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyStatement = statement.target.target, variable = propertyStatement.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			context.tag = variable;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 重新设置属性语句的表达式
			propertyStatement.expression = new PropertyDestructuringItemExpression(propertyStatement.expression);
		}
	});
	
	return DeclarationPropertyValueTag;
}(
	this.PropertyDestructuringItemExpression,
	VariableDeclarationTag.prototype.visitor
);

this.DeclarationPropertyValueInitializerTag = function(PropertyDestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明属性值初始化标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyValueInitializerTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DeclarationPropertyValueInitializerTag = new Rexjs(DeclarationPropertyValueInitializerTag, BasicAssignmentTag);

	DeclarationPropertyValueInitializerTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var target = statement.target;

			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 覆盖表达式
			target.target.expression = new PropertyDestructuringDefaultItemExpression(target.expression, statement.expression, statements);
		}
	});

	return DeclarationPropertyValueInitializerTag;
}(
	this.PropertyDestructuringDefaultItemExpression,
	BasicAssignmentTag.prototype.visitor
);

closeArrayDeclarationPropertyValueTag = new this.CloseArrayDeclarationPropertyValueTag();
closeObjectDeclarationPropertyValueTag = new this.CloseObjectDeclarationPropertyValueTag();

}.call(
	this,
	this.PropertyDestructuringItemExpression,
	this.CloseDeclarationObjectTag,
	this.VariableDeclarationTag,
	this.BasicAssignmentTag,
	// closeArrayDeclarationPropertyValueTag
	null,
	// closeObjectDeclarationPropertyValueTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-property-value.js"
								);


eval(
									function(){
										// 数组声明解构内的对象解构相关
~function(CloseDeclarationObjectTag, closeObjectDeclarationArrayItemTag){

this.OpenObjectDeclarationArrayItemTag = function(OpenDeclarationObjectTag, DeclarationObjectExpression, PropertyStatement){
	/**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectDeclarationArrayItemTag(_type){
		OpenDeclarationObjectTag.call(this, _type);
	};
	OpenObjectDeclarationArrayItemTag = new Rexjs(OpenObjectDeclarationArrayItemTag, OpenDeclarationObjectTag);
	
	OpenObjectDeclarationArrayItemTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectDeclarationArrayItemTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new DeclarationObjectExpression(context, statement.target.expression.arrayOf);
			// 设置当前语句
			statements.statement = new PropertyStatement(statements);
		}
	});

	return OpenObjectDeclarationArrayItemTag;
}(
	this.OpenDeclarationObjectTag,
	this.DeclarationObjectExpression,
	this.PropertyStatement
);

this.CloseObjectDeclarationArrayItemTag = function(visitor){
	/**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectDeclarationArrayItemTag(_type){
		CloseDeclarationObjectTag.call(this, _type);
	};
	CloseObjectDeclarationArrayItemTag = new Rexjs(CloseObjectDeclarationArrayItemTag, CloseDeclarationObjectTag);
	
	CloseObjectDeclarationArrayItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseObjectDeclarationArrayItemTag;
}(
	CloseDeclarationObjectTag.prototype.visitor
);

closeObjectDeclarationArrayItemTag = new this.CloseObjectDeclarationArrayItemTag();

}.call(
	this,
	this.CloseDeclarationObjectTag,
	// closeObjectDeclarationArrayItemTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-array-item-object.js"
								);


eval(
									function(){
										// 标记标签相关
~function(){

this.LabelledExpression = function(){
	/**
	 * 标记表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LabelledExpression(context){
		Expression.call(this, context);
	};
	LabelledExpression = new Rexjs(LabelledExpression, Expression);

	LabelledExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加标签名
			contentBuilder.appendContext(this.context);
			// 追加冒号
			contentBuilder.appendString(":");
			// 提取语句表达式内容
			this.statementExpression.extractTo(contentBuilder);
		},
		statementExpression: null
	});
	
	return LabelledExpression;
}();

this.LabelledStatement = function(){
	/**
	 * 标记语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function LabelledStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	LabelledStatement = new Rexjs(LabelledStatement, ECMAScriptStatement);
	
	LabelledStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 statementExpression
			this.out().statementExpression = this.expression
		}
	});
	
	return LabelledStatement;
}();

this.LabelTag = function(VariableTag){
	/**
	 * 标记标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelTag(_type){
		VariableTag.call(this, _type);
	};
	LabelTag = new Rexjs(LabelTag, VariableTag);
	
	LabelTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.labelContextTags;
		}
	});
	
	return LabelTag;
}(
	this.VariableTag
);

this.LabelColonTag = function(ColonTag, LabelledExpression, LabelledStatement){
	/**
	 * 标记冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelColonTag(_type){
		ColonTag.call(this, _type);
	};
	LabelColonTag = new Rexjs(LabelColonTag, ColonTag);
	
	LabelColonTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new LabelledExpression(statement.expression.context);
			// 设置当前语句
			statements.statement = new LabelledStatement(statements);
		}
	});
	
	return LabelColonTag;
}(
	this.ColonTag,
	this.LabelledExpression,
	this.LabelledStatement
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/label.js"
								);


eval(
									function(){
										// 中断流相关
~function(){

this.TerminatedFlowExpression = function(){
	/**
	 * 中断流表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TerminatedFlowExpression(context){
		Expression.call(this, context);
	};
	TerminatedFlowExpression = new Rexjs(TerminatedFlowExpression, Expression);
	
	TerminatedFlowExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var object = this.object;

			// 追加关键字
			contentBuilder.appendContext(this.context);

			// 如果是空表达式
			if(object instanceof EmptyExpression){
				return;
			}

			// 追加空格
			contentBuilder.appendSpace();
			// 提取对象
			object.extractTo(contentBuilder);
		},
		object: null
	});
	
	return TerminatedFlowExpression;
}();

this.TerminatedFlowStatement = function(){
	/**
	 * 中断流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedFlowStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TerminatedFlowStatement = new Rexjs(TerminatedFlowStatement, ECMAScriptStatement);

	TerminatedFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 object
			this.out().object = this.expression;
		}
	});
	
	return TerminatedFlowStatement;
}();

this.TerminatedFlowTag = function(TerminatedFlowExpression, TerminatedFlowStatement){
	/**
	 * 中断流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedFlowTag(_type){
		SyntaxTag.call(this, _type);
	};
	TerminatedFlowTag = new Rexjs(TerminatedFlowTag, SyntaxTag);
	
	TerminatedFlowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_MAIN,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new TerminatedFlowExpression(context);
			// 设置当前语句
			statements.statement = new TerminatedFlowStatement(statements);
		}
	});
	
	return TerminatedFlowTag;
}(
	this.TerminatedFlowExpression,
	this.TerminatedFlowStatement
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/terminated-flow.js"
								);


eval(
									function(){
										// 中断流标签子类相关
~function(TerminatedFlowTag){

this.ReturnTag = function(SCOPE_CLOSURE, visitor){
	/**
	 * return 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ReturnTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ReturnTag = new Rexjs(ReturnTag, TerminatedFlowTag);
	
	ReturnTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_LINEAR,
		regexp: /return/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.returnContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果存在闭包
			if(statements.closure){
				// 调用父类访问器
				visitor.call(this, parser, context, statement, statements);

				// 设置当前表达式为空表达式
				statements.statement.expression = new EmptyExpression(null);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", "return")
			);
		}
	});
	
	return ReturnTag;
}(
	this.ECMAScriptStatements.SCOPE_CLOSURE,
	TerminatedFlowTag.prototype.visitor
);

}.call(
	this,
	this.TerminatedFlowTag,
	this.ECMAScriptStatements
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/return.js"
								);


eval(
									function(){
										// 中断流标签子类相关
~function(){

this.ThrowTag = function(TerminatedFlowTag){
	/**
	 * throw 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ThrowTag = new Rexjs(ThrowTag, TerminatedFlowTag);
	
	ThrowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /throw/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.throwContextTags;
		}
	});
	
	return ThrowTag;
}(
	this.TerminatedFlowTag
);

this.ThrowContextLineTerminatorTag = function(IllegalLineTerminatorTag){
	/**
	 * throw 关键字上下文的行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowContextLineTerminatorTag(_type){
		IllegalLineTerminatorTag.call(this, _type);
	};
	ThrowContextLineTerminatorTag = new Rexjs(ThrowContextLineTerminatorTag, IllegalLineTerminatorTag);

	ThrowContextLineTerminatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE_AFTER_THROW);
		}
	});

	return ThrowContextLineTerminatorTag;
}(
	this.IllegalLineTerminatorTag
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/throw.js"
								);


eval(
									function(){
										// 迭代中断流类相关
~function(TerminatedFlowStatement, SCOPE_CLOSURE){

this.TerminatedBranchFlowStatement = function(catchMethod, withoutAnyFlow){
	/**
	 * 中断分支流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedBranchFlowStatement(statements){
		TerminatedFlowStatement.call(this, statements);
		
		this.expression = new EmptyExpression(null);
	};
	TerminatedBranchFlowStatement = new Rexjs(TerminatedBranchFlowStatement, TerminatedFlowStatement);

	TerminatedBranchFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression, terminatedFlowExpression = this.target.expression;

			switch(false){
				// 如果不是空表达式，说明是属于标记表达式，而标记表达式已经经过验证
				case expression instanceof EmptyExpression:
					break;

				// 如果存在指定的流语句中
				case withoutAnyFlow(this.statements, terminatedFlowExpression.context.tag.flow):
					break;

				// 默认
				default:
					// 报错
					parser.error(
						terminatedFlowExpression.context,
						ECMAScriptErrors.template(
							"ILLEGAL_STATEMENT",
							terminatedFlowExpression.context.content
						)
					);
					return;
			}

			// 调用父类方法
			return catchMethod.call(this, parser, context);
		}
	});
	
	return TerminatedBranchFlowStatement;
}(
	TerminatedFlowStatement.prototype.catch,
	// withoutAnyFlow
	function(statements, flow){
		// 如果语句块存在
		while(statements){
			var statement = statements.statement;

			// 如果语句存在
			while(statement){
				// 如果流一致
				if((statement.flow & flow) === flow){
					return false;
				}

				statement = statement.target;
			}

			// 如果是闭包，返回 null，中断循环，否则获取 target
			statements = (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		}

		return true;
	}
);

this.TerminatedBranchFlowTag = function(TerminatedFlowTag, TerminatedFlowExpression, TerminatedBranchFlowStatement, LabelledStatement){
	/**
	 * 中断分支流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedBranchFlowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	TerminatedBranchFlowTag = new Rexjs(TerminatedBranchFlowTag, TerminatedFlowTag);
	
	TerminatedBranchFlowTag.props({
		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} labelStatement - 标签定义语句
		 * @param {String} label - 需要核对的标记文本值
		 */
		checkFlowStatement: function(statement, label){
			// 如果当前语句是标记语句
			if(statement instanceof LabelledStatement){
				// 返回标签对比结果
				return statement.target.expression.context.content === label;
			}

			return false;
		},
		flow: ECMAScriptStatement.FLOW_BRANCH,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.terminatedBranchFlowContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new TerminatedFlowExpression(context);
			// 设置当前语句
			statements.statement = new TerminatedBranchFlowStatement(statements);
		}
	});
	
	return TerminatedBranchFlowTag;
}(
	this.TerminatedFlowTag,
	this.TerminatedFlowExpression,
	this.TerminatedBranchFlowStatement,
	this.LabelledStatement
);

this.LabelledIdentifierTag = function(LabelTag, withoutAnyFlow){
	/**
	 * 标记标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelledIdentifierTag(_type){
		LabelTag.call(this, _type);
	};
	LabelledIdentifierTag = new Rexjs(LabelledIdentifierTag, LabelTag);
	
	LabelledIdentifierTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果没有存在指定的流语句中
			if(withoutAnyFlow(statements, statement.target.expression.context.tag, context.content)){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template(
						"LABEL",
						statement.target.expression.context.content,
						context.content
					)
				);

				return;
			}

			// 设置当前表达式
			statement.expression = new Expression(context);
		}
	});
	
	return LabelledIdentifierTag;
}(
	this.LabelTag,
	// withoutAnyFlow
	function(statements, terminatedFlowTag, content){
		// 如果语句块存在
		while(statements){
			var statement = statements.statement;

			// 如果语句存在
			while(statement){
				// 如果流语句核对有效
				if(terminatedFlowTag.checkFlowStatement(statement, content)){
					return false;
				}

				statement = statement.target;
			}

			// 如果是闭包，则获取 target，否则等于 null，中断循环
			statements = (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		}

		return true;
	}
);

}.call(
	this,
	this.TerminatedFlowStatement,
	this.ECMAScriptStatements.SCOPE_CLOSURE
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/terminated-brach-flow.js"
								);


eval(
									function(){
										// 迭代中断流子类相关
~function(TerminatedBranchFlowTag){

this.BreakTag = function(){
	/**
	 * break 标签
	 * @param {Number} _type - 标签类型
	 */
	function BreakTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	BreakTag = new Rexjs(BreakTag, TerminatedBranchFlowTag);
	
	BreakTag.props({
		regexp: /break/
	});
	
	return BreakTag;
}();

this.ContinueTag = function(FLOW_CIRCULAR, checkFlowStatement){
	/**
	 * continue 标签
	 * @param {Number} _type - 标签类型
	 */
	function ContinueTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	ContinueTag = new Rexjs(ContinueTag, TerminatedBranchFlowTag);
	
	ContinueTag.props({
		/**
		 * 核对标记语句，是否满足当前中断流所对应的标记
		 * @param {Statement} flowStatement - 标签语句
		 * @param {String} label - 需要核对的标记文本值
		 */
		checkFlowStatement: function(flowStatement, label){
			// 如果语句流一致
			if((flowStatement.flow & FLOW_CIRCULAR) === FLOW_CIRCULAR){
				// 返回父类判断结果
				return checkFlowStatement.call(this, flowStatement.target, label);
			}

			return false;
		},
		flow: FLOW_CIRCULAR,
		regexp: /continue/
	});
	
	return ContinueTag;
}(
	// FLOW_CIRCULAR
	ECMAScriptStatement.FLOW_CIRCULAR,
	TerminatedBranchFlowTag.prototype.checkFlowStatement
);

}.call(
	this,
	this.TerminatedBranchFlowTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/break-continue.js"
								);


eval(
									function(){
										// var 语句相关
~function(VariableDeclarationTag, closureVariableTag, varDeclarationSeparatorTag){

this.VarExpression = function(BinaryExpression, DestructuringExpression){
	/**
	 * var 表达式
	 * @param {Context} context - 标签上下文
	 * @param {ECMAScriptVariableCollections} collections - 当前所处环境的变量收集器集合
	 */
	function VarExpression(context, collections){
		Expression.call(this, context);

		this.list = new ListExpression(null, ",");
		this.range = collections.declaration.range();
	};
	VarExpression = new Rexjs(VarExpression, Expression);

	VarExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取 var 关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();

			// 提取变量列表
			this.list.extractTo(contentBuilder);
		},
		list: null,
		/**
		 * 遍历该表达式中所有的变量名，执行指定回调
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		variables: function(callback, _contentBuilder, _anotherBuilder){
			var list = this.list;

			debugger
			// 遍历 list
			for(var i = 0, j = list.length;i < j;i++){
				var variable, expression = list[i];

				// 如果是二元表达式
				if(expression instanceof BinaryExpression){
					var left = expression.left;

					variable = (
						// 如果是解构表达式
						left instanceof DestructuringExpression ?
							// 获取解构赋值表达式的临时
							expression.variable :
							left.context.content
					);
				}
				// 如果是
				else {
					// 获取上下文内容
					variable = expression.context.content;
				}

				// 执行回调
				callback(variable, _contentBuilder, _anotherBuilder);
			}
		},
		range: null
	});

	return VarExpression;
}(
	this.BinaryExpression,
	this.DestructuringExpression
);

this.VarStatement = function(){
	/**
	 * var 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function VarStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	VarStatement = new Rexjs(VarStatement, ECMAScriptStatement);
	
	VarStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().list.add(this.expression);
			// 结束 var 表达式的变量名范围
			this.target.expression.range.end();

			// 如果是逗号，返回指定的分隔符，否则返回 null
			return context.content === "," ? this.bindingOf() : null;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().list.add(this.expression);
			// 返回分隔符标签
			return this.bindingOf();
		}
	});
	
	return VarStatement;
}();

this.VarTag = function(VarExpression, VarStatement){
	/**
	 * var 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VarTag(_type){
		SyntaxTag.call(this, _type);
	};
	VarTag = new Rexjs(VarTag, SyntaxTag);

	VarTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return varDeclarationSeparatorTag;
		},
		regexp: /var/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return closureVariableTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new VarExpression(context, statements.collections);

			// 设置当前语句
			statements.statement = new VarStatement(statements)
		}
	});

	return VarTag;
}(
	this.VarExpression,
	this.VarStatement
);

this.ClosureVariableTag = function(){
	/**
	 * 闭包内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosureVariableTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ClosureVariableTag = new Rexjs(ClosureVariableTag, VariableDeclarationTag);
	
	ClosureVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closureVariableContextTags;
		}
	});
	
	return ClosureVariableTag;
}();

this.VarDeclarationSeparatorTag = function(CommaTag, VarStatement){
	/**
	 * var 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function VarDeclarationSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	VarDeclarationSeparatorTag = new Rexjs(VarDeclarationSeparatorTag, CommaTag);
	
	VarDeclarationSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new VarStatement(statements)
		}
	});
	
	return VarDeclarationSeparatorTag;
}(
	this.CommaTag,
	this.VarStatement
);

closureVariableTag = new this.ClosureVariableTag();
varDeclarationSeparatorTag = new this.VarDeclarationSeparatorTag();

}.call(
	this,
	this.VariableDeclarationTag,
	// closureVariableTag
	null,
	// varDeclarationSeparatorTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/var.js"
								);


eval(
									function(){
										// let 语句相关
~function(ClosureVariableTag, localVariableTag, letDeclarationSeparatorTag){

this.LetTag = function(VarTag, config){
	/**
	 * let 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function LetTag(_type){
		VarTag.call(this, _type);
	};
	LetTag = new Rexjs(LetTag, VarTag);

	LetTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return letDeclarationSeparatorTag;
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.value ? "var" : content);
		},
		regexp: /let/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return localVariableTag;
		}
	});

	return LetTag;
}(
	this.VarTag,
	// config
	ECMAScriptConfig.addBaseConfig("let")
);

this.LocalVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function LocalVariableTag(_type){
		ClosureVariableTag.call(this, _type);
	};
	LocalVariableTag = new Rexjs(LocalVariableTag, ClosureVariableTag);
	
	LocalVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			collectTo.call(this, parser, context, statements);
			// 收集变量名
			statements.collections.blacklist.collect(context.content);
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.declaration.contains(variable);
		}
	});
	
	return LocalVariableTag;
}(
	ClosureVariableTag.prototype.collectTo
);

this.LetDeclarationSeparatorTag = function(VarDeclarationSeparatorTag){
	/**
	 * let 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function LetDeclarationSeparatorTag(_type){
		VarDeclarationSeparatorTag.call(this, _type);
	};
	LetDeclarationSeparatorTag = new Rexjs(LetDeclarationSeparatorTag, VarDeclarationSeparatorTag);
	
	LetDeclarationSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		}
	});
	
	return LetDeclarationSeparatorTag;
}(
	this.VarDeclarationSeparatorTag
);

localVariableTag = new this.LocalVariableTag();
letDeclarationSeparatorTag = new this.LetDeclarationSeparatorTag();

}.call(
	this,
	this.ClosureVariableTag,
	// localVariableTag
	null,
	// letDeclarationSeparatorTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/let.js"
								);


eval(
									function(){
										// const 语句相关
~function(VarExpression, IdentifierExpression, VarStatement, LocalVariableTag, constVariableTag, constDeclarationSeparatorTag){

this.ConstStatement = function(catchMethod, tryMethod){
	/**
	 * const 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ConstStatement(statements){
		VarStatement.call(this, statements);
	};
	ConstStatement = new Rexjs(ConstStatement, VarStatement);
	
	ConstStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果表达式是可赋值表达式
			if(this.expression instanceof IdentifierExpression){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				// 返回分隔符标签
				return null;
			}

			return catchMethod.call(this, parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果表达式是可赋值表达式
			if(this.expression instanceof IdentifierExpression){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				return null;
			}

			// 调用父类方法
			return tryMethod.call(this, parser, context);
		}
	});
	
	return ConstStatement;
}(
	VarStatement.prototype.catch,
	VarStatement.prototype.try
);

this.ConstTag = function(LetTag, ConstStatement, config){
	/**
	 * const 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstTag(_type){
		LetTag.call(this, _type);
	};
	ConstTag = new Rexjs(ConstTag, LetTag);

	ConstTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return constDeclarationSeparatorTag;
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.value ? "var" : content);
		},
		regexp: /const/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return constVariableTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new VarExpression(context, statements.collections);
			// 设置当前语句
			statements.statement = new ConstStatement(statements);
		}
	});

	return ConstTag;
}(
	this.LetTag,
	this.ConstStatement,
	// config
	ECMAScriptConfig.addBaseConfig("const")
);

this.ConstVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstVariableTag(_type){
		LocalVariableTag.call(this, _type);
	};
	ConstVariableTag = new Rexjs(ConstVariableTag, LocalVariableTag);
	
	ConstVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			collectTo.call(this, parser, context, statements);
			// 收集变量名
			statements.collections.const.collect(context.content);
		}
	});
	
	return ConstVariableTag;
}(
	LocalVariableTag.prototype.collectTo
);

this.ConstDeclarationSeparatorTag = function(LetDeclarationSeparatorTag, ConstStatement){
	/**
	 * const 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstDeclarationSeparatorTag(_type){
		LetDeclarationSeparatorTag.call(this, _type);
	};
	ConstDeclarationSeparatorTag = new Rexjs(ConstDeclarationSeparatorTag, LetDeclarationSeparatorTag);
	
	ConstDeclarationSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ConstStatement(statements);
		}
	});
	
	return ConstDeclarationSeparatorTag;
}(
	this.LetDeclarationSeparatorTag,
	this.ConstStatement
);

constVariableTag = new this.ConstVariableTag();
constDeclarationSeparatorTag = new this.ConstDeclarationSeparatorTag();

}.call(
	this,
	this.VarExpression,
	this.IdentifierExpression,
	this.VarStatement,
	this.LocalVariableTag,
	// constVariableTag
	null,
	// constDeclarationSeparatorTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/const.js"
								);


eval(
									function(){
										// if 语句相关
~function(closeIfConditionTag, elseTag){

this.IfExpression = function(ConditionalExpression){
	/**
	 * if 表达式
	 * @param {Context} context - 表达式上下文
	 */
	function IfExpression(context){
		ConditionalExpression.call(this, context);
		
		this.ifContext = context;
	};
	IfExpression = new Rexjs(IfExpression, ConditionalExpression);
	
	IfExpression.props({
		body: null,
		elseBody: null,
		elseContext: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var elseContext = this.elseContext;
			
			// 追加 if 关键字
			contentBuilder.appendContext(this.ifContext);
			
			// 追加条件
			this.condition.extractTo(contentBuilder);
			// 追加主体语句
			this.ifBody.extractTo(contentBuilder);
			
			// 如果没有 else 关键字
			if(elseContext === null){
				return;
			}
			
			// 判断 if 主体表达式是否需要加分号
			if((this.ifBody.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			// 追加 else 关键字
			contentBuilder.appendContext(elseContext);
			// 追加空格
			contentBuilder.appendSpace();
			
			// 提取 else 主体内容
			this.elseBody.extractTo(contentBuilder);
		},
		ifBody: null,
		ifContext: null
	});
	
	return IfExpression;
}(
	this.ConditionalExpression
);

this.IfBodyStatement = function(SingleStatement){
	/**
	 * if 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IfBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	IfBodyStatement = new Rexjs(IfBodyStatement, SingleStatement);
	
	IfBodyStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			var expression = this.expression;

			// 跳出语句并设置 if 表达式的主体
			this.out().ifBody = expression;
			
			switch(false){
				// 如果不是 else
				case context.content === "else":
					break;

				// 如果表达式还没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					// 默认
					parser.error(context);
					break;

				default:
					// 返回 else 标签
					return this.bindingOf();
			}
		},
		flow: ECMAScriptStatement.FLOW_LINEAR
	});
	
	return IfBodyStatement;
}(
	this.SingleStatement
);

this.ElseBodyStatement = function(IfBodyStatement){
	/**
	 * else 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ElseBodyStatement(statements){
		IfBodyStatement.call(this, statements);
	};
	ElseBodyStatement = new Rexjs(ElseBodyStatement, IfBodyStatement);
	
	ElseBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 elseBody
			this.out().elseBody = this.expression;
		}
	});
	
	return ElseBodyStatement;
}(
	this.IfBodyStatement
);

this.IfTag = function(IfExpression){
	/**
	 * if 标签
	 */
	function IfTag(_type){
		SyntaxTag.call(this, _type);
	};
	IfTag = new Rexjs(IfTag, SyntaxTag);
	
	IfTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return elseTag;
		},
		regexp: /if/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.ifConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new IfExpression(context);
		}
	});
	
	return IfTag;
}(
	this.IfExpression
);

this.OpenIfConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * if 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenIfConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenIfConditionTag = new Rexjs(OpenIfConditionTag, OpenParenTag);
	
	OpenIfConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeIfConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 if 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenIfConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseIfConditionTag = function(CloseParenTag, IfBodyStatement, IfBodyStatements){
	/**
	 * if 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseIfConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseIfConditionTag = new Rexjs(CloseIfConditionTag, CloseParenTag);
	
	CloseIfConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 if 条件的 close
			statement.expression.condition.close = context;
			// 设置当前语句 及 表达式主体语句
			statements.statement = new IfBodyStatement(statements);
		}
	});
	
	return CloseIfConditionTag;
}(
	this.CloseParenTag,
	this.IfBodyStatement,
	this.IfBodyStatements
);

this.ElseTag = function(ElseExpression, ElseBodyStatement){
	/**
	 * else 标签
	 * @param {Number} _type - 标签类型
	 */
	function ElseTag(_type){
		SyntaxTag.call(this, _type);
	};
	ElseTag = new Rexjs(ElseTag, SyntaxTag);
	
	ElseTag.props({
		regexp: /else/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 else 关键字上下文
			statement.expression.elseContext = context;
			// 设置当前语句
			statements.statement = new ElseBodyStatement(statements);
		}
	});
	
	return ElseTag;
}(
	this.ElseExpression,
	this.ElseBodyStatement
);

closeIfConditionTag = new this.CloseIfConditionTag();
elseTag = new this.ElseTag();

}.call(
	this,
	// closeIfConditionTag
	null,
	// elseTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/if.js"
								);


eval(
									function(){
										// while 语句相关
~function(closeWhileConditionTag){

this.WhileExpression = function(ConditionalExpression){
	/**
	 * while 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function WhileExpression(context){
		ConditionalExpression.call(this, context);
	};
	WhileExpression = new Rexjs(WhileExpression, ConditionalExpression);
	
	WhileExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 提取 while 关键字
			contentBuilder.appendContext(this.context);
			
			// 提取 while 条件
			this.condition.extractTo(contentBuilder);
			// 提取 while 主体语句
			this.body.extractTo(contentBuilder);
		}
	});
	
	return WhileExpression;
}(
	this.ConditionalExpression
);

this.WhileBodyStatement = function(SingleStatement){
	/**
	 * while 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function WhileBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	WhileBodyStatement = new Rexjs(WhileBodyStatement, SingleStatement);
	
	WhileBodyStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return WhileBodyStatement;
}(
	this.SingleStatement
);

this.WhileTag = function(WhileExpression){
	/**
	 * while 标签
	 * @param {Number} _type - 标签类型
	 */
	function WhileTag(_type){
		SyntaxTag.call(this, _type);
	};
	WhileTag = new Rexjs(WhileTag, SyntaxTag);
	
	WhileTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /while/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.whileConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new WhileExpression(context);
		}
	});
	
	return WhileTag;
}(
	this.WhileExpression
);

this.OpenWhileConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenWhileConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenWhileConditionTag = new Rexjs(OpenWhileConditionTag, OpenParenTag);
	
	OpenWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeWhileConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenWhileConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseWhileConditionTag = function(CloseParenTag, WhileBodyStatement){
	/**
	 * while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseWhileConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseWhileConditionTag = new Rexjs(CloseWhileConditionTag, CloseParenTag);
	
	CloseWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.close = context;
			// 设置当前语句
			statements.statement = new WhileBodyStatement(statements);
		}
	});
	
	return CloseWhileConditionTag;
}(
	this.CloseParenTag,
	this.WhileBodyStatement
);

closeWhileConditionTag = new this.CloseWhileConditionTag();

}.call(
	this,
	// closeWhileConditionTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/while.js"
								);


eval(
									function(){
										// do while 语句相关
~function(doWhileTag, closeDoWhileConditionTag){
	
this.DoExpression = function(ConditionalExpression){
	/**
	 * do 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DoExpression(context){
		ConditionalExpression.call(this, context);
	};
	DoExpression = new Rexjs(DoExpression, ConditionalExpression);
	
	DoExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			var body = this.body;
			
			// 追加 do 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			
			// 提取主体
			body.extractTo(contentBuilder);
			
			// 判断 do while 主体表达式是否需要加分号
			if((body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			// 追加 while 关键字
			contentBuilder.appendContext(this.whileContext);
			// 提取 while 条件
			this.condition.extractTo(contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} state - 表达式状态
		 */
		set state(state){},
		whileContext: null
	});
	
	return DoExpression;
}(
	this.ConditionalExpression
);

this.DoStatement = function(SingleStatement){
	/**
	 * do 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DoStatement(statements){
		SingleStatement.call(this, statements);
	};
	DoStatement = new Rexjs(DoStatement, SingleStatement);
	
	DoStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			var expression = this.expression;
			
			switch(false){
				// 如果不是 while 关键字
				case context.content === "while":
					break;
				
				// 如果表达式没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					break;

				default:
					// 跳出语句并设置 body
					this.out().body = expression;
					// 返回 do while 标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return DoStatement;
}(
	this.SingleStatement
);

this.DoTag = function(DoExpression, DoStatement){
	/**
	 * do 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoTag(_type){
		SyntaxTag.call(this, _type);
	};
	DoTag = new Rexjs(DoTag, SyntaxTag);
	
	DoTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return doWhileTag;
		},
		regexp: /do/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new DoExpression(context);
			// 设置当前语句
			statements.statement = new DoStatement(statements);
		}
	});
	
	return DoTag;
}(
	this.DoExpression,
	this.DoStatement
);

this.DoWhileTag = function(WhileTag){
	/**
	 * do while 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoWhileTag(_type){
		WhileTag.call(this, _type);
	};
	DoWhileTag = new Rexjs(DoWhileTag, WhileTag);

	DoWhileTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.doWhileConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.whileContext = context;
		}
	});
	
	return DoWhileTag;
}(
	this.WhileTag
);

this.OpenDoWhileConditionTag = function(OpenWhileConditionTag, ConditionStatement){
	/**
	 * do while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDoWhileConditionTag(_type){
		OpenWhileConditionTag.call(this, _type);
	};
	OpenDoWhileConditionTag = new Rexjs(OpenDoWhileConditionTag, OpenWhileConditionTag);

	OpenDoWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDoWhileConditionTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 do while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenDoWhileConditionTag;
}(
	this.OpenWhileConditionTag,
	this.ConditionStatement
);

this.CloseDoWhileConditionTag = function(CloseWhileConditionTag){
	/**
	 * do while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDoWhileConditionTag(_type){
		CloseWhileConditionTag.call(this, _type);
	};
	CloseDoWhileConditionTag = new Rexjs(CloseDoWhileConditionTag, CloseWhileConditionTag);

	CloseDoWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		visitor: function(parser, context, statement){
			statement.expression.condition.close = context;
		}
	});
	
	return CloseDoWhileConditionTag;
}(
	this.CloseWhileConditionTag
);

doWhileTag = new this.DoWhileTag();
closeDoWhileConditionTag = new this.CloseDoWhileConditionTag();
	
}.call(
	this,
	// doWhileTag
	null,
	// closeDoWhileConditionTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/do-while.js"
								);


eval(
									function(){
										// for 语句相关
~function(){

this.ForExpression = function(ConditionalExpression, config, compileOf){
	/**
	 * for 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ForExpression(context){
		ConditionalExpression.call(this, context);
	};
	ForExpression = new Rexjs(ForExpression, ConditionalExpression);

	ForExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 添加 for 关键字
			contentBuilder.appendContext(this.context);

			// 如果是 of 标签而且需要编译 of
			if(this.iterator === "of" && config.value){
				// 编译 for of
				compileOf(
					this.condition,
					this.body,
					contentBuilder,
					new ContentBuilder(),
					this.variable
				);
				
				return;
			}

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		iterator: "",
		variable: ""
	});
	
	return ForExpression;
}(
	this.ConditionalExpression,
	// config
	ECMAScriptConfig.addBaseConfig("of"),
	// compileOf
	function(condition, body, contentBuilder, builder, variable){
		var inner = condition.inner;

		// 追加 for 循环条件起始小括号
		contentBuilder.appendContext(condition.open);
		// 追加 for 循环初始化语句
		contentBuilder.appendString(variable + "=new Rexjs.Generator(");

		// 追加生成器的对象
		inner.right.extractTo(contentBuilder);

		// 追加 for 循环的逻辑条件
		contentBuilder.appendString(");!" + variable + ".iterator.closed;");
		// 追加 for 循环条件结束小括号
		contentBuilder.appendContext(condition.close);
		// 追加语句块起始大括号，目的是让 let、const 发挥效果
		contentBuilder.appendString("{");

		// 将对象值的初始化表达式提取到新的内容生成器里，目的是防止文档位置（position）的错乱，导致 mappings 不可用 
		inner.left.extractTo(builder);

		// 追加对象值的初始化
		contentBuilder.appendString(
			builder.result + "=" + variable + ".next().value;"
		);

		// 提取主体
		body.extractTo(contentBuilder);
		// 追加语句块结束小括号
		contentBuilder.appendString("}");
	}
);

this.ForBodyStatement = function(SingleStatement){
	/**
	 * for 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	ForBodyStatement = new Rexjs(ForBodyStatement, SingleStatement);
	
	ForBodyStatement.props({
		flow: ECMAScriptStatement.FLOW_CIRCULAR,
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		}
	});
	
	return ForBodyStatement;
}(
	this.SingleStatement
);

this.ForTag = function(ForExpression){
	/**
	 * for 标签
	 */
	function ForTag(_type){
		SyntaxTag.call(this, _type);
	};
	ForTag = new Rexjs(ForTag, SyntaxTag);
	
	ForTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /for/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式为 for 表达式
			statement.expression = new ForExpression(context);
		}
	});
	
	return ForTag;
}(
	this.ForExpression
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/for.js"
								);


eval(
									function(){
										// for 循环迭代符表达式相关
~function(){

this.IterationStatement = function(BinaryStatement){
	/**
	 * 迭代语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IterationStatement(statements){
		BinaryStatement.call(this, statements);
	};
	IterationStatement = new Rexjs(IterationStatement, BinaryStatement);

	IterationStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出当前语句并设置 right
			this.out().right = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(){
			return null;
		}
	});

	return IterationStatement;
}(
	this.BinaryStatement
);

this.IteratorTag = function(BinaryKeywordTag, BinaryExpression, IterationStatement, visitor){
	/**
	 * for 循环迭代符标签
	 * @param {Number} _type - 标签类型
	 */
	function IteratorTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	IteratorTag = new Rexjs(IteratorTag, BinaryKeywordTag);

	IteratorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式的 iterator 属性
			statement.target.expression.iterator = context.content;
			// 设置当前表达式
			statement.expression = new BinaryExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new IterationStatement(statements);
		}
	});

	return IteratorTag;
}(
	this.BinaryKeywordTag,
	this.BinaryExpression,
	this.IterationStatement
);

this.ForInTag = function(IteratorTag){
	/**
	 * for in 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInTag(_type){
		IteratorTag.call(this, _type);
	};
	ForInTag = new Rexjs(ForInTag, IteratorTag);

	ForInTag.props({
		regexp: /in(?!stanceof)/
	});

	return ForInTag;
}(
	this.IteratorTag
);

this.ForOfTag = function(IteratorTag, config, visitor){
	/**
	 * for of 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForOfTag(_type){
		IteratorTag.call(this, _type);
	};
	ForOfTag = new Rexjs(ForOfTag, IteratorTag);

	ForOfTag.props({
		regexp: /of/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果需要编译 of
			if(config.value){
				// 生成并记录临时变量名
				statement.target.expression.variable = statements.collections.generate();
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ForOfTag;
}(
	this.IteratorTag,
	// config
	ECMAScriptConfig.of,
	this.IteratorTag.prototype.visitor
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/for-iterator.js"
								);


eval(
									function(){
										// for 循环条件表达式相关
~function(IdentifierExpression, VarExpression, CommaStatement, closeForConditionTag, forInitConditionItemSeparatorTag, forInTag, forOfTag, forInitConditionSeparatorTag, forLogicConditionSeparatorTag, getOpenConditionTag){

this.ForConditionInnerStatement = function(){
	/**
	 * for 循环条件内部语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForConditionInnerStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ForConditionInnerStatement = new Rexjs(ForConditionInnerStatement, ECMAScriptStatement);
	
	ForConditionInnerStatement.props({
		expression: new DefaultExpression()
	});

	return ForConditionInnerStatement;
}();

this.ForInitConditionStatement = function(ForConditionInnerStatement, hasError){
	/**
	 * for 循环初始化条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForInitConditionStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	ForInitConditionStatement = new Rexjs(ForInitConditionStatement, ForConditionInnerStatement);
	
	ForInitConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var tag, expression = this.expression, target = this.target;

			// 判断标签内容
			switch(context.content){
				// 如果是分号
				case ";":
					// 设置标签
					tag = getOpenConditionTag(this).forInitConditionSeparator;
					
					(
						// 设置目标语句的表达式
						this.target.expression = new ListExpression(null, ";")
					)
					// 添加表达式
					.add(
						expression
					);
					break;

				// 如果是 in
				case "in":
					tag = getOpenConditionTag(this).forIn;

				// 如果是 of
				case "of":
					// 如果验证出错
					if(hasError(parser, expression, context)){
						return;
					}

					// 设置标签
					tag = tag || getOpenConditionTag(this).forOf;
					// 设置目标语句的表达式
					this.target.expression = expression;
					break;

				default:
					// 报错
					parser.error(context);
					return;
			}

			// 跳出当前语句
			this.out();
			// 返回标签
			return tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 判断标签内容
			switch(context.content){
				// 如果是 in 关键字
				case "in":
					break;

				// 如果是逗号
				case ",":
					return getOpenConditionTag(this).forInitConditionItemSeparator;

				// 默认
				default:
					return null;
			}

			var expression = this.expression;

			// 如果验证出错
			if(hasError(parser, expression, context)){
				return null;
			}

			// 设置目标语句的表达式
			this.target.expression = expression;

			// 跳出当前语句
			this.out();
			return getOpenConditionTag(this).forIn;
		}
	});
	
	return ForInitConditionStatement;
}(
	this.ForConditionInnerStatement,
	// hasError
	function(parser, expression, context){
		// 如果是声明表达式
		if(expression instanceof VarExpression){
			var list = expression.list;

			// 如果声明列表长度等于 1
			if(list.length === 1){
				// 设置表达式为列表的第一项
				expression = list[0];
			}
			else {
				// 返回错误信息
				parser.error(context, ECMAScriptErrors.FOR_IN);
				return true;
			}
		}

		// 如果是标识符表达式
		if(expression instanceof IdentifierExpression){
			return false;
		}

		// 返回错误信息
		parser.error(context, ECMAScriptErrors.FOR);
		return true;
	}
);

this.ForLogicConditionStatement = function(ForConditionInnerStatement){
	/**
	 * for 循环的逻辑判断条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForLogicConditionStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	ForLogicConditionStatement = new Rexjs(ForLogicConditionStatement, ForConditionInnerStatement);
	
	ForLogicConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是分号
			if(context.content !== ";"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return getOpenConditionTag(this).forLogicConditionSeparator;
		}
	});
	
	return ForLogicConditionStatement;
}(
	this.ForConditionInnerStatement
);

this.ForFinallyConditionStatement = function(ForConditionInnerStatement){
	/**
	 * for 循环的末条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForFinallyConditionStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	ForFinallyConditionStatement = new Rexjs(ForFinallyConditionStatement, ForConditionInnerStatement);
	
	ForFinallyConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		}
	});
	
	return ForFinallyConditionStatement;
}(
	this.ForConditionInnerStatement
);

this.ForInitConditionSeparatorStatement = function(tryMethod){
	/**
	 * for 循环初始化条件分隔符语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForInitConditionSeparatorStatement(statements){
		CommaStatement.call(this, statements);
	};
	ForInitConditionSeparatorStatement = new Rexjs(ForInitConditionSeparatorStatement, CommaStatement);

	ForInitConditionSeparatorStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是 in 关键字
			if(context.content === "in"){
				// 跳出当前语句并添加表达式
				this.out().add(this.expression);
				return null;
			}

			// 返回父类方法处理的结果
			return tryMethod.call(this, parser, context);
		}
	});

	return ForInitConditionSeparatorStatement;
}(
	CommaStatement.prototype.try
);

this.OpenForConditionTag = function(OpenParenTag, ConditionStatement, ForInitConditionStatement){
	/**
	 * for 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenForConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenForConditionTag = new Rexjs(OpenForConditionTag, OpenParenTag);
	
	OpenForConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeForConditionTag;
		},
		/**
		 * 获取绑定的 forInTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forIn(){
			return forInTag;
		},
		/**
		 * 获取绑定的 forInitConditionItemSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forInitConditionItemSeparator(){
			return forInitConditionItemSeparatorTag;
		},
		/**
		 * 获取绑定的 forInitConditionSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forInitConditionSeparator(){
			return forInitConditionSeparatorTag;
		},
		/**
		 * 获取绑定的 forLogicConditionSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forLogicConditionSeparator(){
			return forLogicConditionSeparatorTag;
		},
		/**
		 * 获取绑定的 forOfTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forOf(){
			return forOfTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
			// 再次设置当前语句，目的是 target 要指向 ConditionStatement
			statements.statement = new ForInitConditionStatement(statements);
		}
	});
	
	return OpenForConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement,
	this.ForInitConditionStatement
);

this.ForInitConditionItemSeparatorTag = function(CommaTag, CommaExpression, ForInitConditionSeparatorStatement, visitor){
	/**
	 * for 循环初始化条件项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInitConditionItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ForInitConditionItemSeparatorTag = new Rexjs(ForInitConditionItemSeparatorTag, CommaTag);

	ForInitConditionItemSeparatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CommaExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new ForInitConditionSeparatorStatement(statements);
		}
	});

	return ForInitConditionItemSeparatorTag;
}(
	this.CommaTag,
	this.CommaExpression,
	this.ForInitConditionSeparatorStatement
);

this.ForConditionSeparatorTag = function(SemicolonTag){
	/**
	 * for 循环条件分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ForConditionSeparatorTag(_type){
		SemicolonTag.call(this, _type);
	};
	ForConditionSeparatorTag = new Rexjs(ForConditionSeparatorTag, SemicolonTag);

	ForConditionSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		}
	});

	return ForConditionSeparatorTag;
}(
	this.SemicolonTag
);

this.ForInitConditionSeparatorTag = function(ForConditionSeparatorTag, ForLogicConditionStatement){
	/**
	 * for 循环条件中初始化语句的分隔符标签，即 for 循环条件的第一个分号标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInitConditionSeparatorTag(_type){
		ForConditionSeparatorTag.call(this, _type)
	};
	ForInitConditionSeparatorTag = new Rexjs(ForInitConditionSeparatorTag, ForConditionSeparatorTag);

	ForInitConditionSeparatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ForLogicConditionStatement(statements);
		}
	});

	return ForInitConditionSeparatorTag;
}(
	this.ForConditionSeparatorTag,
	this.ForLogicConditionStatement
);

this.ForLogicConditionSeparatorTag = function(ForConditionSeparatorTag, ForFinallyConditionStatement){
	/**
	 * for 循环条件中逻辑语句的分号标签，即 for 循环条件的第二个分号标签
	 * @param {Number} _type - 标签类型
	 */
	function ForLogicConditionSeparatorTag(_type){
		ForConditionSeparatorTag.call(this, _type)
	};
	ForLogicConditionSeparatorTag = new Rexjs(ForLogicConditionSeparatorTag, ForConditionSeparatorTag);

	ForLogicConditionSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ForFinallyConditionStatement(statements);
		}
	});

	return ForLogicConditionSeparatorTag;
}(
	this.ForConditionSeparatorTag,
	this.ForFinallyConditionStatement
);

this.CloseForConditionTag = function(CloseParenTag, ForBodyStatement){
	/**
	 * for 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseForConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseForConditionTag = new Rexjs(CloseForConditionTag, CloseParenTag);
	
	CloseForConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式条件的 close
			statement.expression.condition.close = context;
			// 设置当前语句
			statements.statement = new ForBodyStatement(statements);
		}
	});
	
	return CloseForConditionTag;
}(
	this.CloseParenTag,
	this.ForBodyStatement
);

closeForConditionTag = new this.CloseForConditionTag();
forInTag = new this.ForInTag();
forOfTag = new this.ForOfTag();
forInitConditionItemSeparatorTag = new this.ForInitConditionItemSeparatorTag();
forInitConditionSeparatorTag = new this.ForInitConditionSeparatorTag();
forLogicConditionSeparatorTag = new this.ForLogicConditionSeparatorTag();

}.call(
	this,
	this.IdentifierExpression,
	this.VarExpression,
	this.CommaStatement,
	// closeForConditionTag
	null,
	// forInitConditionItemSeparatorTag
	null,
	// forInTag
	null,
	// forOfTag
	null,
	// forInitConditionSeparatorTag
	null,
	// forLogicConditionSeparatorTag
	null,
	// getOpenConditionTag
	function(statement){
		return statement.target.target.expression.condition.open.tag;
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/for-condition.js"
								);


eval(
									function(){
										~function(UnaryExpression, CallExpression, FunctionConvertorExpression, config){

this.TryFunctionExpression = function(extractTo){
	/**
	 * 尝试执行函数表达式
	 * @param {Context} context - 标签上下文
	 */
	function TryFunctionExpression(context){
		UnaryExpression.call(this, context);
	};
	TryFunctionExpression = new Rexjs(TryFunctionExpression, UnaryExpression);

	TryFunctionExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.value){
				// 直接提取操作对象
				this.operand.extractTo(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return TryFunctionExpression;
}(
	UnaryExpression.prototype.extractTo
);

this.FunctionConvertorExpression = FunctionConvertorExpression = function(AccessorExpression, extractAccessor){
	/**
	 * 函数转换器表达式
	 * @param {Expression} func - 标签上下文
	 */
	function FunctionConvertorExpression(func){
		Expression.call(this, func.context);

		this.function = func;
	};
	FunctionConvertorExpression = new Rexjs(FunctionConvertorExpression, Expression);

	FunctionConvertorExpression.props({
		called: true,
		function: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var func = this.function;

			// 如果需要编译
			if(config.value){
				// 追加转换方法
				contentBuilder.appendString("(Rexjs.Function.convert(");

				// 如果函数是访问器形式的
				if(func instanceof AccessorExpression){
					// 以访问器形式提取
					extractAccessor(contentBuilder, func, func.property);
				}
				else {
					// 直接提取
					func.extractTo(contentBuilder);
				}

				// 追加转换方法的结束小括号
				contentBuilder.appendString(
					// 如果没有带执行方法的小括号，则加上
					"))" + (this.called ? "" : "()")
				);

				return;
			}

			// 直接提取
			func.extractTo(contentBuilder);
		}
	});

	return FunctionConvertorExpression;
}(
	this.AccessorExpression,
	// extractAccessor
	function(contentBuilder, func, property){
		// 先提取函数所属对象
		func.object.extractTo(contentBuilder);

		// 追加 convert 方法的参数分隔符
		contentBuilder.appendString(",");

		// 如果是匹配组表达式，则说明是中括号（window["a"]）形式的访问器
		if(property instanceof PartnerExpression){
			// 将起始中括号改成小括号
			contentBuilder.appendString("(");
			// 提取括号内部表达式
			property.inner.extractTo(contentBuilder);
			// 将结束中括号改成小括号
			contentBuilder.appendString(")");
			return;
		}

		// 将标识符用双引号包括起来
		contentBuilder.appendString('"');
		// 提取标识符
		contentBuilder.appendContext(property);
		// 将标识符用双引号包括起来
		contentBuilder.appendString('"');
	}
);

this.TryFunctionStatement = function(UnaryStatement, setOperand){
	/**
	 * 一元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TryFunctionStatement(statements){
		UnaryStatement.call(this, statements);
	};
	TryFunctionStatement = new Rexjs(TryFunctionStatement, UnaryStatement);
	
	TryFunctionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			// 设置 operand
			setOperand(this, this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression;

			// 如果一元标签验证该标签为表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context, expression)){
				// 设置 operand
				setOperand(this, expression);
			}
		}
	});
	
	return TryFunctionStatement;
}(
	this.UnaryStatement,
	// setOperand
	function(statement, expression){
		// 如果是函数调用表达式
		if(expression instanceof CallExpression){
			// 将函数调用表达式的操作对象设置为 函数转换器表达式
			expression.operand = new FunctionConvertorExpression(expression.operand);
		}
		else {
			// 直接设置表达式为 函数转换器表达式
			expression = new FunctionConvertorExpression(expression);
			// 并告知函数转换器表达式，并没有被手动调用
			expression.called = false;
		}

		// 设置操作对象
		statement.out().operand = expression;
	}
);

this.TryFunctionTag = function(ExecTag, TryFunctionExpression, TryFunctionStatement){
	/**
	 * 尝试执行函数的 try 标签
	 * @param {Number} _type - 标签类型
	 */
	function TryFunctionTag(_type){
		ExecTag.call(this, _type);
	};
	TryFunctionTag = new Rexjs(TryFunctionTag, ExecTag);

	TryFunctionTag.props({
		regexp: /try/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TryFunctionExpression(context);
			// 设置当前语句
			statements.statement = new TryFunctionStatement(statements);
		}
	});

	return TryFunctionTag;
}(
	this.ExecTag,
	this.TryFunctionExpression,
	this.TryFunctionStatement
);

}.call(
	this,
	this.UnaryExpression,
	this.CallExpression,
	// FunctionConvertorExpression
	null,
	// config
	ECMAScriptConfig.addRexjsConfig("tryFunction")
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/try-function.js"
								);


eval(
									function(){
										// try catch 语句相关
~function(TryFunctionExpression, TryFunctionStatement, tryFunctionTag, catchTag, finallyTag){
	
this.TryExpression = function(){
	/**
	 * try 表达式
	 * @param {Context} context - 标签上下文
	 */
	function TryExpression(context){
		Expression.call(this, context);
	};
	TryExpression = new Rexjs(TryExpression, Expression);
	
	TryExpression.props({
		catchBlock: null,
		catchContext: null,
		exception: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var exception = this.exception, finallyContext = this.finallyContext;
			
			// 追加 try 关键字
			contentBuilder.appendContext(this.tryContext);
			// 提取 try 语句块
			this.tryBlock.extractTo(contentBuilder);
			
			// 如果异常存在，说明存在 catch 语句
			if(exception){
				// 追加 catch 关键字
				contentBuilder.appendContext(this.catchContext);
				// 提取异常内容
				exception.extractTo(contentBuilder);
				// 提取 try 语句块
				this.catchBlock.extractTo(contentBuilder);
			}
			
			// 如果 finally 关键字存在
			if(finallyContext){
				// 追加 finally 关键字
				contentBuilder.appendContext(finallyContext);
				// 提取 finally 语句块
				this.finallyBlock.extractTo(contentBuilder);
			}
		},
		finallyBlock: null,
		finallyContext: null,
		tryBlock: null,
		/**
		 * 获取 try 关键字上下文
		 */
		get tryContext(){
			return this.context;
		}
	});
	
	return TryExpression;
}();

this.TryStatement = function(toUnary){
	/**
	 * try 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TryStatement = new Rexjs(TryStatement, ECMAScriptStatement);
	
	TryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression;

			// 如果是默认表达式，即 try 关键字后面跟的不是起始大括号 "{"，因为起始大括号会给该语句重新设置表达式为 BlockExpression
			if(expression.default){
				return toUnary(parser, this, expression, context);
			}

			// 跳出语句并设置 tryBlock 属性
			this.out().tryBlock = expression;
			
			switch(context.content){
				// 如果是 catch
				case "catch" :
					return this.tagOf().catch;
				
				// 如果是 finally
				case "finally" :
					return this.tagOf().finally;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.TRY);
		},
		expression: new DefaultExpression()
	});
	
	return TryStatement;
}(
	// toUnary
	function(parser, statement, expression, context){
		var tag = context.tag;

		// 如果匹配到的标签是可误解的
		if(tag.type.mistakable){
			var statements = statement.statements, targetContext = statement.out().context;

			// 重置标签
			targetContext.tag = tryFunctionTag;
			// 重置目标语句的表达式
			statement.target.expression = new TryFunctionExpression(targetContext);
			// 设置当前语句为
			statements.statement = new TryFunctionStatement(statements);

			return tag;
		}

		// 报错
		parser.error(context);
	}
);

this.CatchStatement = function(){
	/**
	 * catch 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CatchStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CatchStatement = new Rexjs(CatchStatement, ECMAScriptStatement);
	
	CatchStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 catchBlock 属性
			this.out().catchBlock = this.expression;
			// 如果是 finally，则返回 finallyTag
			return context.content === "finally" ? this.tagOf().finally : null;
		}
	});
	
	return CatchStatement;
}();

this.FinallyStatement = function(){
	/**
	 * finally 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FinallyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	FinallyStatement = new Rexjs(FinallyStatement, ECMAScriptStatement);
	
	FinallyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 finallyBlock
			this.out().finallyBlock = this.expression;
		}
	});
	
	return FinallyStatement;
}();

this.TryTag = function(TryExpression, TryStatement){
	/**
	 * try 标签
	 * @param {Number} _type - 标签类型
	 */
	function TryTag(_type){
		SyntaxTag.call(this, _type);
	};
	TryTag = new Rexjs(TryTag, SyntaxTag);
	
	TryTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return this.catch;
		},
		/**
		 * 获取绑定的 catchTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get catch(){
			return catchTag;
		},
		/**
		 * 获取绑定的 finallyTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get finally(){
			return finallyTag;
		},
		regexp: /try/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.tryContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TryExpression(context);
			// 设置当前语句
			statements.statement = new TryStatement(statements);
		}
	});
	
	return TryTag;
}(
	this.TryExpression,
	this.TryStatement
);

this.CatchTag = function(CatchStatement){
	/**
	 * catch 标签
	 * @param {Number} _type - 标签类型
	 */
	function CatchTag(_type){
		SyntaxTag.call(this, _type);
	};
	CatchTag = new Rexjs(CatchTag, SyntaxTag);
	
	CatchTag.props({
		regexp: /catch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.catchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 catch 关键字上下文
			statement.expression.catchContext = context;
			// 设置当前语句
			statements.statement = new CatchStatement(statements);
		}
	});
	
	return CatchTag;
}(
	this.CatchStatement
);

this.OpenCatchedExceptionTag = function(OpenParenTag){
	/**
	 * try catch 异常起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCatchedExceptionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCatchedExceptionTag = new Rexjs(OpenCatchedExceptionTag, OpenParenTag);
	
	OpenCatchedExceptionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.exceptionVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 try catch 表达式的异常信息
			statement.target.expression.exception = new PartnerExpression(context);
		}
	});
	
	return OpenCatchedExceptionTag;
}(
	this.OpenParenTag
);

this.ExceptionVariableTag = function(VariableTag){
	/**
	 * 异常变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ExceptionVariableTag(_type){
		VariableTag.call(this, _type);
	};
	ExceptionVariableTag = new Rexjs(ExceptionVariableTag, VariableTag);
	
	ExceptionVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closeCatchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			statement.target.expression.exception.inner = new Expression(context);
		}
	});
	
	return ExceptionVariableTag;
}(
	this.VariableTag
);

this.CloseCatchedExceptionTag = function(CloseParenTag){
	/**
	 * try catch 异常结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCatchedExceptionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCatchedExceptionTag = new Rexjs(CloseCatchedExceptionTag, CloseParenTag);
	
	CloseCatchedExceptionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.target.expression.exception.close = context;
		}
	});
	
	return CloseCatchedExceptionTag;
}(
	this.CloseParenTag
);

this.FinallyTag = function(FinallyStatement){
	/**
	 * finally 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function FinallyTag(_type){
		SyntaxTag.call(this, _type);
	};
	FinallyTag = new Rexjs(FinallyTag, SyntaxTag);
	
	FinallyTag.props({
		regexp: /finally/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 finally 关键字上下文
			statement.expression.finallyContext = context;
			// 设置当前语句
			statements.statement = new FinallyStatement(statements);
		}
	});
	
	return FinallyTag;
}(
	this.FinallyStatement
);

catchTag = new this.CatchTag();
finallyTag = new this.FinallyTag();

}.call(
	this,
	this.TryFunctionExpression,
	this.TryFunctionStatement,
	// tryFunctionTag
	new this.TryFunctionTag(),
	// catchTag
	null,
	// finallyTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/try-catch.js"
								);


eval(
									function(){
										// switch 语句相关
~function(closeSwitchConditionTag){

this.SwitchVariableCollections = function(ECMAScriptVariableCollections){
	/**
	 * 变量名收集器集合
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
	 */
	function SwitchVariableCollections(prevCollections){
		ECMAScriptVariableCollections.call(this, prevCollections.index, prevCollections);
	};
	SwitchVariableCollections = new Rexjs(SwitchVariableCollections, ECMAScriptVariableCollections);

	SwitchVariableCollections.props({
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(prevCollections){
			this.rex = prevCollections.rex;
		}
	});

	return SwitchVariableCollections;
}(
	this.ECMAScriptVariableCollections
);

this.SwitchExpression = function(ConditionalExpression){
	/**
	 * switch 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SwitchExpression(context){
		ConditionalExpression.call(this, context);
	};
	SwitchExpression = new Rexjs(SwitchExpression, ConditionalExpression);

	SwitchExpression.props({
		/**
		 * 获取表达式主体语句块
		 */
		get block(){
			return this.body;
		},
		/**
		 * 设置表达式主体语句块
		 * @param {BlockExpression} value - 需要设置的表达式主体语句块
		 */
		set block(value){
			this.body = value;
		},
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 switch 关键字
			contentBuilder.appendContext(this.context);

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		hasDefault: false,
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} value - 状态
		 */
		set state(value){}
	});

	return SwitchExpression;
}(
	this.ConditionalExpression
);

this.SwitchBodyStatement = function(BlockBodyStatement){
	/**
	 * switch 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SwitchBodyStatement(statements){
		BlockBodyStatement.call(this, statements);
	};
	SwitchBodyStatement = new Rexjs(SwitchBodyStatement, BlockBodyStatement);

	SwitchBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.open.tag;
		}
	});

	return SwitchBodyStatement;
}(
	this.BlockBodyStatement
);

this.SwitchBodyStatements = function(BlockBodyStatements, SwitchBodyStatement, SwitchVariableCollections){
	/**
	 * switch 主体语句块
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考的上一个变量名收集器集合
	 */
	function SwitchBodyStatements(prevCollections){
		BlockBodyStatements.call(
			this,
			new SwitchVariableCollections(prevCollections)
		);
	};
	SwitchBodyStatements = new Rexjs(SwitchBodyStatements, BlockBodyStatements);

	SwitchBodyStatements.props({
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(){},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new SwitchBodyStatement(this);
		}
	});

	return SwitchBodyStatements;
}(
	this.BlockBodyStatements,
	this.SwitchBodyStatement,
	this.SwitchVariableCollections
);

this.SwitchTag = function(SwitchExpression){
	/**
	 * switch 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SwitchTag(_type){
		SyntaxTag.call(this, _type);
	};
	SwitchTag = new Rexjs(SwitchTag, SyntaxTag);
	
	SwitchTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /switch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			statement.expression = new SwitchExpression(context);
		}
	});
	
	return SwitchTag;
}(
	this.SwitchExpression
);

this.OpenSwitchConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * switch 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSwitchConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenSwitchConditionTag = new Rexjs(OpenSwitchConditionTag, OpenParenTag);
	
	OpenSwitchConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSwitchConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置条件表达式
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenSwitchConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseSwitchConditionTag = function(CloseParenTag){
	/**
	 * switch 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseSwitchConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseSwitchConditionTag = new Rexjs(CloseSwitchConditionTag, CloseParenTag);
	
	CloseSwitchConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchBlockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.close = context;
		}
	});
	
	return CloseSwitchConditionTag;
}(
	this.CloseParenTag
);

this.OpenSwitchBodyTag = function(OpenBlockComponentTag, SwitchBodyStatements){
	/**
	 * switch 主体起始标签
	 */
	function OpenSwitchBodyTag(_type){
		OpenBlockComponentTag.call(this, _type);
	};
	OpenSwitchBodyTag = new Rexjs(OpenSwitchBodyTag, OpenBlockComponentTag);
	
	OpenSwitchBodyTag.props({
		/**
		 * 进入语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			(
				parser.statements = new SwitchBodyStatements(statements.collections)
			)
			// 记录当前语句块
			.target = statements;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openSwitchBodyContextTags;
		}
	});
	
	return OpenSwitchBodyTag;
}(
	this.OpenBlockComponentTag,
	this.SwitchBodyStatements
);

closeSwitchConditionTag = new this.CloseSwitchConditionTag();

}.call(
	this,
	// closeSwitchConditionTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/switch.js"
								);


eval(
									function(){
										// case 表达式相关
~function(caseTag, defaultTag, caseValueSeparatorTag){

this.CaseExpression = function(){
	/**
	 * case 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function CaseExpression(context){
		Expression.call(this, context);
	};
	CaseExpression = new Rexjs(CaseExpression, Expression);

	CaseExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 case 关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();
			// 提取 value
			this.value.extractTo(contentBuilder);
			// 添加冒号
			contentBuilder.appendContext(this.separator);
			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		separator: null,
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} value - 状态
		 */
		set state(value){},
		statements: null,
		value: null
	});

	return CaseExpression;
}();

this.DefaultExpression = function(CaseExpression){
	/**
	 * switch default 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultExpression(context){
		CaseExpression.call(this, context);
	};
	DefaultExpression = new Rexjs(DefaultExpression, CaseExpression);

	DefaultExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 case 关键字
			contentBuilder.appendContext(this.context);
			// 添加冒号
			contentBuilder.appendContext(this.separator);

			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		value: null
	});

	return DefaultExpression;
}(
	this.CaseExpression
);

this.CaseValueStatement = function(){
	/**
	 * case 值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CaseValueStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CaseValueStatement = new Rexjs(CaseValueStatement, ECMAScriptStatement);
	
	CaseValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是冒号
			if(context.content !== ":"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 value
			this.out().value = this.expression;
			return this.bindingOf();
		}
	});
	
	return CaseValueStatement;
}();

this.DefaultValueStatement = function(CaseValueStatement){
	/**
	 * default 值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DefaultValueStatement(statements){
		CaseValueStatement.call(this, statements);
	};
	DefaultValueStatement = new Rexjs(DefaultValueStatement, CaseValueStatement);

	DefaultValueStatement.props({
		expression: new DefaultExpression()
	});
	
	return DefaultValueStatement;
}(
	this.CaseValueStatement
);

this.CaseBodyStatement = function(BlockBodyStatement, isCase, isCloseBrace){
	/**
	 * case 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CaseBodyStatement(statements){
		BlockBodyStatement.call(this, statements);
	};
	CaseBodyStatement = new Rexjs(CaseBodyStatement, BlockBodyStatement);
	
	CaseBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			switch(context.content){
				// 如果是 case 关键字
				case "case":
					return isCase(parser, this, context).case;

				// 如果是 default 关键字
				case "default":
					return isCase(parser, this, context).default;

				// 如果是结束大括号
				case "}":
					isCloseBrace(parser, this.statements);
					return null;

				default:
					return null;
			}
		},
		flow: ECMAScriptStatement.FLOW_LINEAR
	});
	
	return CaseBodyStatement;
}(
	this.BlockBodyStatement,
	// isCase
	function(parser, statement, context){
		var statements = statement.statements, targetStatements = statements.target,
		
			caseExpression = targetStatements.statement.expression;

		// 如果语句可以结束
		if((statement.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
			// 设置 case 表达式的 statements
			caseExpression.statements = statements;
			// 恢复语句块
			parser.statements = targetStatements;
			// 创建新语句
			targetStatements.newStatement();
		}
		else {
			parser.error(context);
		}

		// 返回 case 标签
		return caseExpression.context.tag;
	},
	// isCloseBrace
	function(parser, statements){
		(
			// 恢复语句块
			parser.statements = statements.target
		)
		.statement
		.expression
		.statements = statements;
	}
);

this.CaseBodyStatements = function(SwitchBodyStatements, CaseBodyStatement){
	/**
	 * case 语句块
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考的上一个变量名收集器
	 */
	function CaseBodyStatements(prevCollections){
		SwitchBodyStatements.call(this, prevCollections);
	};
	CaseBodyStatements = new Rexjs(CaseBodyStatements, SwitchBodyStatements);

	CaseBodyStatements.props({
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new CaseBodyStatement(this);
		}
	});

	return CaseBodyStatements;
}(
	this.SwitchBodyStatements,
	this.CaseBodyStatement
);

this.CaseTag = function(CaseExpression, CaseValueStatement){
	/**
	 * case 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function CaseTag(_type){
		SyntaxTag.call(this, _type);
	};
	CaseTag = new Rexjs(CaseTag, SyntaxTag);

	CaseTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return caseValueSeparatorTag;
		},
		/**
		 * 获取当前标签标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get case(){
			return caseTag;
		},
		/**
		 * 获取绑定的 defaultTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get default(){
			return defaultTag;
		},
		regexp: /case/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CaseExpression(context);
			// 设置当前语句
			statements.statement = new CaseValueStatement(statements);
		}
	});

	return CaseTag;
}(
	this.CaseExpression,
	this.CaseValueStatement
);

this.DefaultTag = function(CaseTag, DefaultExpression, DefaultValueStatement){
	/**
	 * switch 语句中的 default 标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultTag(_type){
		CaseTag.call(this, _type);
	};
	DefaultTag = new Rexjs(DefaultTag, CaseTag);

	DefaultTag.props({
		regexp: /default/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var switchExpression = statements.target.statement.expression;

			// 如果已经存在 default 表达式
			if(switchExpression.hasDefault){
				// 报错
				parser.error(context, ECMAScriptErrors.DEFAULT_CLAUSE);
				return;
			}

			// 设置当前表达式
			statement.expression = new DefaultExpression(context);
			// 设置当前语句
			statements.statement = new DefaultValueStatement(statements);
			// 设置 hasDefault
			switchExpression.hasDefault = true;
		}
	});

	return DefaultTag;
}(
	this.CaseTag,
	this.DefaultExpression,
	this.DefaultValueStatement
);

this.CaseValueSeparatorTag = function(ColonTag, CaseBodyStatements){
	/**
	 * case 值的分隔符标签，即 case 对应的冒号
	 * @param {Number} _type - 标签类型
	 */
	function CaseValueSeparatorTag(_type){
		ColonTag.call(this, _type);
	};
	CaseValueSeparatorTag = new Rexjs(CaseValueSeparatorTag, ColonTag);

	CaseValueSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 separator
			statement.expression.separator = context;

			// 设置当前语句块
			(
				parser.statements = new CaseBodyStatements(statements.collections)
			)
			// 设置 target
			.target = statements;
		}
	});

	return CaseValueSeparatorTag;
}(
	this.ColonTag,
	this.CaseBodyStatements
);

caseTag = new this.CaseTag();
defaultTag = new this.DefaultTag();
caseValueSeparatorTag = new this.CaseValueSeparatorTag();

}.call(
	this,
	// caseTag
	null,
	// defaultTag
	null,
	// caseValueSeparatorTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/case.js"
								);


eval(
									function(){
										// 模板相关
~function(closeTemplateTag){

this.TemplateExpression = function(config, extractTo, compileItem){
	/**
	 * 模板表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function TemplateExpression(open){
		PartnerExpression.call(this, open);
	};
	TemplateExpression = new Rexjs(TemplateExpression, PartnerExpression);

	TemplateExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.value){
				// 追加起始双引号
				contentBuilder.appendString('"');
				// 直接编译 inner
				this.inner.forEach(compileItem, contentBuilder);
				// 追加结束双引号
				contentBuilder.appendString('"');
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return TemplateExpression;
}(
	// config
	ECMAScriptConfig.addBaseConfig("template"),
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder){
		item.compileTo(contentBuilder);
	}
);

this.TemplateStatement = function(){
	/**
	 * 模板语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TemplateStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.expression = new ListExpression(null, "");
	};
	TemplateStatement = new Rexjs(TemplateStatement, ECMAScriptStatement);

	TemplateStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			parser.error(context, ECMAScriptErrors.TEMPLATE);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是反引号
			if(context.content !== "`"){
				return null;
			}

			// 跳出语句并设置模板表达式的 inner
			this.out().inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		}
	});

	return TemplateStatement;
}();

this.OpenTemplateTag = function(TemplateExpression, TemplateStatement){
	/**
	 * 起始模板标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenTemplateTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenTemplateTag = new Rexjs(OpenTemplateTag, SyntaxTag);

	OpenTemplateTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeTemplateTag;
		},
		regexp: /`/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.templateContentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TemplateExpression(context);
			// 设置当前语句
			statements.statement = new TemplateStatement(statements);
		}
	});

	return OpenTemplateTag;
}(
	this.TemplateExpression,
	this.TemplateStatement
);

this.CloseTemplateTag = function(){
	/**
	 * 结束模板标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseTemplateTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseTemplateTag = new Rexjs(CloseTemplateTag, SyntaxTag);

	CloseTemplateTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		$type: TYPE_MISTAKABLE,
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /`/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.close = context;
		}
	});

	return CloseTemplateTag;
}();

closeTemplateTag = new this.CloseTemplateTag();

}.call(
	this,
	// closeTemplateTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/template.js"
								);


eval(
									function(){
										// 模板内容标签相关
~function(LineTerminatorTag, getUnicode){

this.TemplateUnicodeExpression = function(){
	/**
	 * 模板 Unicode 字符编码表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {String} unicode - 标签文本内容的 unicode 字符编码
	 */
	function TemplateUnicodeExpression(context, unicode){
		Expression.call(this, context);

		this.unicode = unicode;
	};
	TemplateUnicodeExpression = new Rexjs(TemplateUnicodeExpression, Expression);

	TemplateUnicodeExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			contentBuilder.appendString("\\u" + this.unicode);
		},
		unicode: "0000"
	});

	return TemplateUnicodeExpression;
}();

this.TemplateContentTag = function(){
	/**
	 * 模板内容标签
	 * @param {Number} _type - 标签类型
	 */
	function TemplateContentTag(_type){
		SyntaxTag.call(this, _type);
	};
	TemplateContentTag = new Rexjs(TemplateContentTag, SyntaxTag);

	TemplateContentTag.props({
		order: ECMAScriptOrders.TEMPLATE_CONTENT,
		regexp: /(?:\\[\s\S]|[^`])+?(?=\$\{|[`"\r\n\u2028\u2029])/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化模板字符串表达式
				new Expression(context)
			);
		}
	});

	return TemplateContentTag;
}();

this.TemplateLineTerminatorTag = function(TemplateUnicodeExpression, RegExp, visitor){
	/**
	 * 模板换行符标签
	 * @param {String} char - 指定的换行符
	 * @param {Number} _type - 标签类型
	 */
	function TemplateLineTerminatorTag(char, _type){
		LineTerminatorTag.call(this, _type);

		this.regexp = new RegExp(char);
		this.unicode = getUnicode(char);
	};
	TemplateLineTerminatorTag = new Rexjs(TemplateLineTerminatorTag, LineTerminatorTag);

	TemplateLineTerminatorTag.props({
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化 unicode 字符表达式
				new TemplateUnicodeExpression(context, this.unicode)
			);

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		},
		unicode: "0000"
	});

	return TemplateLineTerminatorTag;
}(
	this.TemplateUnicodeExpression,
	RegExp,
	LineTerminatorTag.prototype.visitor
);

this.TemplateQouteTag = function(TemplateUnicodeExpression, UNICODE){
	/**
	 * 模板双引号标签
	 * @param {Number} _type - 标签类型
	 */
	function TemplateQouteTag(_type){
		SyntaxTag.call(this, _type);
	};
	TemplateQouteTag = new Rexjs(TemplateQouteTag, SyntaxTag);

	TemplateQouteTag.props({
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /"/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化 unicode 字符表达式
				new TemplateUnicodeExpression(context, UNICODE)
			);
		}
	});

	return TemplateQouteTag;
}(
	this.TemplateUnicodeExpression,
	// UNICODE
	getUnicode('"')
);

}.call(
	this,
	Rexjs.LineTerminatorTag,
	// getUnicode
	function(char){
		var unicode = char.charCodeAt(0).toString(16);

		// 根据长度来生成前面的 0
		for(var i = unicode.length;i < 4;i++){
			unicode = "0" + unicode;
		}

		return unicode;
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/template-content.js"
								);


eval(
									function(){
										// 模板占位符（模板参数）标签相关
~function(closePlaceHolderTag){

this.PlaceHolderExpression = function(){
	/**
	 * 模板占位符（模板参数）表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function PlaceHolderExpression(open){
		PartnerExpression.call(this, open);
	};
	PlaceHolderExpression = new Rexjs(PlaceHolderExpression, PartnerExpression);

	PlaceHolderExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			/*
				追加：
					1. 上个字符串的结束双引号
					2. 字符串拼接的加号
					3. 表达式分组的起始小括号
			*/
			contentBuilder.appendString('"+(');
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			/*
				追加：
					1. 表达式分组的结束小括号
					2. 字符串拼接的加号
					3. 下个字符串的结束双引号
			*/
			contentBuilder.appendString(')+"');
		},
		/**
		 * 提取并参数化表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		parameterizeTo: function(contentBuilder){
			// 追加参数分隔符与起始小括号，小括号是防止逗号表达式被当做参数分隔符
			contentBuilder.appendString(",(");
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			// 结束小括号
			contentBuilder.appendString(")");
		}
	});

	return PlaceHolderExpression;
}();

this.PlaceHolderStatement = function(){
	/**
	 * 模板占位符（模板参数）语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PlaceHolderStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PlaceHolderStatement = new Rexjs(PlaceHolderStatement, ECMAScriptStatement);

	PlaceHolderStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context, ECMAScriptErrors.TEMPLATE);
				return null;
			}

			// 跳出语句并设置最近表达式的 inner
			this.out().latest.inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.latest.context.tag;
		}
	});

	return PlaceHolderStatement;
}();

this.OpenPlaceHolderTag = function(OpenBraceTag, PlaceHolderExpression, PlaceHolderStatement){
	/**
	 * 起始模板占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenPlaceHolderTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenPlaceHolderTag = new Rexjs(OpenPlaceHolderTag, OpenBraceTag);

	OpenPlaceHolderTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closePlaceHolderTag;
		},
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /\$\{/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				new PlaceHolderExpression(context)
			);

			// 设置当前语句
			statements.statement = new PlaceHolderStatement(statements);
		}
	});

	return OpenPlaceHolderTag;
}(
	this.OpenBraceTag,
	this.PlaceHolderExpression,
	this.PlaceHolderStatement
);

this.ClosePlaceHolderTag = function(CloseBraceTag){
	/**
	 * 结束模板占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosePlaceHolderTag(_type){
		CloseBraceTag.call(this, _type);
	};
	ClosePlaceHolderTag = new Rexjs(ClosePlaceHolderTag, CloseBraceTag);

	ClosePlaceHolderTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.templateContentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.latest.close = context;
		}
	});

	return ClosePlaceHolderTag;
}(
	this.CloseBraceTag
);

closePlaceHolderTag = new this.ClosePlaceHolderTag();

}.call(
	this,
	// closePlaceHolderTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/template-placeholder.js"
								);


eval(
									function(){
										// 模板参数相关
~function(TemplateExpression, PlaceHolderExpression){

this.TemplateParameterExpression = function(config, extractTo, compileInner){
	/**
	 * 模板参数表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} operand - 操作对象表达式
	 */
	function TemplateParameterExpression(open, operand){
		TemplateExpression.call(this, open);

		this.operand = operand;
	};
	TemplateParameterExpression = new Rexjs(TemplateParameterExpression, TemplateExpression);

	TemplateParameterExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取操作对象表达式
			this.operand.extractTo(contentBuilder);

			// 如果需要编译
			if(config.value){
				// 编译 inner
				compileInner(this.inner, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		operand: null
	});

	return TemplateParameterExpression;
}(
	// config
	ECMAScriptConfig.template,
	PartnerExpression.prototype.extractTo,
	// compileInner
	function(inner, contentBuilder){
		var placeholders = [];

		/*
			追加：
				1. 函数调用起始小括号
				2. 字符串模板参数的起始中括号
				3. 字符串起始双引号
		*/
		contentBuilder.appendString('(["');

		// 遍历 inner
		for(var i = inner.min, j = inner.length;i < j;i++){
			var expression = inner[i];

			// 如果是模板占位符表达式
			if(expression instanceof PlaceHolderExpression){
				// 分隔两个字符串
				contentBuilder.appendString('","');
				// 添加占位符表达式，目的是滞后编译
				placeholders.push(expression);
				continue;
			}

			// 直接编译该表达式
			expression.compileTo(contentBuilder);
		}

		/*
			追加：
				1. 字符串结束双引号
				2. 字符串模板参数的结束中括号
		*/
		contentBuilder.appendString('"]');

		// 遍历占位符表达式数组
		for(var x = 0, y = placeholders.length;x < y;x++){
			// 参数化提取该占位符表达式
			placeholders[x].parameterizeTo(contentBuilder);
		}

		// 追加函数调用起始小括号
		contentBuilder.appendString(")");
	}
);

this.OpenTemplateParameterTag = function(OpenTemplateTag, TemplateParameterExpression, TemplateStatement){
	/**
	 * 起始模板参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenTemplateParameterTag(_type){
		OpenTemplateTag.call(this, _type);
	};
	OpenTemplateParameterTag = new Rexjs(OpenTemplateParameterTag, OpenTemplateTag);

	OpenTemplateParameterTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		order: ECMAScriptOrders.TEMPLATE_PARAMETER,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TemplateParameterExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new TemplateStatement(statements);
		}
	});

	return OpenTemplateParameterTag;
}(
	this.OpenTemplateTag,
	this.TemplateParameterExpression,
	this.TemplateStatement
);

}.call(
	this,
	this.TemplateExpression,
	this.PlaceHolderExpression
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/template-parameter.js"
								);


eval(
									function(){
										// 静态标签相关
~function(){

this.StaticTag = function(){
	/**
	 * 静态标签
	 * @param {Number} _type - 标签类型
	 */
	function StaticTag(_type){
		SyntaxTag.call(this, _type);
	};
	StaticTag = new Rexjs(StaticTag, SyntaxTag);

	StaticTag.props({
		regexp: /static/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.body.close = context;
		}
	});

	return StaticTag;
}();

this.StaticModifierTag = function(StaticTag, IdentifierPropertyNameExpression){
	/**
	 * 静态属性修饰符标签
	 * @param {Number} _type - 标签类型
	 */
	function StaticModifierTag(_type){
		StaticTag.call(this, _type);
	};
	StaticModifierTag = new Rexjs(StaticModifierTag, StaticTag);

	StaticModifierTag.props({
		order: ECMAScriptOrders.STATIC_MODIFIER,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.staticModifierContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var classPropertyExpression = statement.expression;

			// 设置类属性表达式的修饰符
			classPropertyExpression.modifier = context;
			// 设置类属性表达式的属性名
			classPropertyExpression.name = new IdentifierPropertyNameExpression(context);
		}
	});

	return StaticModifierTag;
}(
	this.StaticTag,
	this.IdentifierPropertyNameExpression
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/static.js"
								);


eval(
									function(){
										// 一些类的辅助表达式相关
~function(PropertyExpression){

this.ExtendsExpression = function(){
	/**
	 * extends 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ExtendsExpression(context){
		Expression.call(this, context);
	};
	ExtendsExpression = new Rexjs(ExtendsExpression, Expression);

	ExtendsExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 直接提取 super 表达式即可
			this.super.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加空格，分离与 class 关键字 或 类名称
			contentBuilder.appendSpace();
			// 追加 extends 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格，分离 super
			contentBuilder.appendSpace();
			// 提取 super 表达式
			this.super.extractTo(contentBuilder);
		},
		super: null
	});

	return ExtendsExpression;
}();

this.DefaultExtendsExpression = function(ExtendsExpression){
	/**
	 * 默认 extends 表达式
	 */
	function DefaultExtendsExpression(){
		ExtendsExpression.call(this, null);
	};
	DefaultExtendsExpression = new Rexjs(DefaultExtendsExpression, ExtendsExpression);

	DefaultExtendsExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			contentBuilder.appendString("void 0");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){}
	});

	return DefaultExtendsExpression;
}(
	this.ExtendsExpression
);
	
this.ClassPropertyExpression = function(extractTo){
	/**
	 * 类属性表达式
	 */
	function ClassPropertyExpression(){
		PropertyExpression.call(this);
	};
	ClassPropertyExpression = new Rexjs(ClassPropertyExpression, PropertyExpression);

	ClassPropertyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加 实例化类的属性
			contentBuilder.appendString(
				"new Rexjs." +
				(this.static ? "Static" : "Class") +
				"Property("
			);

			// 提取属性名
			this.name.defineTo(contentBuilder);
			// 追加参数分隔符逗号
			contentBuilder.appendString(",function");
			// 直接以简写形式提取表达式文本内容
			this.value.shortTo(contentBuilder);

			// 如果存在访问器
			if(this.accessible){
				// 追加 属性类型分隔符 及 属性类型
				contentBuilder.appendString(
					',"' + this.accessor.content + '"'
				);
			}

			// 追加实例化的结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 获取原型链的深度或层次
		 */
		get superDepth(){
			return this.static ? 1 : 2;
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果是静态属性
			if(this.static){
				// 追加修饰符
				contentBuilder.appendContext(this.modifier);
				// 追加空格
				contentBuilder.appendSpace();
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		modifier: null,
		/**
		 * 获取该属性是否为静态属性
		 */
		get static(){
			return this.named(this.modifier);
		}
	});

	return ClassPropertyExpression;
}(
	PropertyExpression.prototype.extractTo
);

}.call(
	this,
	this.PropertyExpression
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class-helper-expression.js"
								);


eval(
									function(){
										// 类标签相关
~function(){

this.ClassExpression = function(DefaultExtendsExpression, config){
	/**
	 * 类表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ClassExpression(context){
		Expression.call(this, context);
	};
	ClassExpression = new Rexjs(ClassExpression, Expression);

	ClassExpression.props({
		/**
		 * 自动化生成变量，以模拟 ObjectExpression 环境
		 * @param {ECMAScriptStatements} statements - 当前语句块
		 */
		autoVariable: function(statements){},
		name: new DefaultExpression(),
		extends: new DefaultExtendsExpression(),
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译类
			if(config.value){
				var body = this.body;
				
				// 追加闭包头部
				contentBuilder.appendString("(Rexjs.Class.create(");
				// 编译继承表达式
				this.extends.compileTo(contentBuilder);
				// 追加 父类 与 属性数组的起始中括号
				contentBuilder.appendString(",[");
				// 编译类主体
				body.compileTo(contentBuilder);
				// 追加 属性数组的结束中括号 和 构造函数的索引值，并传入闭包参数，目的是 更快的访问 及 更小的压缩代码
				contentBuilder.appendString("], " + body.indexOfConstructor.toString() + "))");
				return;
			}

			// 追加 class 关键字上下文
			contentBuilder.appendContext(this.context);
			// 提取类名称
			this.name.extractTo(contentBuilder);
			// 提取 extends 表达式
			this.extends.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		}
	});

	return ClassExpression;
}(
	this.DefaultExtendsExpression,
	// config
	ECMAScriptConfig.addBaseConfig("class")
);

this.ClassTag = function(ClassExpression){
	/**
	 * 类标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClassTag = new Rexjs(ClassTag, SyntaxTag);

	ClassTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /class/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ClassExpression(context);
		}
	});

	return ClassTag;
}(
	this.ClassExpression
);

this.ClassNameTag = function(VariableDeclarationTag){
	/**
	 * 类名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ClassNameTag = new Rexjs(ClassNameTag, VariableDeclarationTag);

	ClassNameTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的名称
			statement.expression.name = new Expression(context);
		}
	});

	return ClassNameTag;
}(
	this.VariableDeclarationTag
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class.js"
								);


eval(
									function(){
										// 类声明标签相关
~function(ClassExpression, ClassNameTag){

this.ClassDeclarationExpression = function(config, extractTo){
	/**
	 * 类声明表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ClassDeclarationExpression(context){
		ClassExpression.call(this, context);
	};
	ClassDeclarationExpression = new Rexjs(ClassDeclarationExpression, ClassExpression);

	ClassDeclarationExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析类
			if(config.value){
				// 追加 var 关键字
				contentBuilder.appendString("var");
				// 提取名称
				this.name.extractTo(contentBuilder);
				// 追加变量赋值等于号
				contentBuilder.appendString("=");
				// 调用父类方法
				extractTo.call(this, contentBuilder);
				// 追加语句结束分号
				contentBuilder.appendString(";");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return ClassDeclarationExpression;
}(
	// config
	ECMAScriptConfig.class,
	ClassExpression.prototype.extractTo
);

this.ClassDeclarationTag = function(ClassTag, ClassDeclarationExpression){
	/**
	 * 类声明标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassDeclarationTag(context){
		ClassTag.call(this, context);
	};
	ClassDeclarationTag = new Rexjs(ClassDeclarationTag, ClassTag);

	ClassDeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ClassDeclarationExpression(context);
		}
	});

	return ClassDeclarationTag;
}(
	this.ClassTag,
	this.ClassDeclarationExpression
);

this.ClassVariableTag = function(visitor){
	/**
	 * 类名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassVariableTag(_type){
		ClassNameTag.call(this, _type);
	};
	ClassVariableTag = new Rexjs(ClassVariableTag, ClassNameTag);

	ClassVariableTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ClassVariableTag;
}(
	ClassNameTag.prototype.visitor
);

}.call(
	this,
	this.ClassExpression,
	this.ClassNameTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class-declaration.js"
								);


eval(
									function(){
										// 构造函数标签相关
~function(OpenShorthandMethodArgumentsTag, CloseShorthandMethodBodyTag, PHASE_NONE, PHASE_WAITING_CALL, PHASE_CALLED, closeConstructorArgumentsTag, closeConstructorBodyTag, getClassPropertyStatement){

this.ConstructorNameExpression = function(config){
	/**
	 * 构造函数名称表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConstructorNameExpression(context){
		Expression.call(this, context);
	};
	ConstructorNameExpression = new Rexjs(ConstructorNameExpression, Expression);

	ConstructorNameExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译类
			if(config.value){
				var context = this.context;
				
				// 如果没有类名
				if(context === null){
					return;
				}

				// 追加 空格 和 类名
				contentBuilder.appendString(" " + context.content);
			}
		}
	});

	return ConstructorNameExpression;
}(
	// config
	ECMAScriptConfig.class
);

this.DefaultConstructorExpression = function(ClassPropertyExpression){
	/**
	 * 默认构造函数表达式
	 * @param {Context} name - 类名称标签上下文
	 * @param {Boolean} extended - 该类存在继承
	 */
	function DefaultConstructorExpression(name, extended){
		ClassPropertyExpression.call(this);

		this.name = name;
		this.extended = extended;
	};
	DefaultConstructorExpression = new Rexjs(DefaultConstructorExpression, ClassPropertyExpression);

	DefaultConstructorExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			var name = this.name;

			// 追加构造函数
			contentBuilder.appendString(
				'new Rexjs.ClassProperty("constructor",function' +
				(name === null ? "" : " " + name.content) +
				"(){" + 
					(
						// 如果该类存在继承
						this.extended ?
							"Rexjs.Class.superOf(this," + this.superDepth + ",true)();" :
							""
					) +
				"})"
			);
		},
		extended: false,
		name: null
	});

	return DefaultConstructorExpression;
}(
	this.ClassPropertyExpression
);

this.ConstructorBodyStatements = function(ShorthandMethodBodyStatements){
	/**
	 * 简写方法主体语句块
	 * @param {Number} phase - 该语句块的父类调用阶段
	 */
	function ConstructorBodyStatements(phase){
		ShorthandMethodBodyStatements.call(this);

		this.phase = phase;
	};
	ConstructorBodyStatements = new Rexjs(ConstructorBodyStatements, ShorthandMethodBodyStatements);

	ConstructorBodyStatements.static({
		PHASE_CALLED: PHASE_CALLED,
		PHASE_NONE: PHASE_NONE,
		PHASE_WAITING_CALL: PHASE_WAITING_CALL
	});

	ConstructorBodyStatements.props({
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 判断阶段
			switch(this.phase){
				// 如果已经调用过 super
				case PHASE_CALLED:
					// 报错
					parser.error(open, ECMAScriptErrors.SUPER_RECALL);
					return 0;

				// 如果正在等待调用 super
				case PHASE_WAITING_CALL:
					break;

				default:
					// 报错
					parser.error(open, ECMAScriptErrors.SUPER_CALL_UNEXTEND);
					return 0;
			}

			// 表示已经调用过 super
			this.phase = PHASE_CALLED;
			// 返回属性表达式的 superDepth 属性
			return getClassPropertyStatement(this.target).expression.superDepth;
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(parser, context){
			// 如果阶段不等于等待调用 super，则说明，没有 super 或 已经调用
			if(this.phase !== PHASE_WAITING_CALL){
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		},
		phase: PHASE_NONE
	});

	return ConstructorBodyStatements;
}(
	this.ShorthandMethodBodyStatements
);

this.ConstructorTag = function(WordPropertyNameTag, IdentifierPropertyNameExpression){
	/**
	 * 构造函数标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstructorTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	ConstructorTag = new Rexjs(ConstructorTag, WordPropertyNameTag);

	ConstructorTag.props({
		regexp: WordPropertyNameTag.compileRegExp("constructor"),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constructorArgumentsTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyExpression = statement.expression;

			// 设置类的名称
			propertyExpression.name = new IdentifierPropertyNameExpression(context);

			// 如果是静态属性
			if(propertyExpression.static){
				return;
			}

			// 如果存在访问器
			if(propertyExpression.accessible){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("CONSTRUCTOR", "an accessor")
				);

				return;
			}

			var classBodyExpression = statement.target.expression.body;

			// 设置类主体表达式的构造函数索引
			classBodyExpression.indexOfConstructor = classBodyExpression.inner.length;
		}
	});

	return ConstructorTag;
}(
	this.WordPropertyNameTag,
	this.IdentifierPropertyNameExpression
);

this.OpenConstructorArgumentsTag = function(ConstructorNameExpression, visitor){
	/**
	 * 构造函数参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenConstructorArgumentsTag(_type){
		OpenShorthandMethodArgumentsTag.call(this, _type);
	};
	OpenConstructorArgumentsTag = new Rexjs(OpenConstructorArgumentsTag, OpenShorthandMethodArgumentsTag);

	OpenConstructorArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeConstructorArgumentsTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置构造函数的函数表达式的名称
			statements.statement.target.expression.name = new ConstructorNameExpression(statement.target.expression.name.context);
		}
	});

	return OpenConstructorArgumentsTag;
}(
	this.ConstructorNameExpression,
	OpenShorthandMethodArgumentsTag.prototype.visitor
);

this.CloseConstructorArgumentsTag = function(CloseShorthandMethodArgumentsTag){
	/**
	 * 构造函数参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseConstructorArgumentsTag(_type){
		CloseShorthandMethodArgumentsTag.call(this, _type);
	};
	CloseConstructorArgumentsTag = new Rexjs(CloseConstructorArgumentsTag, CloseShorthandMethodArgumentsTag);

	CloseConstructorArgumentsTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constructorBodyTags;
		}
	});

	return CloseConstructorArgumentsTag;
}(
	this.CloseShorthandMethodArgumentsTag
);

this.OpenConstructorBodyTag = function(OpenShorthandMethodBodyTag, ConstructorBodyStatements){
	/**
	 * 构造函数起始主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenConstructorBodyTag(_type){
		OpenShorthandMethodBodyTag.call(this, _type);
	};
	OpenConstructorBodyTag = new Rexjs(OpenConstructorBodyTag, OpenShorthandMethodBodyTag);

	OpenConstructorBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeConstructorBodyTag;
		},
		/**
		 * 进入函数主体语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			(
				parser.statements = new ConstructorBodyStatements(
					// 如果有父类
					getClassPropertyStatement(parser.statements).target.expression.extends.context ?
						PHASE_WAITING_CALL :
						PHASE_NONE
				)
			)
			.target = statements;
		}
	});

	return OpenConstructorBodyTag;
}(
	this.OpenShorthandMethodBodyTag,
	this.ConstructorBodyStatements
);

this.CloseConstructorBodyTag = function(visitor){
	/**
	 * 构造函数起始主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseConstructorBodyTag(_type){
		CloseShorthandMethodBodyTag.call(this, _type);
	};
	CloseConstructorBodyTag = new Rexjs(CloseConstructorBodyTag, CloseShorthandMethodBodyTag);

	CloseConstructorBodyTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果需要调用 super，但没有调用
			if(statement.expression.inner.phase === PHASE_WAITING_CALL){
				// 报错
				parser.error(statement.target.target.expression.name.context, ECMAScriptErrors.WITHOUT_SUPER_CALL);
				return;
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseConstructorBodyTag;
}(
	CloseShorthandMethodBodyTag.prototype.visitor
);

closeConstructorArgumentsTag = new this.CloseConstructorArgumentsTag();
closeConstructorBodyTag = new this.CloseConstructorBodyTag();

}.call(
	this,
	this.OpenShorthandMethodArgumentsTag,
	this.CloseShorthandMethodBodyTag,
	// PHASE_NONE
	0,
	// PHASE_WAITING_CALL
	1,
	// PHASE_CALLED
	2,
	// closeConstructorArgumentsTag
	null,
	// closeConstructorBodyTag
	null,
	// getClassPropertyStatement
	function(statements){
		return statements.statement.target.target;
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class-constructor.js"
								);


eval(
									function(){
										// 类属性访问器标签相关
~function(require){

this.GetDescriptorTag = function(GetTag){
	/**
	 * 类属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	function GetDescriptorTag(context){
		GetTag.call(this, context);
	};
	GetDescriptorTag = new Rexjs(GetDescriptorTag, GetTag);

	GetDescriptorTag.props({
		require: require
	});

	return GetDescriptorTag;
}(
	this.GetTag
);

this.SetDescriptorTag = function(SetTag){
	/**
	 * 类属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	function SetDescriptorTag(context){
		SetTag.call(this, context);
	};
	SetDescriptorTag = new Rexjs(SetDescriptorTag, SetTag);

	SetDescriptorTag.props({
		require: require
	});

	return SetDescriptorTag;
}(
	this.SetTag
);

}.call(
	this,
	// require
	function(tagsMap){
		return tagsMap.accessorDescriptorContextTags;
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class-accessor.js"
								);


eval(
									function(){
										// 类主体标签相关
~function(DefaultConstructorExpression, BinaryNumberTag, OctalNumberTag, config, classPropertySeparatorTag, closeClassBodyTag){

this.ClassBodyExpression = function(ObjectExpression, extractTo, compileItem){
	/**
	 * 对象表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ClassBodyExpression(open){
		ObjectExpression.call(this, open);
	};
	ClassBodyExpression = new Rexjs(ClassBodyExpression, ObjectExpression);

	ClassBodyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 执行属性连接
			this.inner.execJoin(compileItem, contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 设置属性的连接符
			this.inner.join = ";";
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		indexOfConstructor: -1
	});

	return ClassBodyExpression;
}(
	this.ObjectExpression,
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder){
		item.compileTo(contentBuilder);
	}
);

this.ClassPropertyStatement = function(PropertyStatement, ClassPropertyExpression, IdentifierTag, NumberTag, StringTag, insertConstructorIfNeed, getNumberTag){
	/**
	 * 类属性语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ClassPropertyStatement(statements){
		PropertyStatement.call(this, statements);
	};
	ClassPropertyStatement = new Rexjs(ClassPropertyStatement, PropertyStatement);

	ClassPropertyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var classExpression = this.out(), classBodyExpression = classExpression.body, propertyExpression = this.expression;

			// 如果不是空表达式
			if(propertyExpression.name !== null){
				// 如果存在访问器
				if(propertyExpression.accessible){
					// 根据访问器核对函数正确性
					propertyExpression.accessor.tag.checkFunction(
						parser,
						propertyExpression.value.operand,
						context
					);
				}

				// 添加属性表达式
				classBodyExpression.inner.add(propertyExpression);
			}

			var t, tag = this.tagOf(), content = context.content;

			switch(content){
				// 如果是属性分隔符
				case ";":
					return tag.separator;

				// 如果是结束大括号
				case "}":
					// 可能性的插入构造函数，即需要解析时候，又没有定义构造函数属性
					insertConstructorIfNeed(classExpression, classBodyExpression);
					// 返回类主体结束大括号
					return tag.binding;

				// 如果是 static
				case "static":
					t = tag.staticModifier;
					break;

				// 如果是 constructor
				case "constructor":
					t = tag.constructorMethodName;
					break;

				// 如果是 get
				case "get":
					t = tag.getDescriptor;
					break;

				// 如果是 set
				case "set":
					t = tag.setDescriptor;
					break;
				
				// 如果是计算式起始中括号
				case "[":
					t = tag.openComputedPropertyName;
					break;

				// 其他
				default: {
					var contextTag = context.tag;

					switch(true){
						// 如果标签是标识符标签
						case contextTag instanceof IdentifierTag:
							t = tag.identifierPropertyName;
							break;

						// 如果是数字标签
						case contextTag instanceof NumberTag:
							// 判断类型，并返回
							t = getNumberTag(tag, contextTag);
							break;

						// 如果是字符串标签
						case contextTag instanceof StringTag:
							t = tag.stringPropertyName;
							break;

						// 如果是关键字标签
						case IdentifierTag.keywords.indexOf(content) > -1:
							t = tag.keywordPropertyName;
							break;

						default:
							// 其他都是非法字符，报错
							parser.error(context);
							return null;
					}
				}
			}

			var statements = this.statements;

			// 进入这里，说明没有分隔符，要再判断

			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
			return t;
		},
		/**
		 * 初始化类属性表达式
		 */
		initExpression: function(){
			this.expression = new ClassPropertyExpression();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.body.context.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 直接报错
			parser.error(context);
		}
	});

	return ClassPropertyStatement;
}(
	this.PropertyStatement,
	this.ClassPropertyExpression,
	this.IdentifierTag,
	this.NumberTag,
	this.StringTag,
	// insertConstructorIfNeed
	function(classExpression, classBodyExpression){
		switch(false){
			// 如果不需要编译类表达式
			case config.value:
				return;

			// 如果已有构造函数
			case classBodyExpression.indexOfConstructor === -1:
				return;
		}

		var inner = classBodyExpression.inner;

		// 设置构造函数索引值
		classBodyExpression.indexOfConstructor = inner.length;

		// 添加构造函数表达式
		inner.add(
			new DefaultConstructorExpression(
				classExpression.name.context,
				classExpression.extends.super !== null
			)
		);
	},
	// getNumberTag
	function(tag, contextTag){
		// 如果是二进制数字标签
		if(contextTag instanceof BinaryNumberTag){
			return tag.binaryNumberPropertyName;
		}

		// 如果是八进制数字标签
		if(contextTag instanceof OctalNumberTag){
			return tag.octalNumberPropertyName;
		}

		// 返回 es5 数字标签
		return tag.numberPropertyName;
	}
);

this.OpenClassBodyTag = function(
	OpenObjectTag,
	ClassBodyExpression, ClassPropertyStatement,
	binaryNumberPropertyNameTag, constructorTag,
	getDescriptorTag, identifierPropertyNameTag, numberPropertyNameTag,
	octalNumberPropertyNameTag, openComputedPropertyNameTag,
	setDescriptorTag, staticModifierTag, stringPropertyNameTag, keywordPropertyNameTag
){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenClassBodyTag(_type){
		OpenObjectTag.call(this, _type);
	};
	OpenClassBodyTag = new Rexjs(OpenClassBodyTag, OpenObjectTag);

	OpenClassBodyTag.props({
		/**
		 * 获取绑定的二进制数字标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binaryNumberPropertyName(){
			return binaryNumberPropertyNameTag;
		},
		/**
		 * 获取绑定的类主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeClassBodyTag;
		},
		/**
		 * 获取绑定的构造函数标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get constructorMethodName(){
			return constructorTag;
		},
		/**
		 * 获取绑定的 get 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get getDescriptor(){
			return getDescriptorTag;
		},
		/**
		 * 获取绑定的标识符属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get identifierPropertyName(){
			return identifierPropertyNameTag;
		},
		/**
		 * 获取绑定的关键字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get keywordPropertyName(){
			return keywordPropertyNameTag;
		},
		/**
		 * 获取绑定的数字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get numberPropertyName(){
			return numberPropertyNameTag;
		},
		/**
		 * 获取绑定的八进制数字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get octalNumberPropertyName(){
			return octalNumberPropertyNameTag;
		},
		/**
		 * 获取绑定的起始计算式名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get openComputedPropertyName(){
			return openComputedPropertyNameTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return classPropertySeparatorTag;
		},
		/**
		 * 获取绑定的 set 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get setDescriptor(){
			return setDescriptorTag;
		},
		/**
		 * 获取绑定的 static 修饰符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get staticModifier(){
			return staticModifierTag;
		},
		/**
		 * 获取绑定的字符串属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get stringPropertyName(){
			return stringPropertyNameTag
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openClassBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的主体
			statement.expression.body = new ClassBodyExpression(context);
			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
		}
	});

	return OpenClassBodyTag;
}(
	this.OpenObjectTag,
	this.ClassBodyExpression,
	this.ClassPropertyStatement,
	// binaryNumberPropertyNameTag
	new this.BinaryNumberPropertyNameTag(),
	// constructorTag
	new this.ConstructorTag(),
	// getDescriptorTag
	new this.GetDescriptorTag(),
	// identifierPropertyNameTag
	new this.IdentifierPropertyNameTag(),
	// numberPropertyNameTag
	new this.NumberPropertyNameTag(),
	// octalNumberPropertyNameTag
	new this.OctalNumberPropertyNameTag(),
	// openComputedPropertyNameTag
	new this.OpenComputedPropertyNameTag(),
	// setDescriptorTag
	new this.SetDescriptorTag(),
	// staticModifierTag
	new this.StaticModifierTag(),
	// stringPropertyNameTag
	new this.StringPropertyNameTag(),
	// keywordPropertyNameTag
	new this.KeywordPropertyNameTag()
);

this.ClassPropertySeparatorTag = function(SemicolonTag, ClassPropertyStatement){
	/**
	 * 类属性分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertySeparatorTag(_type){
		SemicolonTag.call(this, _type);
	};
	ClassPropertySeparatorTag = new Rexjs(ClassPropertySeparatorTag, SemicolonTag);

	ClassPropertySeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openClassBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
		}
	});

	return ClassPropertySeparatorTag;
}(
	this.SemicolonTag,
	this.ClassPropertyStatement
);

this.ClassPropertyPlaceholderTag = function(ClassPropertySeparatorTag){
	/**
	 * 类属性占位符（即空属性分隔符）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertyPlaceholderTag(_type){
		ClassPropertySeparatorTag.call(this, _type);
	};
	ClassPropertyPlaceholderTag = new Rexjs(ClassPropertyPlaceholderTag, ClassPropertySeparatorTag);

	ClassPropertyPlaceholderTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(){}
	});

	return ClassPropertyPlaceholderTag;
}(
	this.ClassPropertySeparatorTag
);

this.CloseClassBodyTag = function(CloseObjectTag){
	/**
	 * 类主体结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseClassBodyTag(_type){
		CloseObjectTag.call(this, _type);
	};
	CloseClassBodyTag = new Rexjs(CloseClassBodyTag, CloseObjectTag);

	CloseClassBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.body.close = context;
		}
	});

	return CloseClassBodyTag;
}(
	this.CloseObjectTag
);

classPropertySeparatorTag = new this.ClassPropertySeparatorTag();
closeClassBodyTag = new this.CloseClassBodyTag();

}.call(
	this,
	this.DefaultConstructorExpression,
	this.BinaryNumberTag,
	this.OctalNumberTag,
	// config
	ECMAScriptConfig.class,
	// classPropertySeparatorTag
	null,
	// closeClassBodyTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class-body.js"
								);


eval(
									function(){
										// 继承标签相关
~function(){

this.ExtendsStatement = function(){
	function ExtendsStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ExtendsStatement = new Rexjs(ExtendsStatement, ECMAScriptStatement);

	ExtendsStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果是起始大括号
			if(context.content !== "{"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 extends 表达式的 super 属性
			this.out().extends.super = this.expression;
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.extends.context.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			switch(context.content){
				// 点属性访问器
				case ".":
					break;

				// 中括号属性访问器
				case "[":
					break;

				// 方法调用
				case "(":
					break;

				// 模板方法调用
				case "`":
					break;

				default:
					// 报错
					parser.error(context);
					return null;
			}

			return context.tag;
		}
	});

	return ExtendsStatement;
}();

this.ExtendsTag = function(ExtendsExpression, ExtendsStatement, openClassBodyTag){
	/**
	 * extends 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ExtendsTag(_type){
		SyntaxTag.call(this, _type);
	};
	ExtendsTag = new Rexjs(ExtendsTag, SyntaxTag);

	ExtendsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return openClassBodyTag;
		},
		regexp: /extends/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.extendsContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的 extends 属性
			statement.expression.extends = new ExtendsExpression(context);
			// 设置当前语句
			statements.statement = new ExtendsStatement(statements);
		}
	});

	return ExtendsTag;
}(
	this.ExtendsExpression,
	this.ExtendsStatement,
	// openClassBodyTag
	new this.OpenClassBodyTag()
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class-extends.js"
								);


eval(
									function(){
										// 父类相关
~function(){

this.SuperExpression = function(LiteralExpression, config){
	/**
	 * super 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperExpression(context){
		LiteralExpression.call(this, context);
	};
	SuperExpression = new Rexjs(SuperExpression, LiteralExpression);
	
	SuperExpression.props({
		call: false,
		depth: 1,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译类
			if(config.value){
				// 追加编译后调用 super 的字符串
				contentBuilder.appendString(
					"(Rexjs.Class.superOf(this," + this.depth + "" + (this.call ? ",true" : "") + "))"
				);

				return;
			}
			
			// 追加 super 关键字上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return SuperExpression;
}(
	this.LiteralExpression,
	// config
	ECMAScriptConfig.class
);

this.SuperStatement = function(){
	/**
	 * super 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SuperStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SuperStatement = new Rexjs(SuperStatement, ECMAScriptStatement);

	SuperStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var superExpression = this.out();

			// 报错
			parser.error(
				superExpression.context,
				ECMAScriptErrors.template("KEYWORD", superExpression.context.content)
			);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出当前语句
			var superExpression = this.out();

			switch(context.content){
				// 如果是小括号
				case "(":
					// 表明是调用 super
					superExpression.call = true;
					// 向当前语句块申请调用 super
					superExpression.depth = this.statements.applySuperCall(parser, superExpression.context, context);
					break;

				// 如果是点属性访问器
				case ".":
				// 如果是中括号属性访问器
				case "[":
					// 向当前语句块申请应用 super 关键字
					superExpression.depth = this.statements.applySuper(parser, superExpression.context);
					break;

				default:
					// 借用 catch 来报错
					this.catch(parser, context);
					return null;
			}

			return context.tag;
		}
	});

	return SuperStatement;
}();

this.SuperTag = function(LiteralTag, SuperExpression, SuperStatement){
	/**
	 * super 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperTag(_type){
		LiteralTag.call(this, _type);
	};
	SuperTag = new Rexjs(SuperTag, LiteralTag);

	SuperTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /super/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new SuperExpression(context);
			// 设置当前语句
			statements.statement = new SuperStatement(statements);
		}
	});

	return SuperTag;
}(
	this.LiteralTag,
	this.SuperExpression,
	this.SuperStatement
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/class-super.js"
								);


eval(
									function(){
										// import 关键字相关
~function(ModuleTag, config){

this.ImportExpression = function(compileMember){
	/**
	 * import 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function ImportExpression(context, file){
		Expression.call(this, context);

		this.file = file;
		this.members = new ListExpression(null, ",");
	};
	ImportExpression = new Rexjs(ImportExpression, Expression);

	ImportExpression.props({
		clean: true,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译 import 语句
			if(config.value){
				// 如果当前 import 没有导入任何成员
				if(this.clean){
					// 返回，因为模块在依赖分析时候就已经加载
					return;
				}

				// 初始化内容生成器
				var anotherBuilder = new ContentBuilder();

				// 如果有 from
				if(this.from){
					// 追加模块名称
					anotherBuilder.appendString(
						this.name.content + ',"' + this.file.filename + '"'
					);
				}

				// 追加变量声明关键字
				contentBuilder.appendString("var ");
				// 编译每一个成员
				this.members.execJoin(compileMember, contentBuilder, anotherBuilder);
				return;
			}

			var from = this.from;

			// 追加 import 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();

			// 如果有 from
			if(from){
				// 提取成员
				this.members.extractTo(contentBuilder);
				// 追加空格
				contentBuilder.appendSpace();
				// 追加 from
				contentBuilder.appendContext(from);
				// 追加空格
				contentBuilder.appendSpace();
			}

			// 提取模块名称
			contentBuilder.appendContext(this.name);
		},
		file: null,
		from: null,
		members: null,
		name: null
	});

	return ImportExpression;
}(
	// compileMember
	function(member, contentBuilder, anotherBuilder){
		member.compileTo(contentBuilder, anotherBuilder);
	}
);

this.ImportTag = function(ImportExpression, visitor){
	/**
	 * import 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ImportTag(_type){
		ModuleTag.call(this, _type);
	};
	ImportTag = new Rexjs(ImportTag, ModuleTag);

	ImportTag.props({
		regexp: /import/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.importContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 先调用父类方法，进行环境上下文检测
			visitor.call(this, parser, context, statement, statements);

			// 设置当前表达式
			statement.expression = new ImportExpression(context, parser.file);
		}
	});

	return ImportTag;
}(
	this.ImportExpression,
	ModuleTag.prototype.visitor
);

this.MemberSeparatorTag = function(CommaTag){
	/**
	 * 模块成员分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	MemberSeparatorTag = new Rexjs(MemberSeparatorTag, CommaTag);

	MemberSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(){}
	});

	return MemberSeparatorTag;
}(
	this.CommaTag
);

this.FromTag = function(){
	/**
	 * from 标签
	 * @param {Number} _type - 标签类型
	 */
	function FromTag(_type){
		SyntaxTag.call(this, _type);
	};
	FromTag = new Rexjs(FromTag, SyntaxTag);

	FromTag.props({
		regexp: /from/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 import 表达式的 from 属性
			statement.expression.from = context;
		}
	});

	return FromTag;
}();

this.ModuleNameTag = function(StringTag){
	/**
	 * 模块名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleNameTag(_type){
		StringTag.call(this, _type);
	};
	ModuleNameTag = new Rexjs(ModuleNameTag, StringTag);

	ModuleNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var content = context.content;

			// 设置 import 表达式的 name 属性
			statement.expression.name = context;

			// 如果需要解析 import 语句，否则不需要添加依赖，因为统统交给浏览器自己或第三方去处理 import 语句
			if(config.value){
				// 添加模块依赖
				parser.deps.push(
					content.substring(1, content.length - 1)
				);
			}
		}
	});

	return ModuleNameTag; 
}(
	this.StringTag
);

}.call(
	this,
	this.ModuleTag,
	// config
	ECMAScriptConfig.addModuleConfig("import")
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/import.js"
								);


eval(
									function(){
										// 模块多成员表达式相关
~function(multipleMembersSeparatorTag, closeMultipleMembersTag){

this.MultipleMembersExpression = function(importMember, exportMember, exportMemberAs){
	/**
	 * 多成员导入表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function MultipleMembersExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	MultipleMembersExpression = new Rexjs(MultipleMembersExpression, PartnerExpression);

	MultipleMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var inner = this.inner;

			// 如果是导入
			if(this.import){
				// 执行成员导入项连接
				inner.execJoin(importMember, contentBuilder, anotherBuilder);
				return;
			}

			var result = anotherBuilder.result, endingString = ")";

			// 追加提取方法
			contentBuilder.appendString("Rexjs.Module.exportAs(");
			// 追加对象起始大括号
			contentBuilder.appendContext(this.open);

			// 如果长度大于 0，则说明是 export from 表达式
			if(result.length > 0){
				// 执行成员输出项连接
				inner.execJoin(exportMemberAs, contentBuilder, anotherBuilder);

				// 添加模块名称
				endingString = "," + result + endingString;
			}
			else {
				// 执行成员输出项连接
				inner.execJoin(exportMember, contentBuilder);
			}

			// 追加对象结束大括号
			contentBuilder.appendContext(this.close);
			// 追加提取方法结束小括号
			contentBuilder.appendString(endingString);
		},
		import: true
	});

	return MultipleMembersExpression;
}(
	// importMember
	function(member, contentBuilder, anotherBuilder){
		member.importTo(contentBuilder, anotherBuilder);
	},
	// exportMember
	function(member, contentBuilder, anotherBuilder){
		member.exportTo(contentBuilder, anotherBuilder);
	},
	// exportMemberAs
	function(member, contentBuilder, anotherBuilder){
		member.exportAsTo(contentBuilder, anotherBuilder);
	}
);

this.MemberExpression = function(){
	/**
	 * 模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function MemberExpression(context){
		Expression.call(this, context);
	};
	MemberExpression = new Rexjs(MemberExpression, Expression);

	MemberExpression.props({
		/**
		 * 以输出形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		exportAsTo: function(contentBuilder, anotherBuilder){
			// 追加属性名
			contentBuilder.appendContext(this.variable);
			// 追加属性值
			contentBuilder.appendString(':"' + this.context.content + '"');
		},
		/**
		 * 以输出形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		exportTo: function(contentBuilder, anotherBuilder){
			// 追加属性名
			contentBuilder.appendContext(this.variable);
			// 追加属性值
			contentBuilder.appendString(":" + this.context.content);
		},
		/**
		 * 以导入形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		importTo: function(contentBuilder, anotherBuilder){
			var result = anotherBuilder.result;

			// 追加成员变量赋值字符串
			contentBuilder.appendString(
				this.variable.content + "=" + 'Rexjs.Module.memberOf("' +
					this.context.content + '"' + (result.length > 0 ? "," : "") +
					result +
				")"
			);
		},
		/**
		 * 获取模块成员变量名
		 */
		get variable(){
			return this.context;
		}
	});

	return MemberExpression;
}();

this.MemberAliasExpression = function(MemberExpression){
	/**
	 * 模块成员别名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function MemberAliasExpression(context){
		MemberExpression.call(this, context);
	};
	MemberAliasExpression = new Rexjs(MemberAliasExpression, MemberExpression);

	MemberAliasExpression.props({
		alias: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加原名称
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 追加 as
			contentBuilder.appendContext(this.alias);
			// 追加空格
			contentBuilder.appendSpace();
			// 追加别名变量名
			contentBuilder.appendContext(this.variable);
		},
		variable: null
	});

	return MemberAliasExpression;
}(
	this.MemberExpression
);

this.MultipleMembersStatement = function(out){
	/**
	 * 模板语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function MultipleMembersStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	MultipleMembersStatement = new Rexjs(MultipleMembersStatement, ECMAScriptStatement);

	MultipleMembersStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			out(parser, this, true);
			return this.bindingOf();
		},
		collectVariables: true,
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			out(parser, this, false);
			return this.tagOf().separator;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.members.latest.open.tag;
		}
	});

	return MultipleMembersStatement;
}(
	// out
	function(parser, statement, fromCatch){
		var expression = statement.expression, importExpression = statement.out(), inner = importExpression.members.latest.inner;

		// 如果来自 catch 方法
		if(fromCatch){
			// 如果设置失败，则说明 expression 是默认表达式
			if(!inner.set(expression)){
				return;
			}
		}
		else {
			// 添加表达式
			inner.add(expression);
		}

		// 收集变量名
		importExpression.context.tag.collectVariables(parser, expression.variable);
	}
);

this.OpenMultipleMembersTag = function(OpenBraceTag, MultipleMembersExpression, MultipleMembersStatement){
	/**
	 * 多成员导入起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenMultipleMembersTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenMultipleMembersTag = new Rexjs(OpenMultipleMembersTag, OpenBraceTag);

	OpenMultipleMembersTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeMultipleMembersTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return multipleMembersSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加成员
			statement.expression.members.add(
				new MultipleMembersExpression(context)
			);

			// 设置当前语句
			statements.statement = new MultipleMembersStatement(statements);
		}
	});

	return OpenMultipleMembersTag;
}(
	this.OpenBraceTag,
	this.MultipleMembersExpression,
	this.MultipleMembersStatement
);

this.MemberVariableTag = function(ConstVariableTag, MemberExpression){
	/**
	 * 模块成员变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberVariableTag(_type){
		ConstVariableTag.call(this, _type);
	};
	MemberVariableTag = new Rexjs(MemberVariableTag, ConstVariableTag);

	MemberVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 import 表达式的 clean 属性
			statement.target.expression.clean = false;
			// 设置当前表达式
			statement.expression = new MemberExpression(context);
		}
	});
	
	return MemberVariableTag;
}(
	this.ConstVariableTag,
	this.MemberExpression
);

this.MemberAliasVariableTag = function(MemberVariableTag){
	/**
	 * 模块成员变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberAliasVariableTag(_type){
		MemberVariableTag.call(this, _type);
	};
	MemberAliasVariableTag = new Rexjs(MemberAliasVariableTag, MemberVariableTag);

	MemberAliasVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 MemberAliasExpression 表达式的 variable 属性
			statement.expression.variable = context;
		}
	});
	
	return MemberAliasVariableTag;
}(
	this.MemberVariableTag
);

this.MemberAliasTag = function(AsTag, MemberAliasExpression){
	/**
	 * 模块成员标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberAliasTag(_type){
		AsTag.call(this, _type);
	};
	MemberAliasTag = new Rexjs(MemberAliasTag, AsTag);

	MemberAliasTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberAliasVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 设置当前表达式
				statement.expression = new MemberAliasExpression(statement.expression.context)
			)
			// 设置 alias 属性
			.alias = context;
		}
	});

	return MemberAliasTag;
}(
	this.AsTag,
	this.MemberAliasExpression
);

this.MultipleMembersSeparatorTag = function(MemberSeparatorTag, MultipleMembersStatement){
	/**
	 * 多成员导入分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function MultipleMembersSeparatorTag(_type){
		MemberSeparatorTag.call(this, _type);
	};
	MultipleMembersSeparatorTag = new Rexjs(MultipleMembersSeparatorTag, MemberSeparatorTag);

	MultipleMembersSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new MultipleMembersStatement(statements);
		}
	});

	return MultipleMembersSeparatorTag;
}(
	this.MemberSeparatorTag,
	this.MultipleMembersStatement
);

this.CloseMultipleMembersTag = function(CloseBraceTag){
	/**
	 * 多成员导入结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseMultipleMembersTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseMultipleMembersTag = new Rexjs(CloseMultipleMembersTag, CloseBraceTag);

	CloseMultipleMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 MultipleMembersExpression 的 close 属性
			statement.expression.members.latest.close = context;
		}
	});

	return CloseMultipleMembersTag;
}(
	this.CloseBraceTag
);

multipleMembersSeparatorTag = new this.MultipleMembersSeparatorTag();
closeMultipleMembersTag = new this.CloseMultipleMembersTag();

}.call(
	this,
	// multipleMembersSeparatorTag
	null,
	// closeMultipleMembersTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/import-multiple.js"
								);


eval(
									function(){
										// 模块默认成员标签相关
~function(){

this.DefaultMemberExpression = function(MemberExpression){
	/**
	 * 模块默认成员导入表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultMemberExpression(context){
		MemberExpression.call(this, context);
	};
	DefaultMemberExpression = new Rexjs(DefaultMemberExpression, MemberExpression);

	DefaultMemberExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加成员变量赋值字符串
			contentBuilder.appendString(
				this.context.content + "=Rexjs.Module.defaultOf(" + anotherBuilder.result + ")"
			);
		}
	});

	return DefaultMemberExpression;
}(
	this.MemberExpression
);

this.DefaultMemberTag = function(MemberVariableTag, DefaultMemberExpression){
	/**
	 * 模块默认成员标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultMemberTag(_type){
		MemberVariableTag.call(this, _type);
	};
	DefaultMemberTag = new Rexjs(DefaultMemberTag, MemberVariableTag);

	DefaultMemberTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var importExpression = statement.expression;

			// 收集变量名
			this.collectTo(parser, context, statements);

			// 向 import 表达式的添加成员
			importExpression.members.add(
				new DefaultMemberExpression(context)
			);

			// 设置 clean 属性为 false，表示有变量名导入
			importExpression.clean = false;
		}
	});

	return DefaultMemberTag;
}(
	this.MemberVariableTag,
	this.DefaultMemberExpression
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/import-default.js"
								);


eval(
									function(){
										// 所有模块成员表达式相关
~function(){

this.AllMembersExpression = function(MemberAliasExpression){
	/**
	 * 所有模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AllMembersExpression(context){
		MemberAliasExpression.call(this, context);
	};
	AllMembersExpression = new Rexjs(AllMembersExpression, MemberAliasExpression);

	AllMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			contentBuilder.appendString(
				this.variable.content + "=Rexjs.Module.moduleOf(" + anotherBuilder.result + ")"
			);
		}
	});

	return AllMembersExpression;
}(
	this.MemberAliasExpression
);

this.AllMembersTag = function(AllMembersExpression){
	/**
	 * 所有成员符号标签
	 * @param {Number} _type - 标签类型
	 */
	function AllMembersTag(_type){
		SyntaxTag.call(this, _type);
	};
	AllMembersTag = new Rexjs(AllMembersTag, SyntaxTag);

	AllMembersTag.props({
		regexp: /\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleAliasTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var importExpression = statement.expression;

			// 向 import 表达式添加成员
			importExpression.members.add(
				new AllMembersExpression(context)
			);
			
			// 设置 clean 属性为 false，表示有变量名导入
			importExpression.clean = false;
		}
	});

	return AllMembersTag;
}(
	this.AllMembersExpression
);

this.ModuleAliasTag = function(AsTag){
	/**
	 * 模块别名标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleAliasTag(_type){
		AsTag.call(this, _type);
	};
	ModuleAliasTag = new Rexjs(ModuleAliasTag, AsTag);

	ModuleAliasTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 AllMembersExpression 表达式的 alias 属性
			statement.expression.members.latest.alias = context;
		}
	});

	return ModuleAliasTag;
}(
	this.AsTag
);

this.ModuleVariableTag = function(ConstVariableTag){
	/**
	 * 模块变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleVariableTag(_type){
		ConstVariableTag.call(this, _type);
	};
	ModuleVariableTag = new Rexjs(ModuleVariableTag, ConstVariableTag);

	ModuleVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);

			// 设置 AllMembersExpression 表达式的 variable 属性
			statement.expression.members.latest.variable = context;
		}
	});

	return ModuleVariableTag;
}(
	this.ConstVariableTag
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/import-all.js"
								);


eval(
									function(){
										// export 标签相关
~function(ModuleTag, VarExpression, FunctionDeclarationExpression, ClassDeclarationExpression, exportVariable){

this.ExportExpression = function(config, compile){
	/**
	 * export 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function ExportExpression(context, file){
		Expression.call(this, context);

		this.file = file;
	};
	ExportExpression = new Rexjs(ExportExpression, Expression);

	ExportExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var from = this.from;

			// 如果需要解析 export
			if(config.value){
				// 编译成员
				compile(this.member, this.from, this.name, this.file, contentBuilder);
				return;
			}

			// 追加 export 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 提取成员
			this.member.extractTo(contentBuilder);

			// 如果有 from
			if(from){
				// 追加空格
				contentBuilder.appendSpace();
				// 追加 from 上下文
				contentBuilder.appendContext(from);
				// 追加空格
				contentBuilder.appendSpace();
				// 追加模块名称
				contentBuilder.appendContext(this.name);
			}
		},
		file: null,
		member: null,
		name: null
	});

	return ExportExpression;
}(
	// config
	ECMAScriptConfig.addModuleConfig("export"),
	// compile
	function(member, from, name, file, contentBuilder){
		// 初始化内容生成器
		var anotherBuilder = new ContentBuilder();

		// 如果有 from
		if(from){
			// 追加模块名称
			anotherBuilder.appendString(name.content + ',"' + file.filename + '"');
		}

		// 先编译成员
		member.compileTo(contentBuilder, anotherBuilder);

		switch(true){
			// 如果是 var、let、const 表达式
			case member instanceof VarExpression:
				// 遍历所定义的变量并输出
				member.range.forEach(exportVariable, contentBuilder);
				return;

			// 如果是函数声明
			case member instanceof FunctionDeclarationExpression:
			// 如果是类声明
			case member instanceof ClassDeclarationExpression:
				// 输出表达式名称变量
				exportVariable(member.name.context.content, contentBuilder, true);
				return;
		}
	}
);

this.ExportStatement = function(){
	/**
	 * export 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ExportStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ExportStatement = new Rexjs(ExportStatement, ECMAScriptStatement);

	ExportStatement.props({
		allowFrom: false,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 member
			this.out().member = this.expression;

			// 如果是 from 且 该语句上下文中允许 from 出现
			return context.content === "from" && this.allowFrom ? this.bindingOf() : null;
		}
	});

	return ExportStatement;
}();

this.ExportTag = function(ExportExpression, ExportStatement, fromTag, visitor){
	/**
	 * export 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ExportTag(_type){
		ModuleTag.call(this, _type);
	};
	ExportTag = new Rexjs(ExportTag, ModuleTag);

	ExportTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return fromTag;
		},
		/**
		 * 收集该表达式所产生的变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} variable - 变量名标签上下文
		 */
		collectVariables: function(){},
		regexp: /export/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.exportContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 先调用父类方法，进行环境上下文检测
			visitor.call(this, parser, context, statement, statements);

			// 设置当前表达式
			statement.expression = new ExportExpression(context, parser.file);
			// 设置当前语句
			statements.statement = new ExportStatement(statements);
		}
	});

	return ExportTag;
}(
	this.ExportExpression,
	this.ExportStatement,
	// fromTag
	new this.FromTag(),
	ModuleTag.prototype.visitor
);

}.call(
	this,
	this.ModuleTag,
	this.VarExpression,
	this.FunctionDeclarationExpression,
	this.ClassDeclarationExpression,
	// exportVariable
	function(variable, contentBuilder, _semicolonAfter){
		var str = 'Rexjs.Module.export("' + variable + '", ' + variable + ")";

		// 如果需要语句后面加分号
		if(_semicolonAfter){
			str += ";";
		}
		// 否则之前加分号
		else {
			str = ";" + str;
		}

		// 追加输出字符串
		contentBuilder.appendString(str);
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/export.js"
								);


eval(
									function(){
										// export default 标签相关
~function(){

this.DefaultExportExpression = function(ExportExpression){
	/**
	 * 模块默认输出表达式
	 * @param {Context} context - 标签上下文
	 */
	function DefaultExportExpression(context){
		ExportExpression.call(this, context, null);
	};
	DefaultExportExpression = new Rexjs(DefaultExportExpression, ExportExpression);

	DefaultExportExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 default 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 提取成员
			this.member.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加提取方法
			contentBuilder.appendString('Rexjs.Module.export("default",');
			// 提取成员
			this.member.extractTo(contentBuilder);
			// 追加提取方法结束小括号
			contentBuilder.appendString(")");
		}
	});

	return DefaultExportExpression;
}(
	this.ExportExpression
);

this.DefaultExportStatement = function(){
	/**
	 * 模块默认输出语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DefaultExportStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DefaultExportStatement = new Rexjs(DefaultExportStatement, ECMAScriptStatement);

	DefaultExportStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出当前语句并设置 member 属性
			this.out().member = this.expression;
		}
	});

	return DefaultExportStatement;
}();

this.DefaultExportTag = function(DefaultTag, DefaultExportExpression, DefaultExportStatement){
	/**
	 * 模块默认输出标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultExportTag(_type){
		DefaultTag.call(this, _type);
	};
	DefaultExportTag = new Rexjs(DefaultExportTag, DefaultTag);

	DefaultExportTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果已经输出过默认成员
			if(parser.defaultExported){
				parser.error(context, ECMAScriptErrors.EXPORT_DEFAULT);
				return;
			}

			// 记录全局解析器属性，标识已经输出过默认成员
			parser.defaultExported = true;
			
			// 设置当前表达式
			statement.expression = new DefaultExportExpression(context);
			// 设置当前语句
			statements.statement = new DefaultExportStatement(statements);
		}
	});

	return DefaultExportTag;
}(
	this.DefaultTag,
	this.DefaultExportExpression,
	this.DefaultExportStatement
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/export-default.js"
								);


eval(
									function(){
										// 模块输出多成员表达式相关
~function(CloseMultipleMembersTag, closeExportMultipleMembersTag){

this.PseudoImportExpression = function(ImportExpression){
	/**
	 * 伪 import 表达式，用于模拟相关环境
	 * @param {Context} context - 标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function PseudoImportExpression(context, file){
		ImportExpression.call(this, context, file);
	};
	PseudoImportExpression = new Rexjs(PseudoImportExpression, ImportExpression);

	PseudoImportExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取成员
			this.members.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 解析语法时确保过，只有唯一一个，所以直接编译最近且唯一项
			this.members.latest.compileTo(contentBuilder, anotherBuilder);
		}
	});

	return PseudoImportExpression;
}(
	this.ImportExpression
);

this.OpenExportMultipleMembersTag = function(OpenMultipleMembersTag, PseudoImportExpression, MultipleMembersExpression, MultipleMembersStatement){
	/**
	 * 多成员输出起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenExportMultipleMembersTag(_type){
		OpenMultipleMembersTag.call(this, _type);
	};
	OpenExportMultipleMembersTag = new Rexjs(OpenExportMultipleMembersTag, OpenMultipleMembersTag);

	OpenExportMultipleMembersTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeExportMultipleMembersTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var multipleMembersExpression = new MultipleMembersExpression(context);

			// 告知该表达式所属语句不是导入语句
			multipleMembersExpression.import = false;

			// 设置当前表达式
			(
				statement.expression = new PseudoImportExpression(
					statement.target.expression.context,
					parser.file
				)
			)
			.members
			// 添加成员
			.add(
				multipleMembersExpression
			);

			// 设置当前语句
			statements.statement = new MultipleMembersStatement(statements);
		}
	});

	return OpenExportMultipleMembersTag;
}(
	this.OpenMultipleMembersTag,
	this.PseudoImportExpression,
	this.MultipleMembersExpression,
	this.MultipleMembersStatement
);

this.CloseExportMultipleMembersTag = function(visitor){
	/**
	 * 多成员输出结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseExportMultipleMembersTag(_type){
		CloseMultipleMembersTag.call(this, _type);
	};
	CloseExportMultipleMembersTag = new Rexjs(CloseExportMultipleMembersTag, CloseMultipleMembersTag);

	CloseExportMultipleMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置语句允许出现 from
			statement.allowFrom = true;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseExportMultipleMembersTag;
}(
	CloseMultipleMembersTag.prototype.visitor
);

closeExportMultipleMembersTag = new this.CloseExportMultipleMembersTag();

}.call(
	this,
	this.CloseMultipleMembersTag,
	// closeExportMultipleMembersTag
	null
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/export-multiple.js"
								);


eval(
									function(){
										// 输出所有成员符号标签相关
~function(){

this.ExportAllMembersExpression = function(){
	/**
	 * 输出所有模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ExportAllMembersExpression(context){
		Expression.call(this, context);
	};
	ExportAllMembersExpression = new Rexjs(ExportAllMembersExpression, Expression);

	ExportAllMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加输出字符串
			contentBuilder.appendString(
				"Rexjs.Module.exportFrom(" + anotherBuilder.result + ")"
			);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 * 上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return ExportAllMembersExpression;
}();

this.ExportAllMembersTag = function(AllMembersTag, ExportAllMembersExpression){
	/**
	 * 输出所有成员符号标签
	 * @param {Number} _type - 标签类型
	 */
	function ExportAllMembersTag(_type){
		AllMembersTag.call(this, _type);
	};
	ExportAllMembersTag = new Rexjs(ExportAllMembersTag, AllMembersTag);

	ExportAllMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.unexpectedTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ExportAllMembersExpression(context);
			// 设置 allowFrom 属性，表示检测到 from 是属于正常语句部分
			statement.allowFrom = true;
		}
	});

	return ExportAllMembersTag;
}(
	this.AllMembersTag,
	this.ExportAllMembersExpression
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/export-all.js"
								);


eval(
									function(){
										// 解构赋值表达式相关
~function(BinaryExpression, ArrayExpression, ObjectExpression, BasicAssignmentTag, config){

this.DestructuringAssignmentExpression = function(extractTo){
	/**
	 * 解构赋值表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 左侧表达式
	 */
	function DestructuringAssignmentExpression(context, left){
		BinaryExpression.call(this, context, left);
	};
	DestructuringAssignmentExpression = new Rexjs(DestructuringAssignmentExpression, BinaryExpression);

	DestructuringAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译解构赋值
			if(config.value){
				var variable = this.variable, left = this.left, builder = new ContentBuilder();

				// 用新的生成器记录临时变量名
				builder.appendString(variable);

				// 如果是声明形式的解构赋值
				if(left.origin.declaration){
					// 追加变量名
					contentBuilder.appendString(variable);
					// 追加等于号上下文
					contentBuilder.appendContext(this.context);
					// 提取右侧表达式
					this.right.extractTo(contentBuilder);
					// 提取并编译表达式文本内容
					left.compileTo(contentBuilder, builder);
					return;
				}

				// 起始小括号与追加变量名
				contentBuilder.appendString("(" + variable);
				// 追加等于号上下文
				contentBuilder.appendContext(this.context);
				// 提取右侧表达式
				this.right.extractTo(contentBuilder);
				// 提取并编译表达式文本内容
				left.compileTo(contentBuilder, builder);
				// 追加逗号与变量名及结束小括号
				contentBuilder.appendString("," + variable + ")");
				return;
			}

			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});

	return DestructuringAssignmentExpression;
}(
	BinaryExpression.prototype.extractTo
);

this.DestructuringAssignmentTag = function(DestructuringAssignmentExpression, visitor, destructible, setVariable){
	/**
	 * 解构赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function DestructuringAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DestructuringAssignmentTag = new Rexjs(DestructuringAssignmentTag, BasicAssignmentTag);

	DestructuringAssignmentTag.props({
		// 防止与 BasicAssignmentTag 冲突
		order: ECMAScriptOrders.DESTRUCTURING_ASSIGNMENT,
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new DestructuringAssignmentExpression(context, left);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 如果是二元表达式
			if(expression instanceof BinaryExpression){
				var last = expression.last, right = last.right;

				// 判断最后一个二元表达式的右侧表达式是否满足解构条件
				if(destructible(right)){
					// 重新设置右侧表达式为解构表达式
					last.right = right.toDestructuring(parser);
				}
			}
			// 判断当前表达式的右侧表达式是否满足解构条件
			else if(destructible(expression)){
				// 重新当前表达式为解构表达式
				statement.expression = expression.toDestructuring(parser);
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 如果需要解析解构赋值
			if(config.value){
				// 给刚生成的解构赋值表达式设置变量名
				setVariable(statement.expression.last, statements.collections);
			}
		}
	});

	return DestructuringAssignmentTag;
}(
	this.DestructuringAssignmentExpression,
	BasicAssignmentTag.prototype.visitor,
	// destructible
	function(expression){
		return expression instanceof ArrayExpression || expression instanceof ObjectExpression;
	},
	// setVariable
	function(destructuringAssignmentExpression, collections){
		// 给刚生成的解构赋值表达式设置变量名
		destructuringAssignmentExpression.variable = (
			// 如果是声明形式的解构赋值
			destructuringAssignmentExpression.left.origin.declaration ?
				// 只需提供，不用在语句块进行定义
				collections.provide() :
				// 需要提供并定义
				collections.generate()
		);
	}
);

}.call(
	this,
	this.BinaryExpression,
	this.ArrayExpression,
	this.ObjectExpression,
	this.BasicAssignmentTag,
	// config
	ECMAScriptConfig.destructuring
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/destructuring-assginment.js"
								);


eval(
									function(){
										// 辅助性的标签列表相关
~function(SyntaxTags){

this.OnlyStatementEndTags = function(LastStatementEndTag, StatementBreakTag, StatementEndTag){
	/**
	 * 只有语句结束符的标签列表
	 */
	function OnlyStatementEndTags(){
		SyntaxTags.call(this);

		this.register(
			new LastStatementEndTag(),
			new StatementBreakTag(),
			new StatementEndTag()
		);
	};
	OnlyStatementEndTags = new Rexjs(OnlyStatementEndTags, SyntaxTags);

	return OnlyStatementEndTags;
}(
	this.LastStatementEndTag,
	this.StatementBreakTag,
	this.StatementEndTag
);

}.call(
	this,
	Rexjs.SyntaxTags
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/tags-helper.js"
								);


eval(
									function(){
										// ECMAScript 标签列表相关
~function(){

this.ECMAScriptTags = function(DefaultTags, list){
	/**
	 * ECMAScript 标签列表
	 * @param {Number} _type - 该标签列表中，所有标签的初始化类型
	 */
	function ECMAScriptTags(_type){
		DefaultTags.call(this);

		// 注册标签
		this.delegate(list, _type || TYPE_UNEXPECTED);
	};
	ECMAScriptTags = new Rexjs(ECMAScriptTags, DefaultTags);
	
	return ECMAScriptTags;
}(
	Rexjs.DefaultTags,
	// list
	[
		this.ArrowTag,
		this.BasicAssignmentTag,
		this.BinaryNumberTag,
		this.BitwiseANDTag,
		this.BitwiseNOTTag,
		this.BitwiseORTag,
		this.BitwiseXORTag,
		this.BooleanTag,
		this.BreakTag,
		this.CaseTag,
		this.CatchTag,
		this.ClassDeclarationTag,
		this.CloseBraceTag,
		this.CloseBracketTag,
		this.CloseParenTag,
		this.ColonTag,
		this.CommaTag,
		this.ConstTag,
		this.ContinueTag,
		this.DebuggerTag,
		this.DefaultTag,
		this.DecrementTag,
		this.DeleteTag,
		this.DivisionTag,
		this.DoTag,
		this.DotTag,
		this.ElseTag,
		this.EmptyStatementTag,
		this.EqualityTag,
		this.ExponentiationTag,
		this.ExportTag,
		this.ExtendsTag,
		this.FileEndTag,
		this.FinallyTag,
		this.ForTag,
		this.FunctionDeclarationTag,
		this.GreaterThanOrEqualTag,
		this.GreaterThanTag,
		this.IdentityTag,
		this.IfTag,
		this.ImportTag,
		this.InTag,
		this.IncrementTag,
		this.InequalityTag,
		this.InstanceofTag,
		this.LabelTag,
		this.LeftShiftTag,
		this.LessThanOrEqualTag,
		this.LessThanTag,
		this.LetTag,
		this.LogicalANDTag,
		this.LogicalNOTTag,
		this.LogicalORTag,
		this.MultiplicationTag,
		this.NegationTag,
		this.NewTag,
		this.NonidentityTag,
		this.NullTag,
		this.NumberTag,
		this.OctalNumberTag,
		this.OpenArrayTag,
		this.OpenBlockTag,
		this.OpenGroupingTag,
		this.OpenMultiLineCommentTag,
		this.OpenTemplateTag,
		this.PlusTag,
		this.QuestionTag,
		this.RegExpTag,
		this.RemainderTag,
		this.ReturnTag,
		this.RightShiftTag,
		this.ShorthandAssignmentTag,
		this.SingleLineCommentTag,
		this.SpreadTag,
		this.StaticTag,
		this.StringTag,
		this.SuperTag,
		this.SwitchTag,
		this.ThisTag,
		this.ThrowTag,
		this.TryTag,
		this.TypeofTag,
		this.VarTag,
		this.VoidTag,
		this.WhileTag,
		this.WithTag
	]
);
	
}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-tags.js"
								);


eval(
									function(){
										// 基类标签列表相关
~function(ECMAScriptTags, OnlyStatementEndTags){

this.ExpressionTags = function(list){
	/**
	 * 表达式标签列表
	 */
	function ExpressionTags(){
		ECMAScriptTags.call(this);
		
		this.delegate(list);
	};
	ExpressionTags = new Rexjs(ExpressionTags, ECMAScriptTags);
	
	ExpressionTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是表达式标签
			if(tag.class.expression){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		}
	});
	
	return ExpressionTags;
}(
	// list
	[
		this.ClassTag,
		this.FunctionTag,
		this.OpenObjectTag,
		this.TryFunctionTag,
		this.VariableTag
	]
);

this.ExpressionContextTags = function(list){
	/**
	 * 表达式上下文标签列表
	 */
	function ExpressionContextTags(){
		ECMAScriptTags.call(this);

		this.delegate(list);
	};
	ExpressionContextTags = new Rexjs(ExpressionContextTags, ECMAScriptTags);
	
	ExpressionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			var tagClass = tag.class;

			switch(true){
				// 如果是表达式上下文标签
				case tagClass.expressionContext:
				// 如果是语句标签
				case tagClass.statementBegin:
					// 重新绑定类型
					tag.type = new TagType(TYPE_MISTAKABLE);
					break;
			}

			return false;
		}
	});
	
	return ExpressionContextTags;
}(
	// list
	[
		this.AdditionTag,
		this.DotAccessorTag,
		this.ExpressionBreakTag,
		this.OnlyStatementEndTags,
		this.OpenBracketAccessorTag,
		this.OpenCallTag,
		this.OpenRestrictedCommentTag,
		this.PostfixDecrementTag,
		this.PostfixIncrementTag,
		this.SubtractionTag,
		this.OpenTemplateParameterTag
	]
);

this.StatementTags = function(FileEndTag){
	/**
	 * 语句标签列表
	 */
	function StatementTags(){
		ECMAScriptTags.call(this);
	};
	StatementTags = new Rexjs(StatementTags, ECMAScriptTags);
	
	StatementTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(tag.class.statementBegin){
				// 设置标签类型
				tag.type = new TagType(
					tag instanceof FileEndTag ? TYPE_MISTAKABLE : TYPE_MATCHABLE
				);
			}
			
			return false;
		}
	});
	
	return StatementTags;
}(
	this.FileEndTag
);

this.StatementEndTags = function(){
	/**
	 * 语句结束标签列表
	 */
	function StatementEndTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new OnlyStatementEndTags()
		);
	};
	StatementEndTags = new Rexjs(StatementEndTags, ECMAScriptTags);
	
	return StatementEndTags;
}();

this.MistakableTags = function(StatementTags){
	/**
	 * 可能被误解的标签列表
	 */
	function MistakableTags(){
		StatementTags.call(this);
	};
	MistakableTags = new Rexjs(MistakableTags, StatementTags);
	
	MistakableTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(tag.class.statementBegin){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
			}
			
			return false;
		}
	});
	
	return MistakableTags;
}(
	this.StatementTags
);

this.IllegalTags = function(){
	/**
	 * 非法标签列表
	 */
	function IllegalTags(){
		ECMAScriptTags.call(this, TYPE_ILLEGAL);
	};
	IllegalTags = new Rexjs(IllegalTags, ECMAScriptTags);

	return IllegalTags;
}();

}.call(
	this,
	this.ECMAScriptTags,
	this.OnlyStatementEndTags
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/tags-base.js"
								);


eval(
									function(){
										// 其他标签列表
~function(ECMAScriptTags, ExpressionTags, ExpressionContextTags, MistakableTags, StatementTags, StatementEndTags, IllegalTags){

this.ArgumentNameContextTags = function(ArgumentAssignmentTag){
	/**
	 * 参数名上下文标签列表
	 */
	function ArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new ArgumentAssignmentTag()
		);
	};
	ArgumentNameContextTags = new Rexjs(ArgumentNameContextTags, ECMAScriptTags);

	return ArgumentNameContextTags;
}(
	this.ArgumentAssignmentTag
);

this.ArgumentSeparatorContextTags = function(ArgumentNameTag, RestTag){
	/**
	 * 参数分隔符上下文标签列表
	 */
	function ArgumentSeparatorContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ArgumentNameTag(),
			new RestTag()
		);
	};
	ArgumentSeparatorContextTags = new Rexjs(ArgumentSeparatorContextTags, IllegalTags);

	return ArgumentSeparatorContextTags;
}(
	this.ArgumentNameTag,
	this.RestTag
);

this.ArrowContextTags = function(OpenArrowFunctionBodyTag){
	/**
	 * 箭头上下文标签
	 */
	function ArrowContextTags(){
		ExpressionTags.call(this);

		this.register(
			new OpenArrowFunctionBodyTag()
		);
	};
	ArrowContextTags = new Rexjs(ArrowContextTags, ExpressionTags);

	return ArrowContextTags;
}(
	this.OpenArrowFunctionBodyTag
);


this.BlockTags = function(OpenBlockTag){
	/**
	 * 语句块标签列表
	 */
	function BlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenBlockTag()
		);
	};
	BlockTags = new Rexjs(BlockTags, IllegalTags);

	return BlockTags;
}(
	this.OpenBlockTag
);

this.CatchedExceptionTags = function(OpenCatchedExceptionTag){
	/**
	 * 被捕获的异常标签列表
	 */
	function CatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenCatchedExceptionTag()
		);
	};
	CatchedExceptionTags = new Rexjs(CatchedExceptionTags, IllegalTags);
	
	return CatchedExceptionTags;
}(
	this.OpenCatchedExceptionTag
);

this.ClassContextTags = function(ClassNameTag, ExtendsTag, OpenClassBodyTag){
	/**
	 * 类关键字上下文标签列表
	 */
	function ClassContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ClassNameTag(),
			new ExtendsTag(),
			new OpenClassBodyTag()
		);
	};
	ClassContextTags = new Rexjs(ClassContextTags, IllegalTags);

	return ClassContextTags;
}(
	this.ClassNameTag,
	this.ExtendsTag,
	this.OpenClassBodyTag
);

this.ClassNameContextTags = function(ExtendsTag, OpenClassBodyTag){
	/**
	 * 类关键字上下文标签列表
	 */
	function ClassNameContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ExtendsTag(),
			new OpenClassBodyTag()
		);
	};
	ClassNameContextTags = new Rexjs(ClassNameContextTags, IllegalTags);

	return ClassNameContextTags;
}(
	this.ExtendsTag,
	this.OpenClassBodyTag
);

this.ClassVariableTags = function(ClassVariableTag){
	/**
	 * 类变量标签列表
	 */
	function ClassVariableTags(){
		IllegalTags.call(this);

		this.register(
			new ClassVariableTag()
		);
	};
	ClassVariableTags = new Rexjs(ClassVariableTags, IllegalTags);

	return ClassVariableTags;
}(
	this.ClassVariableTag
);

this.CloseArrowFunctionBodyContextTags = function(CommaTag, filter){
	/**
	 * 结束箭头函数主体上下文标签列表
	 */
	function CloseArrowFunctionBodyContextTags(){
		MistakableTags.call(this);
	};
	CloseArrowFunctionBodyContextTags = new Rexjs(CloseArrowFunctionBodyContextTags, MistakableTags);
	
	CloseArrowFunctionBodyContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是逗号
			if(tag instanceof CommaTag){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
				return false;
			}

			return filter.call(this, tag);
		}
	});

	return CloseArrowFunctionBodyContextTags;
}(
	this.CommaTag,
	MistakableTags.prototype.filter
);

this.CloseCatchedExceptionTags = function(CloseCatchedExceptionTag){
	/**
	 * 被捕获的异常结束标签标签列表
	 */
	function CloseCatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new CloseCatchedExceptionTag()
		);
	};
	CloseCatchedExceptionTags = new Rexjs(CloseCatchedExceptionTags, IllegalTags);
	
	return CloseCatchedExceptionTags;
}(
	this.CloseCatchedExceptionTag
);

this.ClosureVariableContextTags = function(BasicAssignmentTag, IllegalShorthandAssignmentTag){
	/**
	 * 闭包内变量上下文标签列表
	 */
	function ClosureVariableContextTags(){
		StatementEndTags.call(this);

		this.register(
			new IllegalShorthandAssignmentTag()
		);
	};
	ClosureVariableContextTags = new Rexjs(ClosureVariableContextTags, StatementEndTags);

	ClosureVariableContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是赋值标签
			if(tag instanceof BasicAssignmentTag){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		}
	})
	
	return ClosureVariableContextTags;
}(
	this.BasicAssignmentTag,
	this.IllegalShorthandAssignmentTag
);

this.VariableDeclarationTags = function(OpenDeclarationArrayTag, OpenDeclarationObjectTag){
	/**
	 * 变量声明标签列表
	 */
	function VariableDeclarationTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenDeclarationArrayTag(),
			new OpenDeclarationObjectTag()
		);
	};
	VariableDeclarationTags = new Rexjs(VariableDeclarationTags, IllegalTags);

	return VariableDeclarationTags;
}(
	this.OpenDeclarationArrayTag,
	this.OpenDeclarationObjectTag
);

this.ConstContextTags = function(VariableDeclarationTags, ConstVariableTag){
	/**
	 * const 关键字上下文标签列表
	 */
	function ConstContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new ConstVariableTag()
		);
	};
	ConstContextTags = new Rexjs(ConstContextTags, VariableDeclarationTags);

	return ConstContextTags;
}(
	this.VariableDeclarationTags,
	this.ConstVariableTag
);

this.ConstructorArgumentsTags = function(OpenConstructorArgumentsTag){
	/**
	 * 类的构造函数参数标签列表
	 */
	function ConstructorArgumentsTags(){
		IllegalTags.call(this);

		this.register(
			new OpenConstructorArgumentsTag()
		);
	};
	ConstructorArgumentsTags = new Rexjs(ConstructorArgumentsTags, IllegalTags);

	return ConstructorArgumentsTags;
}(
	this.OpenConstructorArgumentsTag
);

this.ConstructorBodyTags = function(OpenConstructorBodyTag){
	/**
	 * 类的构造函数主体标签列表
	 */
	function ConstructorBodyTags(){
		IllegalTags.call(this);

		this.register(
			new OpenConstructorBodyTag()
		);
	};
	ConstructorBodyTags = new Rexjs(ConstructorBodyTags, IllegalTags);

	return ConstructorBodyTags;
}(
	this.OpenConstructorBodyTag
);

this.DeclarationArrayItemSeparatorTags = function(DeclarationArrayItemSeparatorTag, CloseDeclarationArrayTag){
	/**
	 * 变量声明数组项分隔符列表
	 */
	function DeclarationArrayItemSeparatorTags(){
		IllegalTags.call(this);
		
		this.register(
			new DeclarationArrayItemSeparatorTag(),
			new CloseDeclarationArrayTag()
		);
	};
	DeclarationArrayItemSeparatorTags = new Rexjs(DeclarationArrayItemSeparatorTags, IllegalTags);

	return DeclarationArrayItemSeparatorTags; 
}(
	this.DeclarationArrayItemSeparatorTag,
	this.CloseDeclarationArrayTag
);

this.DeclarationArrayItemContextTags = function(DeclarationArrayItemSeparatorTags, DeclarationArrayItemAssignmentTag){
	/**
	 * 变量声明数组项上下文标签列表
	 */
	function DeclarationArrayItemContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);
		
		this.register(
			new DeclarationArrayItemAssignmentTag()
		);
	};
	DeclarationArrayItemContextTags = new Rexjs(DeclarationArrayItemContextTags, DeclarationArrayItemSeparatorTags);

	return DeclarationArrayItemContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	this.DeclarationArrayItemAssignmentTag
);

this.DeclarationArrayRestItemContextTags = function(DeclarationArrayItemSeparatorTags, DeclarationArrayRestItemSeparatorTag, DeclarationArrayItemSeparatorTag){
	/**
	 * 变量声明数组省略项上下文标签列表
	 */
	function DeclarationArrayRestItemContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);
		
		this.register(
			new DeclarationArrayRestItemSeparatorTag()
		);
	};
	DeclarationArrayRestItemContextTags = new Rexjs(DeclarationArrayRestItemContextTags, DeclarationArrayItemSeparatorTags);

	return DeclarationArrayRestItemContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	this.DeclarationArrayRestItemSeparatorTag,
	this.DeclarationArrayItemSeparatorTag
);

this.DeclarationArrayRestItemTags = function(DeclarationArrayRestItemTag){
	/**
	 * 变量声明数组省略项标签列表
	 */
	function DeclarationArrayRestItemTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationArrayRestItemTag()
		);
	};
	DeclarationArrayRestItemTags = new Rexjs(DeclarationArrayRestItemTags, IllegalTags);

	return DeclarationArrayRestItemTags; 
}(
	this.DeclarationArrayRestItemTag
);

this.DeclarationPropertyNameSeparatorTags = function(DeclarationPropertyNameSeparatorTag){
	/**
	 * 变量声明属性名分隔符标签列表
	 */
	function DeclarationPropertyNameSeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyNameSeparatorTag()
		);
	};
	DeclarationPropertyNameSeparatorTags = new Rexjs(DeclarationPropertyNameSeparatorTags, IllegalTags);

	return DeclarationPropertyNameSeparatorTags; 
}(
	this.DeclarationPropertyNameSeparatorTag
);

this.DeclarationPropertyNameTags = function(list){
	/**
	 * 变量声明属性名标签列表
	 */
	function DeclarationPropertyNameTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	DeclarationPropertyNameTags = new Rexjs(DeclarationPropertyNameTags, IllegalTags);

	return DeclarationPropertyNameTags; 
}(
	// list
	[
		this.IdentifierDeclarationPropertyNameTag,
		this.NumberDeclarationPropertyNameTag,
		this.BinaryNumberDeclarationPropertyNameTag,
		this.OctalNumberDeclarationPropertyNameTag,
		this.KeywordDeclarationPropertyNameTag,
		this.StringDeclarationPropertyNameTag,
		this.OpenComputedDeclarationPropertyNameTag,
		this.CloseDeclarationObjectTag
	]
);

this.DeclarationPropertySeparatorTags = function(DeclarationPropertySeparatorTag, CloseDeclarationObjectTag){
	/**
	 * 变量声明属性分隔符标签列表
	 */
	function DeclarationPropertySeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertySeparatorTag(),
			new CloseDeclarationObjectTag(TYPE_UNEXPECTED)
		);
	};
	DeclarationPropertySeparatorTags = new Rexjs(DeclarationPropertySeparatorTags, IllegalTags);

	return DeclarationPropertySeparatorTags;
}(
	this.DeclarationPropertySeparatorTag,
	this.CloseDeclarationObjectTag
);

this.DeclarationPropertyValueContextTags = function(DeclarationPropertySeparatorTags, DeclarationPropertyValueInitializerTag){
	/**
	 * 变量声明属性值上下文标签列表
	 */
	function DeclarationPropertyValueContextTags(){
		DeclarationPropertySeparatorTags.call(this);

		this.register(
			new DeclarationPropertyValueInitializerTag()
		);
	};
	DeclarationPropertyValueContextTags = new Rexjs(DeclarationPropertyValueContextTags, DeclarationPropertySeparatorTags);

	return DeclarationPropertyValueContextTags;
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationPropertyValueInitializerTag
);

this.DeclarationPropertyValueTags = function(DeclarationPropertyValueTag, OpenArrayDeclarationPropertyValueTag, OpenObjectDeclarationPropertyValueTag){
	/**
	 * 变量声明属性值标签列表
	 */
	function DeclarationPropertyValueTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyValueTag(),
			new OpenArrayDeclarationPropertyValueTag(),
			new OpenObjectDeclarationPropertyValueTag()
		);
	};
	DeclarationPropertyValueTags = new Rexjs(DeclarationPropertyValueTags, IllegalTags);

	return DeclarationPropertyValueTags;
}(
	this.DeclarationPropertyValueTag,
	this.OpenArrayDeclarationPropertyValueTag,
	this.OpenObjectDeclarationPropertyValueTag
);

this.DestructibleExpressionContextTags = function(DestructuringAssignmentTag){
	/**
	 * 可解构表达式上下文标签列表
	 */
	function DestructibleExpressionContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new DestructuringAssignmentTag()
		);
	};
	DestructibleExpressionContextTags = new Rexjs(DestructibleExpressionContextTags, ExpressionContextTags);
	
	return DestructibleExpressionContextTags;
}(
	this.DestructuringAssignmentTag
);

this.DestructuringAssignmentTags = function(DestructuringAssignmentTag){
	/**
	 * 解构赋值标签列表
	 */
	function DestructuringAssignmentTags(){
		IllegalTags.call(this);

		this.register(
			new DestructuringAssignmentTag()
		);
	};
	DestructuringAssignmentTags = new Rexjs(DestructuringAssignmentTags, IllegalTags);

	return DestructuringAssignmentTags;
}(
	this.DestructuringAssignmentTag
);

this.DoWhileConditionTags = function(OpenDoWhileConditionTag){
	/**
	 * do while 条件标签列表
	 */
	function DoWhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenDoWhileConditionTag()
		);
	};
	DoWhileConditionTags = new Rexjs(DoWhileConditionTags, IllegalTags);
	
	return DoWhileConditionTags;
}(
	this.OpenDoWhileConditionTag
);

this.DotAccessorContextTags = function(PropertyNameTag){
	/**
	 * 点属性访问器上下文标签列表
	 */
	function DotAccessorContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new PropertyNameTag()
		);
	};
	DotAccessorContextTags = new Rexjs(DotAccessorContextTags, IllegalTags);
	
	return DotAccessorContextTags;
}(
	this.PropertyNameTag
);

this.ExceptionVariableTags = function(ExceptionVariableTag){
	/**
	 * catch 语句异常变量标签列表
	 */
	function ExceptionVariableTags(){
		IllegalTags.call(this);
		
		this.register(
			new ExceptionVariableTag()
		);
	};
	ExceptionVariableTags = new Rexjs(ExceptionVariableTags, IllegalTags);

	return ExceptionVariableTags;
}(
	this.ExceptionVariableTag
);

this.ExportContextTags = function(list){
	/**
	 * export 关键字上下文标签列表
	 */
	function ExportContextTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	ExportContextTags = new Rexjs(ExportContextTags, IllegalTags);

	return ExportContextTags;
}(
	// list
	[
		this.VarTag,
		this.LetTag,
		this.ConstTag,
		this.FunctionDeclarationTag,
		this.ClassDeclarationTag,
		this.DefaultExportTag,
		this.OpenExportMultipleMembersTag,
		this.ExportAllMembersTag
	]
);

this.ExtendsContextTags = function(UnaryTag, ExecTag, filter){
	/**
	 * extends 关键字上下文标签列表
	 */
	function ExtendsContextTags(){
		ExpressionTags.call(this);
	};
	ExtendsContextTags = new Rexjs(ExtendsContextTags, ExpressionTags);

	ExtendsContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是一元标签
			if(tag instanceof UnaryTag){
				// 如果是执行标签
				if(tag instanceof ExecTag){
					// 设置为可匹配
					tag.type = new TagType(TYPE_MATCHABLE);
				}
				
				return false;
			}
			
			return filter.call(this, tag);
		}
	});

	return ExtendsContextTags;
}(
	this.UnaryTag,
	this.ExecTag,
	ExpressionTags.prototype.filter
);

this.FileStartTags = function(FileStartTag){
	/**
	 * 文件起始标签列表
	 */
	function FileStartTags(){
		IllegalTags.call(this);
		
		this.register(
			new FileStartTag()
		);
	};
	FileStartTags = new Rexjs(FileStartTags, IllegalTags);
	
	FileStartTags.props({
		entrance: true
	});
	
	return FileStartTags;
}(
	this.FileStartTag
);

this.ForConditionTags = function(OpenForConditionTag){
	/**
	 * for 条件标签列表
	 */
	function ForConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenForConditionTag()
		);
	};
	ForConditionTags = new Rexjs(ForConditionTags, IllegalTags);

	return ForConditionTags;
}(
	this.OpenForConditionTag
);

this.ForConditionContextTags = function(VarTag, filter){
	/**
	 * for 条件上下文标签列表
	 */
	function ForConditionContextTags(){
		ExpressionTags.call(this);
	};
	ForConditionContextTags = new Rexjs(ForConditionContextTags, ExpressionTags);

	ForConditionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(tag instanceof VarTag){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
				return false;
			}

			// 调用父类方法
			return filter.call(this, tag);
		}
	});
	
	return ForConditionContextTags;
}(
	this.VarTag,
	ExpressionTags.prototype.filter
);

this.FunctionArgumentTags = function(OpenArgumentsTag){
	/**
	 * 函数参数标签列表
	 */
	function FunctionArgumentTags(){
		IllegalTags.call(this);

		this.register(
			new OpenArgumentsTag()
		);
	};
	FunctionArgumentTags = new Rexjs(FunctionArgumentTags, IllegalTags);

	return FunctionArgumentTags;
}(
	this.OpenArgumentsTag
);

this.FunctionBodyTags = function(OpenFunctionBodyTag){
	/**
	 * 函数主体标签列表
	 */
	function FunctionBodyTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenFunctionBodyTag()
		);
	};
	FunctionBodyTags = new Rexjs(FunctionBodyTags, IllegalTags);

	return FunctionBodyTags;
}(
	this.OpenFunctionBodyTag
);

this.FunctionContextTags = function(GeneratorTag, FunctionNameTag, OpenArgumentsTag){
	/**
	 * 函数关键字上下文标签列表
	 */
	function FunctionContextTags(){
		IllegalTags.call(this);
		
		this.register(
			// new GeneratorTag(),
			new FunctionNameTag(),
			new OpenArgumentsTag()
		);
	};
	FunctionContextTags = new Rexjs(FunctionContextTags, IllegalTags);

	return FunctionContextTags;
}(
	this.GeneratorTag,
	this.FunctionNameTag,
	this.OpenArgumentsTag
);

this.FunctionDeclarationContextTags = function(FunctionVariableTag){
	/**
	 * 函数声明上下文标签列表
	 */
	function FunctionDeclarationContextTags(){
		IllegalTags.call(this);

		this.register(
			new FunctionVariableTag()
		);
	};
	FunctionDeclarationContextTags = new Rexjs(FunctionDeclarationContextTags, IllegalTags);

	return FunctionDeclarationContextTags;
}(
	this.FunctionVariableTag
);

this.IfConditionTags = function(OpenIfConditionTag){
	/**
	 * if 条件标签列表
	 */
	function IfConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenIfConditionTag()
		);
	};
	IfConditionTags = new Rexjs(IfConditionTags, IllegalTags);

	return IfConditionTags;
}(
	this.OpenIfConditionTag
);

this.LabelContextTags = function(LabelColonTag){
	/**
	 * 标记标签上下文列表
	 */
	function LabelContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new LabelColonTag()
		);
	};
	LabelContextTags = new Rexjs(LabelContextTags, ExpressionContextTags);

	return LabelContextTags;
}(
	this.LabelColonTag
);

this.LetContextTags = function(VariableDeclarationTags, LocalVariableTag){
	/**
	 * let 关键字上下文标签列表
	 */
	function LetContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new LocalVariableTag()
		);
	};
	LetContextTags = new Rexjs(LetContextTags, VariableDeclarationTags);

	return LetContextTags;
}(
	this.VariableDeclarationTags,
	this.LocalVariableTag
);

this.MemberAliasVariableTags = function(MemberAliasVariableTag){
	/**
	 * 模块成员分隔符上下文标签列表
	 */
	function MemberAliasVariableTags(){
		IllegalTags.call(this);

		this.register(
			new MemberAliasVariableTag()
		);
	};
	MemberAliasVariableTags = new Rexjs(MemberAliasVariableTags, IllegalTags);

	return MemberAliasVariableTags;
}(
	this.MemberAliasVariableTag
);

this.MemberContextTags = function(MemberAliasTag, MultipleMembersSeparatorTag){
	/**
	 * 模块成员上下文标签列表
	 */
	function MemberContextTags(){
		ECMAScriptTags.call(this);

		this.register(
			new MemberAliasTag(),
			new MultipleMembersSeparatorTag()
		);
	};
	MemberContextTags = new Rexjs(MemberContextTags, ECMAScriptTags);

	return MemberContextTags;
}(
	this.MemberAliasTag,
	this.MultipleMembersSeparatorTag
);

this.MemberSeparatorContextTags = function(DefaultMemberTag, AllMembersTag, OpenMultipleMembersTag){
	/**
	 * 模块成员分隔符上下文标签列表
	 */
	function MemberSeparatorContextTags(){
		IllegalTags.call(this);

		this.register(
			new DefaultMemberTag(),
			new AllMembersTag(),
			new OpenMultipleMembersTag()
		);
	};
	MemberSeparatorContextTags = new Rexjs(MemberSeparatorContextTags, IllegalTags);

	return MemberSeparatorContextTags;
}(
	this.DefaultMemberTag,
	this.AllMembersTag,
	this.OpenMultipleMembersTag
);

this.IdentifierDeclarationPropertyNameContextTags = function(DeclarationPropertySeparatorTags, DeclarationPropertyNameInitializerTag, DeclarationPropertyNameSeparatorTag){
	/**
	 * 可声明的标识符属性名上下文标签列表
	 */
	function IdentifierDeclarationPropertyNameContextTags(){
		DeclarationPropertySeparatorTags.call(this);

		this.register(
			new DeclarationPropertyNameInitializerTag(),
			new DeclarationPropertyNameSeparatorTag()
		);
	};
	IdentifierDeclarationPropertyNameContextTags = new Rexjs(IdentifierDeclarationPropertyNameContextTags, DeclarationPropertySeparatorTags);

	return IdentifierDeclarationPropertyNameContextTags;
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationPropertyNameInitializerTag,
	this.DeclarationPropertyNameSeparatorTag
);

this.ImportContextTags = function(MemberSeparatorContextTags, ModuleNameTag){
	function ImportContextTags(){
		MemberSeparatorContextTags.call(this);

		this.register(
			new ModuleNameTag()
		);
	};
	ImportContextTags = new Rexjs(ImportContextTags, MemberSeparatorContextTags);

	return ImportContextTags;
}(
	this.MemberSeparatorContextTags,
	this.ModuleNameTag
);

this.MemberSeparatorTags = function(MemberSeparatorTag, FromTag){
	/**
	 * 模块成员分隔符标签列表
	 */
	function MemberSeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new MemberSeparatorTag(),
			new FromTag()
		);
	};
	MemberSeparatorTags = new Rexjs(MemberSeparatorTags, IllegalTags);

	return MemberSeparatorTags;
}(
	this.MemberSeparatorTag,
	this.FromTag
);

this.MemberVariableTags = function(MemberVariableTag){
	/**
	 * 模块成员标签列表
	 */
	function MemberVariableTags(){
		ECMAScriptTags.call(this);

		this.register(
			new MemberVariableTag()
		);
	};
	MemberVariableTags = new Rexjs(MemberVariableTags, ECMAScriptTags);

	return MemberVariableTags;
}(
	this.MemberVariableTag
);

this.ModuleAliasTags = function(ModuleAliasTag){
	/**
	 * as 标签列表
	 */
	function ModuleAliasTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleAliasTag()
		);
	};
	ModuleAliasTags = new Rexjs(ModuleAliasTags, IllegalTags);

	return ModuleAliasTags;
}(
	this.ModuleAliasTag
);

this.ModuleNameTags = function(ModuleNameTag){
	/**
	 * 模块名称标签列表
	 */
	function ModuleNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleNameTag()
		);
	};
	ModuleNameTags = new Rexjs(ModuleNameTags, IllegalTags);

	return ModuleNameTags;
}(
	this.ModuleNameTag
);

this.ModuleVariableTags = function(ModuleVariableTag){
	/**
	 * 模块变量名标签列表
	 */
	function ModuleVariableTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleVariableTag()
		);
	};
	ModuleVariableTags = new Rexjs(ModuleVariableTags, IllegalTags);

	return ModuleVariableTags;
}(
	this.ModuleVariableTag
);

this.NegationContextTags = function(NegationSiblingTag, DecrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function NegationContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new NegationSiblingTag(),
			new DecrementSiblingTag()
		);
	};
	NegationContextTags = new Rexjs(NegationContextTags, ExpressionTags);

	return NegationContextTags;
}(
	this.NegationSiblingTag,
	this.DecrementSiblingTag
);

this.ExecContextTags = function(ExtendsContextTags, TargetAccessorTag, SuperTag, filter){
	/**
	 * 执行函数关键字（如：new、try 等）上下文标签列表
	 */
	function ExecContextTags(){
		ExtendsContextTags.call(this);

		this.register(
			new TargetAccessorTag()
		);
	};
	ExecContextTags = new Rexjs(ExecContextTags, ExtendsContextTags);
	
	ExecContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是 super 标签，则不修改 type，因为 new 后面不能接 super 关键字
			if(tag instanceof SuperTag){
				return false;
			}

			// 调用父类方法
			filter.call(this, tag);
		}
	});
	
	return ExecContextTags;
}(
	this.ExtendsContextTags,
	this.TargetAccessorTag,
	this.SuperTag,
	this.ExtendsContextTags.prototype.filter
);

this.OpenArgumentsContextTags = function(ArgumentSeparatorContextTags, CloseArgumentsTag){
	/**
	 * 起始参数上下文标签列表
	 */
	function OpenArgumentsContextTags(){
		ArgumentSeparatorContextTags.call(this);
		
		this.register(
			new CloseArgumentsTag()
		);
	};
	OpenArgumentsContextTags = new Rexjs(OpenArgumentsContextTags, ArgumentSeparatorContextTags);

	return OpenArgumentsContextTags;
}(
	this.ArgumentSeparatorContextTags,
	this.CloseArgumentsTag
);

this.OpenArrayContextTags = function(ArraySpreadTag){
	/**
	 * 起始数组上下文标签列表
	 */
	function OpenArrayContextTags(){
		ExpressionTags.call(this);

		this.register(
			new ArraySpreadTag()
		);
	};
	OpenArrayContextTags = new Rexjs(OpenArrayContextTags, ExpressionTags);

	return OpenArrayContextTags;
}(
	this.ArraySpreadTag
);

this.OpenMultiLineCommentContextTags = function(CommentContentTag, CloseMultiLineCommentTag){
	/**
	 * 起始多行注释上下文标签列表
	 */
	function OpenMultiLineCommentContextTags(){
		IllegalTags.call(this);

		this.register(
			new CommentContentTag(),
			new CloseMultiLineCommentTag()
		);
	};
	OpenMultiLineCommentContextTags = new Rexjs(OpenMultiLineCommentContextTags, IllegalTags);

	return OpenMultiLineCommentContextTags;
}(
	this.CommentContentTag,
	this.CloseMultiLineCommentTag
);

this.OpenGroupingContextTags = function(IllegibleRestTag){
	/**
	 * 起始分组小括号上下文标签列表
	 */
	function OpenGroupingContextTags(){
		ExpressionTags.call(this);

		this.register(
			new IllegibleRestTag()
		);
	};
	OpenGroupingContextTags = new Rexjs(OpenGroupingContextTags, ExpressionTags);

	return OpenGroupingContextTags;
}(
	this.IllegibleRestTag
);

this.OpenRestrictedCommentContextTags = function(OpenMultiLineCommentContextTags, CommentBreakTag){
	/**
	 * 起始多行注释上下文标签列表
	 */
	function OpenRestrictedCommentContextTags(){
		OpenMultiLineCommentContextTags.call(this);

		this.register(
			new CommentBreakTag()
		);
	};
	OpenRestrictedCommentContextTags = new Rexjs(OpenRestrictedCommentContextTags, OpenMultiLineCommentContextTags);

	return OpenRestrictedCommentContextTags;
}(
	this.OpenMultiLineCommentContextTags,
	this.CommentBreakTag
);

this.OpenSwitchBodyContextTags = function(CaseTag, DefaultTag, CloseBlockComponentTag){
	/**
	 * switch 语句块起始上下文标签列表
	 */
	function OpenSwitchBodyContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new CaseTag(),
			new DefaultTag(),
			new CloseBlockComponentTag(TYPE_UNEXPECTED)
		);
	};
	OpenSwitchBodyContextTags = new Rexjs(OpenSwitchBodyContextTags, IllegalTags);

	return OpenSwitchBodyContextTags;
}(
	this.CaseTag,
	this.DefaultTag,
	this.CloseBlockComponentTag
);

this.OpenDeclarationArrayContextTags = function(DeclarationArrayItemSeparatorTags, list){
	/**
	 * 起始变量声明数组上下文标签列表
	 */
	function OpenDeclarationArrayContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);

		this.delegate(list);
	};
	OpenDeclarationArrayContextTags = new Rexjs(OpenDeclarationArrayContextTags, DeclarationArrayItemSeparatorTags);

	return OpenDeclarationArrayContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	// list
	[
		this.DeclarationArrayItemTag,
		this.DeclarationArrayRestTag,
		this.OpenNestedDeclarationArrayItemTag,
		this.OpenObjectDeclarationArrayItemTag
	]
);

this.ParameterTags = function(SpreadTag){
	/**
	 * 函数调用参数标签列表
	 */
	function ParameterTags(){
		ExpressionTags.call(this);
		
		this.register(
			new SpreadTag()
		);
	};
	ParameterTags = new Rexjs(ParameterTags, ExpressionTags);

	return ParameterTags;
}(
	this.SpreadTag
);

this.PlusContextTags = function(PlusSiblingTag, IncrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function PlusContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new PlusSiblingTag(),
			new IncrementSiblingTag()
		);
	};
	PlusContextTags = new Rexjs(PlusContextTags, ExpressionTags);

	return PlusContextTags;
}(
	this.PlusSiblingTag,
	this.IncrementSiblingTag
);

this.PropertyNameContextTags = function(OpenShorthandMethodArgumentsTag, PropertyNameSeparatorTag, CloseObjectTag, CloseBraceTag){
	/**
	 * 对象名称上下文标签列表
	 */
	function PropertyNameContextTags(){
		ECMAScriptTags.call(this);

		this.register(
			new OpenShorthandMethodArgumentsTag(),
			new PropertyNameSeparatorTag(),
			new CloseObjectTag(TYPE_ILLEGAL)
		);
	};
	PropertyNameContextTags = new Rexjs(PropertyNameContextTags, ECMAScriptTags);

	PropertyNameContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是结束大括号
			if(tag instanceof CloseBraceTag){
				// 如果是结束对象大括号，则不过滤，否则其他都过滤
				return !(tag instanceof CloseObjectTag);
			}
			
			return false;
		}
	});

	return PropertyNameContextTags;
}(
	this.OpenShorthandMethodArgumentsTag,
	this.PropertyNameSeparatorTag,
	this.CloseObjectTag,
	this.CloseBraceTag
);

this.IdentifierPropertyNameContextTags = function(PropertyNameContextTags, PropertySeparatorTag, PropertyInitializerTag, CloseObjectTag){
	/**
	 * 对象标识符名称上下文标签列表
	 */
	function IdentifierPropertyNameContextTags(){
		PropertyNameContextTags.call(this);

		this.register(
			new PropertySeparatorTag(),
			new PropertyInitializerTag(),
			new CloseObjectTag(TYPE_UNEXPECTED)
		);
	};
	IdentifierPropertyNameContextTags = new Rexjs(IdentifierPropertyNameContextTags, PropertyNameContextTags);

	return IdentifierPropertyNameContextTags;
}(
	this.PropertyNameContextTags,
	this.PropertySeparatorTag,
	this.PropertyInitializerTag,
	this.CloseObjectTag
);

this.PropertyNameTags = function(list){
	/**
	 * 对象属性名称标签列表
	 */
	function PropertyNameTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	PropertyNameTags = new Rexjs(PropertyNameTags, IllegalTags);

	return PropertyNameTags;
}(
	// list
	[
		this.CloseObjectTag,
		this.IdentifierPropertyNameTag,
		this.NumberPropertyNameTag,
		this.BinaryNumberPropertyNameTag,
		this.OctalNumberPropertyNameTag,
		this.KeywordPropertyNameTag,
		this.StringPropertyNameTag,
		this.OpenComputedPropertyNameTag,
		this.GetTag,
		this.SetTag,
		this.PropertySpreadTag
	]
);

this.PropertySeparatorTags = function(PropertySeparatorTag){
	/**
	 * 属性分隔符标签列表
	 */
	function PropertySeparatorTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new PropertySeparatorTag()
		);
	};
	PropertySeparatorTags = new Rexjs(PropertySeparatorTags, ECMAScriptTags);

	return PropertySeparatorTags;
}(
	this.PropertySeparatorTag
);

this.RestArgumentNameTags = function(RestArgumentNameTag){
	/**
	 * 省略参数名标签列表
	 */
	function RestArgumentNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new RestArgumentNameTag()
		);
	};
	RestArgumentNameTags = new Rexjs(RestArgumentNameTags, IllegalTags);

	return RestArgumentNameTags;
}(
	this.RestArgumentNameTag
);

this.RestArgumentNameContextTags = function(RestArgumentSeparatorTag){
	/**
	 * 省略参数名上下文标签列表
	 */
	function RestArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new RestArgumentSeparatorTag()
		);
	};
	RestArgumentNameContextTags = new Rexjs(RestArgumentNameContextTags, ECMAScriptTags);

	return RestArgumentNameContextTags;
}(
	this.RestArgumentSeparatorTag
);

this.RestrictedExpressionContextTags = function(PostfixUnaryAssignmentTag, UnaryAssignmentTag, filter){
	/**
	 * 受限制的表达式上下文标签列表
	 */
	function RestrictedExpressionContextTags(){
		ExpressionContextTags.call(this);
	};
	RestrictedExpressionContextTags = new Rexjs(RestrictedExpressionContextTags, ExpressionContextTags);
	
	RestrictedExpressionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是后置一元赋值标签
			if(tag instanceof PostfixUnaryAssignmentTag){
				// 过滤掉
				return true;
			}

			// 如果是其他的一元赋值标签
			if(tag instanceof UnaryAssignmentTag){
				// 设置为可误解的，目的是报错
				tag.type = new TagType(TYPE_MISTAKABLE);
			}

			return filter.call(this, tag);
		}
	});
	
	return RestrictedExpressionContextTags;
}(
	this.PostfixUnaryAssignmentTag,
	this.UnaryAssignmentTag,
	ExpressionContextTags.prototype.filter
);

this.ReturnContextTags = function(OnlyStatementEndTags){
	/**
	 * return 上下文标签列表
	 */
	function ReturnContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new OnlyStatementEndTags()
		);
	};
	ReturnContextTags = new Rexjs(ReturnContextTags, ExpressionTags);

	return ReturnContextTags;
}(
	this.OnlyStatementEndTags
);

this.ShorthandMethodArgumentsTags = function(OpenShorthandMethodArgumentsTag){
	/**
	 * 简写方法参数标签列表
	 */
	function ShorthandMethodArgumentsTags(){
		IllegalTags.call(this);

		this.register(
			new OpenShorthandMethodArgumentsTag()
		);
	};
	ShorthandMethodArgumentsTags = new Rexjs(ShorthandMethodArgumentsTags, IllegalTags);

	return ShorthandMethodArgumentsTags;
}(
	this.OpenShorthandMethodArgumentsTag
);

this.ShorthandMethodBodyTags = function(OpenShorthandMethodBodyTag){
	/**
	 * 简写方法主体标签列表
	 */
	function ShorthandMethodBodyTags(){
		IllegalTags.call(this);

		this.register(
			new OpenShorthandMethodBodyTag()
		);
	};
	ShorthandMethodBodyTags = new Rexjs(ShorthandMethodBodyTags, IllegalTags);

	return ShorthandMethodBodyTags;
}(
	this.OpenShorthandMethodBodyTag
);

this.ShorthandMethodNameTags = function(list){
	/**
	 * 简写方法名标签列表
	 */
	function ShorthandMethodNameTags(){
		IllegalTags.call(this);
		
		this.delegate(list);
	};
	ShorthandMethodNameTags = new Rexjs(ShorthandMethodNameTags, IllegalTags);

	return ShorthandMethodNameTags;
}(
	// list
	[
		this.CloseObjectTag,
		this.IdentifierMethodNameTag,
		this.NumberMethodNameTag,
		this.BinaryNumberMethodNameTag,
		this.OctalNumberMethodNameTag,
		this.StringMethodNameTag,
		this.OpenComputedMethodNameTag
	]
);

this.PropertyAccessorContextTags = function(ShorthandMethodNameTags, OpenShorthandMethodArgumentsTag, PropertyNameSeparatorTag, PropertySeparatorTag){
	/**
	 * 属性访问器上下文标签列表
	 */
	function PropertyAccessorContextTags(){
		ShorthandMethodNameTags.call(this);
		
		this.register(
			new OpenShorthandMethodArgumentsTag(),
			new PropertyNameSeparatorTag(),
			new PropertySeparatorTag()
		);
	};
	PropertyAccessorContextTags = new Rexjs(PropertyAccessorContextTags, ShorthandMethodNameTags);

	return PropertyAccessorContextTags;
}(
	this.ShorthandMethodNameTags,
	this.OpenShorthandMethodArgumentsTag,
	this.PropertyNameSeparatorTag,
	this.PropertySeparatorTag
);

this.ClassPropertyNameTags = function(ShorthandMethodNameTags, ConstructorTag, GetDescriptorTag, SetDescriptorTag, ClassPropertyPlaceholderTag){
	/**
	 * 类属性名标签列表
	 */
	function ClassPropertyNameTags(){
		ShorthandMethodNameTags.call(this);
		
		this.register(
			new ConstructorTag(),
			new GetDescriptorTag(),
			new SetDescriptorTag(),
			new ClassPropertyPlaceholderTag()
		);
	};
	ClassPropertyNameTags = new Rexjs(ClassPropertyNameTags, ShorthandMethodNameTags);

	return ClassPropertyNameTags;
}(
	this.ShorthandMethodNameTags,
	this.ConstructorTag,
	this.GetDescriptorTag,
	this.SetDescriptorTag,
	this.ClassPropertyPlaceholderTag
);

this.AccessorDescriptorContextTags = function(ClassPropertyNameTags, ClassPropertyPlaceholderTag, OpenShorthandMethodArgumentsTag, PropertyAccessorTag){
	/**
	 * 访问器描述符上下文签列表
	 */
	function AccessorDescriptorContextTags(){
		ClassPropertyNameTags.call(this);

		this.register(
			new OpenShorthandMethodArgumentsTag()
		);
	};
	AccessorDescriptorContextTags = new Rexjs(AccessorDescriptorContextTags, ClassPropertyNameTags);

	AccessorDescriptorContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return (
				tag instanceof ClassPropertyPlaceholderTag ||
				tag instanceof PropertyAccessorTag
			);
		}
	});

	return AccessorDescriptorContextTags;
}(
	this.ClassPropertyNameTags,
	this.ClassPropertyPlaceholderTag,
	this.OpenShorthandMethodArgumentsTag,
	this.PropertyAccessorTag
);

this.OpenClassBodyContextTags = function(ClassPropertyNameTags, StaticModifierTag){
	/**
	 * 类主体起始上下文标签列表
	 */
	function OpenClassBodyContextTags(){
		ClassPropertyNameTags.call(this);

		this.register(
			new StaticModifierTag()
		);
	};
	OpenClassBodyContextTags = new Rexjs(OpenClassBodyContextTags, ClassPropertyNameTags);

	return OpenClassBodyContextTags;
}(
	this.ClassPropertyNameTags,
	this.StaticModifierTag
);

this.StaticModifierContextTags = function(ClassPropertyNameTags, ConstructorTag, CloseObjectTag, ClassPropertyPlaceholderTag, OpenShorthandMethodArgumentsTag){
	/**
	 * return 上下文标签列表
	 */
	function StaticModifierContextTags(){
		ClassPropertyNameTags.call(this);
		
		this.register(
			new OpenShorthandMethodArgumentsTag()
		);
	};
	StaticModifierContextTags = new Rexjs(StaticModifierContextTags, ClassPropertyNameTags);

	StaticModifierContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			switch(true){
				// constructor 不能作为静态属性
				case tag instanceof ConstructorTag:
					break;

				// 如果是结束大括号
				case tag instanceof CloseObjectTag:
					break;

				// 如果是分号
				case tag instanceof ClassPropertyPlaceholderTag:
					break;

				default:
					return false;
			}

			return true;
		}
	})
	
	return StaticModifierContextTags;
}(
	this.ClassPropertyNameTags,
	this.ConstructorTag,
	this.CloseObjectTag,
	this.ClassPropertyPlaceholderTag,
	this.OpenShorthandMethodArgumentsTag
);

this.SwitchBlockTags = function(OpenSwitchBodyTag){
	/**
	 * switch 语句块标签列表
	 */
	function SwitchBlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenSwitchBodyTag()
		);
	};
	SwitchBlockTags = new Rexjs(SwitchBlockTags, IllegalTags);

	return SwitchBlockTags;
}(
	this.OpenSwitchBodyTag
);

this.SwitchConditionTags = function(OpenSwitchConditionTag){
	/**
	 * switch 条件标签列表
	 */
	function SwitchConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenSwitchConditionTag()
		);
	};
	SwitchConditionTags = new Rexjs(SwitchConditionTags, IllegalTags);

	return SwitchConditionTags;
}(
	this.OpenSwitchConditionTag
);

this.TargetAccessorContextTags = function(TargetTag){
	/**
	 * new.target 属性访问器上下文标签列表
	 */
	function TargetAccessorContextTags(){
		IllegalTags.call(this);

		this.register(
			new TargetTag()
		);
	};
	TargetAccessorContextTags = new Rexjs(TargetAccessorContextTags, IllegalTags);

	return TargetAccessorContextTags;
}(
	this.TargetTag
);

this.TemplateContentTags = function(TemplateContentTag, OpenPlaceHolderTag, TemplateLineTerminatorTag, TemplateQouteTag, CloseTemplateTag){
	/**
	 * 模板内容上下文标签列表
	 */
	function TemplateContentTags(){
		ECMAScriptTags.call(this);

		this.register(
			new TemplateContentTag(),
			new OpenPlaceHolderTag(),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.CARRIAGE_RETURN),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.LINE_SEPARATOR),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.LINEFEED),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.PARAGRAPH_SEPARATOR),
			new TemplateQouteTag(),
			new CloseTemplateTag()
		);
	};
	TemplateContentTags = new Rexjs(TemplateContentTags, ECMAScriptTags);

	return TemplateContentTags;
}(
	this.TemplateContentTag,
	this.OpenPlaceHolderTag,
	this.TemplateLineTerminatorTag,
	this.TemplateQouteTag,
	this.CloseTemplateTag
);

this.TerminatedBranchFlowContextTags = function(LabelledIdentifierTag){
	/**
	 * 中断分支流上下文标签列表
	 */
	function TerminatedBranchFlowContextTags(){
		StatementEndTags.call(this);
		
		this.register(
			new LabelledIdentifierTag()
		);
	};
	TerminatedBranchFlowContextTags = new Rexjs(TerminatedBranchFlowContextTags, StatementEndTags);

	return TerminatedBranchFlowContextTags;
}(
	this.LabelledIdentifierTag
);

this.ThrowContextTags = function(ThrowContextLineTerminatorTag){
	/**
	 * throw 关键字上下文标签
	 */
	function ThrowContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new ThrowContextLineTerminatorTag()
		);
	};
	ThrowContextTags = new Rexjs(ThrowContextTags, ExpressionTags);

	return ThrowContextTags;
}(
	this.ThrowContextLineTerminatorTag
);

this.TryContextTags = function(ExecContextTags, OpenBlockTag, filter){
	/**
	 * try 关键字上下文标签
	 */
	function TryContextTags(){
		ExecContextTags.call(this);
		
		this.register(
			new OpenBlockTag()
		);
	};
	TryContextTags = new Rexjs(TryContextTags, ExecContextTags);

	TryContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			var value = filter.call(this, tag);

			// 如果是表达式标签
			if(tag.class.expression){
				// 如果是可以匹配的
				if(tag.type.matchable){
					// 设置为可匹配
					tag.type = new TagType(TYPE_MISTAKABLE);
				}
			}
			
			return value;
		}
	});
	
	return TryContextTags;
}(
	this.ExecContextTags,
	this.OpenBlockTag,
	this.ExecContextTags.prototype.filter
);

this.UnexpectedTags = function(){
	/**
	 * 未捕获的标签列表
	 */
	function UnexpectedTags(){
		ECMAScriptTags.call(this);
	};
	UnexpectedTags = new Rexjs(UnexpectedTags, ECMAScriptTags);

	return UnexpectedTags;
}();

this.VarContextTags = function(VariableDeclarationTags, ClosureVariableTag){
	/**
	 * var 关键字上下文标签列表
	 */
	function VarContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new ClosureVariableTag()
		);
	};
	VarContextTags = new Rexjs(VarContextTags, VariableDeclarationTags);

	return VarContextTags;
}(
	this.VariableDeclarationTags,
	this.ClosureVariableTag
);

this.WhileConditionTags = function(OpenWhileConditionTag){
	/**
	 * while 条件标签列表
	 */
	function WhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenWhileConditionTag()
		);
	};
	WhileConditionTags = new Rexjs(WhileConditionTags, IllegalTags);

	return WhileConditionTags;
}(
	this.OpenWhileConditionTag
);

}.call(
	this,
	this.ECMAScriptTags,
	this.ExpressionTags,
	this.ExpressionContextTags,
	this.MistakableTags,
	this.StatementTags,
	this.StatementEndTags,
	this.IllegalTags
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/tags-others.js"
								);


eval(
									function(){
										// ECMAScript 解析器相关
~function(SyntaxParser){

this.ECMAScriptTagsMap = function(SyntaxTagsMap, dataArray){
	/**
	 * ECMAScript 标签列表映射，初始化该类是个耗性能过程，建议作为单例使用
	 */
	function ECMAScriptTagsMap(){
		SyntaxTagsMap.call(this);
		
		dataArray.forEach(
			function(data){
				this.map(
					data.name,
					new data.tags()
				);
			},
			this
		);
	};
	ECMAScriptTagsMap = new Rexjs(ECMAScriptTagsMap, SyntaxTagsMap);
	
	return ECMAScriptTagsMap;
}(
	Rexjs.SyntaxTagsMap,
	// dataArray
	[
		// 基类标签列表
		"Expression",
		"ExpressionContext",
		"Mistakable",
		"Illegal",
		"Statement",
		"StatementEnd",
		// 其他标签列表
		"AccessorDescriptorContext",
		"ArgumentNameContext",
		"ArgumentSeparatorContext",
		"ArrowContext",
		"Block",
		"CatchedException",
		"ClassContext",
		"ClassNameContext",
		"ClassPropertyName",
		"ClassVariable",
		"CloseArrowFunctionBodyContext",
		"CloseCatchedException",
		"ClosureVariableContext",
		"ConstContext",
		"ConstructorArguments",
		"ConstructorBody",
		"DeclarationArrayItemContext",
		"DeclarationArrayItemSeparator",
		"DeclarationArrayRestItemContext",
		"DeclarationArrayRestItem",
		"DeclarationPropertyNameSeparator",
		"DeclarationPropertyName",
		"DeclarationPropertySeparator",
		"DeclarationPropertyValueContext",
		"DeclarationPropertyValue",
		"DestructibleExpressionContext",
		"DestructuringAssignment",
		"DoWhileCondition",
		"DotAccessorContext",
		"ExceptionVariable",
		"ExecContext",
		"ExportContext",
		"ExtendsContext",
		"FileStart",
		"ForCondition",
		"ForConditionContext",
		"FunctionArgument",
		"FunctionBody",
		"FunctionContext",
		"FunctionDeclarationContext",
		"IdentifierPropertyNameContext",
		"IfCondition",
		"IdentifierDeclarationPropertyNameContext",
		"ImportContext",
		"LabelContext",
		"LetContext",
		"MemberAliasVariable",
		"MemberContext",
		"MemberSeparatorContext",
		"MemberSeparator",
		"MemberVariable",
		"ModuleAlias",
		"ModuleName",
		"ModuleVariable",
		"NegationContext",
		"OpenArgumentsContext",
		"OpenArrayContext",
		"OpenClassBodyContext",
		"OpenMultiLineCommentContext",
		"OpenGroupingContext",
		"OpenRestrictedCommentContext",
		"OpenSwitchBodyContext",
		"OpenDeclarationArrayContext",
		"Parameter",
		"PlusContext",
		"PropertyAccessorContext",
		"PropertyName",
		"PropertyNameContext",
		"PropertySeparator",
		"RestArgumentName",
		"RestArgumentNameContext",
		"RestrictedExpressionContext",
		"ReturnContext",
		"ShorthandMethodArguments",
		"ShorthandMethodBody",
		"ShorthandMethodName",
		"StaticModifierContext",
		"SwitchBlock",
		"SwitchCondition",
		"TargetAccessorContext",
		"TemplateContent",
		"TerminatedBranchFlowContext",
		"ThrowContext",
		"TryContext",
		"Unexpected",
		"VarContext",
		"VariableDeclaration",
		"WhileCondition"
	]
	.map(
		function(prefix){
			return {
				name: prefix[0].toLowerCase() + prefix.substring(1) + "Tags",
				tags: this[prefix + "Tags"]
			};
		},
		this
	)
);

this.ECMAScriptParser = function(MappingBuilder, ECMAScriptTagsMap, GlobalStatements, tagsMap, sourceMaps, parse){
	/**
	 * ECMAScript 语法解析器
	 */
	function ECMAScriptParser(){
		SyntaxParser.call(this);

		this.deps = [];
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);

	ECMAScriptParser.static({
		/**
		 * 获取是否应该生成 sourceMaps
		 */
		get sourceMaps(){
			return sourceMaps;
		},
		/**
		 * 设置是否应该生成 sourceMaps
		 * @param {Boolean} value - 是否应该生成 sourceMaps
		 */
		set sourceMaps(value){
			sourceMaps = value;
		}
	});

	ECMAScriptParser.props({
		/**
		 * 将解析后的语法生成字符串
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 */
		build: function(_contentBuilder){
			// 如果没有提供内容生成器
			if(!_contentBuilder){
				_contentBuilder = sourceMaps ? new MappingBuilder(this.file) : new ContentBuilder();
			}
			
			// 追加闭包函数起始部分
			_contentBuilder.appendString("~function(){");
			// 创建新行
			_contentBuilder.newline();
			// 追加严格表达式字符串
			_contentBuilder.appendString('"use strict";');
			// 创建新行
			_contentBuilder.newline();

			// 提取语法列表内容
			this.statements.extractTo(_contentBuilder);
			
			// 创建新行
			_contentBuilder.newline();
			// 追加闭包函数结束部分
			_contentBuilder.appendString("}.call(this);");

			return _contentBuilder.complete();
		},
		defaultExported: false,
		deps: null,
		/**
		 * 开始解析
		 * @param {File} file - 文件信息
		 */
		parse: function(file){
			parse.call(
				this,
				file,
				/*
					如果 tagsMap 没有初始化，则初始化，
					在这里初始化的目的是为了：
					1. 当不使用 ECMAScriptParser 时，不会耗性能
					2. 就算多次使用 ECMAScriptParser，也不会多次初始化 ECMAScriptTagsMap
				*/
				tagsMap || (tagsMap = new ECMAScriptTagsMap()),
				new GlobalStatements()
			);
		}
	});

	return ECMAScriptParser;
}(
	Rexjs.MappingBuilder,
	this.ECMAScriptTagsMap,
	this.GlobalStatements,
	// tagsMap
	null,
	// sourceMaps
	false,
	SyntaxParser.prototype.parse
);

}.call(
	this,
	Rexjs.SyntaxParser
);
									}
									.toString()
									.match(
										/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-parser.js"
								);


Rexjs.static(this);
}(
	Rexjs,
	Rexjs.ContentBuilder,
	Rexjs.Expression,
	Rexjs.ListExpression,
	Rexjs.EmptyExpression,
	Rexjs.DefaultExpression,
	Rexjs.PartnerExpression,
	Rexjs.LeftHandSideExpression,
	// ECMAScriptStatement
	null,
	// BoxStatement
	null,
	// ECMAScriptErrors
	null,
	// ECMAScriptOrders
	null,
	// ECMAScriptConfig
	null,
	Rexjs.SyntaxTag,
	Rexjs.TagType,
	Rexjs.TagClass.CLASS_STATEMENT_BEGIN,
	Rexjs.TagClass.CLASS_STATEMENT_END,
	Rexjs.TagClass.CLASS_EXPRESSION,
	Rexjs.TagClass.CLASS_EXPRESSION_CONTEXT,
	Rexjs.TagType.TYPE_MATCHABLE,
	Rexjs.TagType.TYPE_UNEXPECTED,
	Rexjs.TagType.TYPE_MISTAKABLE,
	Rexjs.TagType.TYPE_ILLEGAL,
	Rexjs.Expression.STATE_STATEMENT_ENDABLE,
	Rexjs.Expression.STATE_STATEMENT_END,
	Rexjs.Expression.STATE_STATEMENT_ENDED,
	// IDENTIFIER_REGEXP_SOURCE
	/(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*/
		.toString()
		.match(
			/^\/(.+)\/$/
		)[1]
);