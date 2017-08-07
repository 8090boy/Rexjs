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

			// 收集变量名
			variable.collectTo(parser, context, statements);
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