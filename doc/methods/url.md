# url操作
url相关操作合集
## 读取
传入一个URL字符串，不传则取当前页面地址，返回一个包含URL信息的对象，包含以下属性
* source
* protocol
* host
* port
* query
* params
* file
* hash
* path
* relative
* segments
* isUrl
* route
```javascript
//exp：当前URL为www.xxx.com/index.html?name=123
//获取当前URL中name的值
let {name}=maple.url().params;
//name的值为'123'
```
## url 方法
replace：接收任意数量的参数用于修改或删除URL参数，如果接收的参数是字符串，则删除URL中对应的参数，如果是对象，则进行添加和修改。==不会触发页面跳转==
```javascript
maple.url().replace({name:456})//修改或增加参数
maple.url().replace('name')//删除参数
maple.url().replace('name','age')//删除多个参数
maple.url().replace('name',{age:123})//混合使用
```
replaceHash：接收任意数量的参数用于修改或删除hash参数，如果接收的参数是字符串，则删除URL中对应的参数，如果是对象，则进行添加和修改。==不会触发页面跳转==
```javascript
maple.url().replaceHash({name:456})//修改或增加参数
maple.url().replaceHash('name')//删除参数
maple.url().replaceHash('name','age')//删除多个参数
maple.url().replaceHash('name',{age:123})//混合使用
```
push：使用方法和replace完全相同，区别在于==会触发页面跳转==
```javascript
maple.url().push({name:456})//修改或增加参数
maple.url().push('name')//删除参数
maple.url().push('name','age')//删除多个参数
maple.url().push('name',{age:123})//混合使用
```
