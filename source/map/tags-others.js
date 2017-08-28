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