#  动态加载
load方法用于异步加载image js css iframe，你可以使用以下两种方式传入type和url，返回一个promise对象，加载成功后得到的resolve的数据是一个DOM节点，可供使用的type类型有
* image/img
* iframe
* css
* js/javascript
```javascript
maple.load(type,url).then(dom=>{....})
maple.load({
  type:'img',
  url:'.....'
}).then(dom=>{....})
```
