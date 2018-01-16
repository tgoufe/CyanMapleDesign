'use strict';

import Model from './model.js';
import merge from '../util/merge.js';

/**
 * 默认配置
 * @const
 * */
const WEB_SQL_MODEL_CONFIG = {
		dbName: 'storage'
		, tableName: 'storage'
		, dbVersion: 1
		// 数据库可用空间大小，如果指定太大，浏览器会提示用户是否允许使用这么多空间
		, dbSize: 2<<20
		, sql: {
			create:         'create table if not exists `{{tableName}}`(id integer primary key autoincrement,topic text unique,value text)'
			, select:       'select * from `{{tableName}}` where topic=?'
			, update:       'update `{{tableName}}` set value=? where topic=?'
			, insert:       'insert into `{{tableName}}`(topic,value) values(?,?)'
			, delete:       'delete from `{{tableName}}` where topic=?'
			, clear:        'delete from `{{tableName}}`'
			, createIndex:  'create index if not exists index_{{col}} on `{{tableName}}`(`{{col}}`)'
		}
	}
	;

/**
 * @class
 * @classdesc   对 WebSQL Database 进行封装，统一调用接口，在 Model.factory 工厂方法注册为 webSQL，别名 ws,sql，将可以使用工厂方法生成。默认使用表名为 storage，有 id,topic,value 3 个列的表，在生成对象时传入 options 可覆盖默认 SQL 语句
 * @extends     Model
 * @example
<pre>
let webSQLModel = new WebSQLModel()
	, storage = Model.factory('webSQL')
	, ws = Model.factory('ws')
	, sql = Model.factory('sql')
    , newSQL = Model.factory('webSQL', {
        tableName: 'newStorage'
    })
	;

newSQL.setData('index/data', {});   // newSQL 不会被缓存
</pre>
 * */
class WebSQLModel extends Model{
	/**
	 * @constructor
	 * @param   {Object}    [config={}]
	 * @param   {String}    [config.dbName]
	 * @param   {String}    [config.tableName]
	 * @param   {Number}    [config.dbVersion]
	 * @param   {Number}    [config.dbSize] 单位字节
	 * @param   {Object}    [config.sql]
	 * @param   {String}    [config.sql.create] 创建表时执行的 sql 语句
	 * @param   {String}    [config.sql.select] 查询时执行的 sql 语句
	 * @param   {String}    [config.sql.update] 更新时执行的 sql 语句
	 * @param   {String}    [config.sql.insert] 插入时执行的 sql 语句
	 * @param   {String}    [config.sql.delete] 删除时执行的 sql 语句
	 * @param   {String}    [config.sql.clear]  clearData 时执行的 sql 语句
	 * @desc    传入 sql 语句时，可用 {{tableName}} 来代替表名
	 * */
	constructor(config={}){
		super( config );

		let sql = config.sql
			;

		this._config = merge(config, WebSQLModel._CONFIG);

		if( sql && typeof sql === 'object' ){

			this._config.sql = merge(sql, WebSQLModel._CONFIG.sql);
		}

		Object.keys( this._config.sql ).forEach((d)=>{
			this._config.sql[d] = this._replaceTableName( this._config.sql[d] );
		});

		// this._store 为 Promise 类型，会在 resolve 中传入 db 实例，因为要保证数据表存在才可以操作
		this._store = new Promise((resolve, reject)=>{
			let db
				;

			if( 'openDatabase' in self ){
				// 打开数据库，若不存在则创建
				db = openDatabase(this._config.dbName, ''+ this._config.dbVersion, this._config.dbName, this._config.dbSize);

				db.transaction((tx)=>{
					// 若没有数据表则创建
					tx.executeSql(this._config.sql.create, [], ()=>{
						resolve( db );
					}, (tx, e)=>{
						console.log( e );
						reject( e );
					});
				});
			}
			else{
				reject( new Error('此浏览器不支持 Web SQL Database') );
			}
		});
	}

