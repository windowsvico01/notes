## 跨站脚本 XSS攻击
### 主要危害
- [1]获取其他用户Cookie中的敏感数据。
- [2]屏蔽页面特定信息。
- [3]伪造页面信息。
- [4]拒绝服务攻击。
- [5]突破外网内网不同安全设置。
- [6]与其它漏洞结合，修改系统设置，查看系统文件，执行系统命令等。
### 修复建议
- 1.过滤客户端提交的危险字符，客户端提交方式包含GET、POST、COOKIE、User-Agent、Referer、Accept-Language等
- 2.HtmlEncode：对一段指定的字符串应用HTML编码。
    UrlEncode：对一段指定的字符串URL编码。
    XmlEncode：将在XML中使用的输入字符串编码。
    XmlAttributeEncode：将在XML属性中使用的输入字符串编码 
    escape：函数可对字符串进行编码
    decodeURIComponent：返回统一资源标识符的一个已编码组件的非编码形式。
    encodeURI：将文本字符串编码为一个有效的统一资源标识符 (URI)。
- 3.服务端限制提交的数据长度、类型、字符集。

## SQL注入
### 一般性的建议：
- 1.限定访问者提交数据的类型。
- 2.过滤危险的SQL语句关键字，比如：select、from、update、delete等

## 跨站请求伪造 CSRF
### 一般性的建议：
- 1.不要完全依赖于cookie传送会话令牌 如： 利用html表单隐藏字段

## 配置不当
<input type="hidden" name="field＿name" value="value"> 
服务端加强表单类型为hidden的验证

## 假如INPUT标签没有指定“autocomplete”属性为off，则自动默认为on，
### 建议
将INPUT标签的属性“autocomplete”设置为“off”，代码：<INPUT TYPE="password" autocomplete="off">。

## 信息泄露
代码注释中不要有敏感信息