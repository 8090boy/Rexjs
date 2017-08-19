### Rexjs - Made in China 的 ECMAScript 语言解析器

官方网站：[http://jqun.oschina.io/rexjs.org](http://jqun.oschina.io/rexjs.org)

新手教程：
```
<!-- 引用 rexjs -->
<script src="http://rexjs.org/rex.min.js"></script>

<!-- 使用 type 定义模块 -->
<script type="text/rexjs">
	import "./file.js";

	export default class {};
</script>

<!--
	当然，一旦指定 src，则根据其路径来加载指定入口模块文件，
	而且，一旦提供 data-sourcemaps 属性时，不管值是什么，都将启用“源代码映射”功能。
-->
<script src="./file.js" type="text/rexjs" data-sourcemaps></script>
```

支持浏览器：Chrome、Firefox、Safari、IE9+。

因涉及到某些 DOM 或 浏览器特有 API，目前仅支持浏览器使用，今年9、10月的 1.1.0+ 或 1.2.0+ 版本将支持 Node 及 Web Worker，多谢理解。