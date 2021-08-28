const { DatabaseError, symbols, object, parseKey, parseOptions } = require('../utils/utils.js');
const { ArrayUtils, NumberUtils } = require('./modules/extras.js');

const JSONDatabase = require('./databases/JSON.js'),
	SQLiteDatabase = require('./databases/SQLite.js');

const util = require('util');

class Database{
	constructor(options){
		options = parseOptions(options || {});

		let db;
		switch(options.type){
			case 'json':{
				db = new JSONDatabase(options);
				break;
			}
			case 'sqlite':{
				db = new SQLiteDatabase(options);
				break;
			}
			default:{
				throw new DatabaseError(`database type must be 'json' or 'sqlite', recieved: ${options.type}`);
			}
		}

		Object.assign(this, {
			[symbols.db]: db,
			_cacheType: options.cacheType,
			array: new ArrayUtils(this),
			number: new NumberUtils(this),
		});

		if(this._cacheType > 0){
			this[symbols.cache] = db.getAll();
		}
	}
	// @ts-ignore
	[symbols.db] = null;
	// @ts-ignore
	[symbols.cache] = {};
	_cacheType = 0;

	_data(key){
		if(this._cacheType === 0){
			return key ? this[symbols.db].get(key) :
				       this[symbols.db].getAll();
		}else if(this._cacheType === 1){
			return object.clone(
				key ? this[symbols.cache][key] :
					this[symbols.cache]
			);
		}else if(this._cacheType === 2){
			return key ? this[symbols.cache][key] :
					   this[symbols.cache];
		}
		throw new DatabaseError('\'cacheType\' must be a number between 0 and 2');
	}

	// -----

	get(key){
		let props;
		[key, ...props] = parseKey(key);

		const data = object.get(this._data(key), props);

		return data;
	}

	set(key, value){
		let props;
		[key, ...props] = parseKey(key);

		let data = object.set(this._data(key), props, value);

		this[symbols.db].set(key, data);
		if(this._cacheType > 0){
			if(this._cacheType === 1){
				data = object.clone(data);
			}
			this[symbols.cache][key] = data;
		}

		return value;
	}

	delete(key){
		let props;
		[key, ...props] = parseKey(key);

		const data = this._data(key);
		let deleted;
		if(props.length){
			deleted = object.delete(data, props);
			this[symbols.db].set(key, data);

			if(this._cacheType > 0){
				this[symbols.cache][key] = data;
			}
		}else{
			deleted = data;
			this[symbols.db].delete(key);

			if(this._cacheType > 0){
				delete this[symbols.cache][key];
			}
		}

		return deleted;
	}

	clear(){
		this[symbols.cache] = {};
		return this[symbols.db].clear();
	}

	// -----

	array = null;

	number = null;

	get keys(){
		return Object.keys(this._data());
	}

	get values(){
		return Object.values(this._data());
	}

	get entries(){
		return Object.entries(this._data()).map(
			([key, value]) => ({ key, value })
		);
	}

	toJSON(beautify){
		return JSON.stringify(
			this._data(),
			null,
			beautify ? '\t' : null
		);
	}

	// eslint-disable-next-line class-methods-use-this
	toString(){
		throw new DatabaseError('databases cannot be converted to string');
	}

	[symbols.customInspect](depth = 0){
		if(typeof depth !== 'number') throw new Error('\'depth\' should be a number');

		const str = util.inspect(this._data(), {
			colors: true, depth,
		});
		return `Database ${str}`;
	}
}

module.exports = Database;