# 本地存储

## cookie 方法

cookie 方法用于操作 cookie

```javascript
// 设置 cookie，24 小时后过期
maple.cookie('username', 'maple', {expires: 24*60*60*1000}); 

// 删除 cookie
maple.cookie('username', '', {expires: -1});

// 删除 cookie
maple.cookie.remove('username');
```

## localData 方法

localData 方法用于操作 localStorage

```javascript
// 添加 localStorage 数据 
maple.localData('username', 'maple');

// 删除 localStorage 数据
maple.localData.remove('username');

// 清空 localStorage
maple.localData.removeAll();
```

## sessionData 方法

sessionData 方法用于处理 sessionStorage

```javascript
// 添加 sessionStorage 数据
maple.sessionData('username', 'maple');

// 删除 sessionStorage 数据
maple.sessionData.remove('username');

// 清空 sessionStorage
maple.sessionData.removeAll();
```