	// ---------- 静态属性 ----------
	/**
	 * @summary 默认配置
	 * @static
	 * @const
	 * */
	static get _CONFIG(){
		return WEB_SQL_MODEL_CONFIG;
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary 替换表名
	 * @private
	 * @param   {String}    sql
	 * @return  {String}    替换完成的 sql 语句
	 * */
	_replaceTableName(sql){
		return sql.replace(/{{tableName}}/g, this._config.tableName);
	}
	/**
	 * @summary 查询
	 * @private
	 * @param   {String}    topic
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回查询出来的数组
	 * */
	_select(topic){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				db.transaction((tx)=>{
					tx.executeSql(this._config.sql.select, [topic], (tx, rs)=>{
						resolve( rs.rows );
					}, (tx, e)=>{
						console.log( e );
						reject( e );
					});
				});
			});
		});
	}
	/**
	 * @summary 更新
	 * @private
	 * @param   {String}    topic
	 * @param   {String}    value
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回影响行数的 boolean 值
	 * */
	_update(topic, value){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				db.transaction((tx)=>{
					tx.executeSql(this._config.sql.update, [value, topic], (tx, rs)=>{
						resolve( !!rs.rowsAffected );
					}, (tx, e)=>{
						console.log( e );
						reject( e );
					});
				});
			});
		});
	}
	/**
	 * @summary 新建
	 * @private
	 * @param   {String}    topic
	 * @param   {String}    value
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回新插入行 id 的 boolean 值
	 * */
	_insert(topic, value){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				db.transaction((tx)=>{
					tx.executeSql(this._config.sql.insert, [topic, value], (tx, rs)=>{
						resolve( !!rs.insertId );
					}, (tx, e)=>{
						console.log( e );
						reject( e );
					})
				});
			});
		});
	}
	/**
	 * @summary 删除
	 * @private
	 * @param   {String}    topic
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回影响行数的 boolean 值
	 * */
	_delete(topic){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				db.transaction((tx)=>{
					tx.executeSql(this._config.sql.delete, [topic], (tx, rs)=>{
						resolve( !!rs.rowsAffected );
					}, (tx, e)=>{
						console.log( e );
						reject( e );
					});
				});
			});
		});
	}
	/**
	 * @summary 清空表
	 * @private
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回影响行数的 boolean 值
	 * */
	_clear(){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				db.transaction((tx)=>{
					tx.executeSql(this._config.sql.clear, [], (tx, rs)=>{
						resolve( !!rs.rowsAffected );
					}, (tx, e)=>{
						console.log( e );
						reject( e );
					});
				});
			});
		});
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary 设置数据
	 * @param   {String|Object} topic
	 * @param   {*}             value
	 * @return  {Promise}       返回一个 Promise 对象，在 resolve 时传回影响行数的 boolean 值
	 * @desc    保持值得时候，同时会保持在内存中
	 * */
	setData(topic, value){
		let result
			;

		if( typeof topic === 'object' ){
			result = this._setByObject( topic );
		}
		else{
			result = super.setData(topic, value).then(()=>{

				value = this._stringify( value );

				return this._select( topic );
			}).then((rs)=>{
				let result
					;

				if( rs && rs.length ){    // topic 已存在
					result = this._update(topic, value);
				}
				else{
					result = this._insert(topic, value);
				}

				return result;
			});
		}

		return result;
	}
	/**
	 * @summary 获取数据
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，若存在 topic 的值，在 resolve 时传回查询出来的 value，否则在 reject 时传回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 WebSQL Database 中取值并将其存入内存中，当 topic 的类型为数组的时候，resolve 传入的结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
	 * */
	getData(topic){
		let argc = arguments.length
			, result
			;

		if( Array.isArray(topic) ){
			result = this._getByArray( topic );
		}
		else if( argc > 1 ){
			result = this._getByArray( [].slice.call(arguments) );
		}
		else{
			result = super.getData( topic ).catch(()=>{
				return this._select( topic ).then((rs)=>{
					let value = ''
						;

					if( rs && rs.length ){
						// 只返回第一条数据
						value = rs[0].value;

						try{
							value = JSON.parse( value );
						}
						catch(e){}

						// 在内存中保留该值
						super.setData(topic, value);
					}
					else{
						value = Promise.reject( null );
					}

					return value;
				});
			});
		}

		return result;
	}
	/**
	 * @summary 将数据从缓存中删除
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，在 resolve 时传回影响行数的 boolean 值
	 * */
	removeData(topic){
		let argc = arguments.length
			, result
			;

		if( Array.isArray(topic) ){
			result = this._removeByArray( topic );
		}
		else if( argc > 1 ){
			result = this._removeByArray( [].slice.call(arguments) );
		}
		else{
			result = super.removeData( topic ).then(()=>{
				return this._delete( topic );
			});
		}

		return result;
	}
	/**
	 * @summary 清空数据
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回影响行数的 boolean 值
	 * */
	clearData(){
		return this.clearData().then(()=>{
			return this._clear();
		});
	}

	/**
	 * @summary 独立执行 sql 方法
	 * @param   {String}    sql
	 * @param   {Array}     [value=[]]
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 sql 语句的执行结果
	 * */
	executeSql(sql, value=[]){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				db.transaction((tx)=>{
					tx.executeSql(sql, value, (tx, rs)=>{
						resolve( rs );
					}, (tx, e)=>{
						console.log( e );
						reject( e );
					});
				});
			});
		});
	}
	/**
	 * @summary 针对某列建立索引
	 * @param   {String}    col
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 sql 语句的执行结果
	 * */
	createIndex(col){
		return this._store.then((db)=>{
			return new Promise((resolve, reject)=>{
				db.transaction((tx)=>{
					tx.executeSql(this._config.sql.createIndex.replace(/{{col}}/g, col), [], (tx, rs)=>{
						resolve( !!rs.rowsAffected );
					}, (tx, e)=>{
						reject( e );
					});
				});
			});
		});
	}
}

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('webSQL', WebSQLModel);
/**
 * 注册别名
 * */
Model.registerAlias('webSQL', ['ws', 'sql']);

export default WebSQLModel;