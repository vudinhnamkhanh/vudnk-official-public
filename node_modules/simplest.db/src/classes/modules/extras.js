const { DatabaseError } = require('../../utils/utils.js');

class NumberUtils{
	constructor(db){
		this.add = this.add.bind(db);
	}

	add(key, value){
		if(typeof value !== 'number' || isNaN(value)){
			throw new DatabaseError('\'value\' must be a number');
		}
		// @ts-ignore
		let num = this.get(key);

		if(typeof num === 'undefined'){
			num = 0;
		}else if(typeof num !== 'number' || isNaN(num)){
			throw new DatabaseError(`data stored in the key '${key}' is not an number`);
		}

		num += value;

		// @ts-ignore
		this.set(key, num);

		return num;
	}

	subtract(key, value){
		return this.add(key, -value);
	}
}

class ArrayUtils{
	constructor(db){
		this._get = db.get.bind(db);
		this._set = db.set.bind(db);
	}

	_getArray(key){
		const arr = this._get(key);

		if(!Array.isArray(arr)){
			throw new DatabaseError(`data stored in the key '${key}' is not an array`);
		}

		return arr;
	}

	push(key, ...values){
		let arr = this._get(key);

		if(typeof arr === 'undefined' || arr === null){
			arr = values;
		}else{
			if(!Array.isArray(arr)){
				throw new DatabaseError(`value stored in '${key}' is not an array`);
			}
			arr.push(...values);
		}

		this._set(key, arr);

		return arr;
	}

	extract(key, index){
		const arr = this._get(key);

		if(typeof arr === 'undefined') return;

		if(typeof index === 'function'){
			index = arr.findIndex(index);
		}else if(typeof index === 'string'){
			index = arr.indexOf(index);
		}

		if(typeof index !== 'number'){
			throw new DatabaseError('\'index\' must be a number or a function that returns a number or a string in the array');
		}
		if(index === -1) return;

		const [value] = arr.splice(index, 1);

		this._set(key, arr);

		return value;
	}

	// from here to the end the methods throw an error if the array does not exists

	splice(key, start, deleteCount, ...items){
		const arr = this._getArray(key);

		const values = arr.splice(start, deleteCount, ...items);

		this._set(key, arr);

		return values;
	}

	random(key){
		const arr = this._getArray(key);
		return arr[Math.floor(Math.random() * arr.length)];
	}

	// -----

	includes(key, valueToFind, fromIndex){
		return this._getArray(key).includes(valueToFind, fromIndex);
	}

	sort(key, compareFunction){
		return this._getArray(key).sort(compareFunction);
	}

	reduce(key, callback, initialValue){
		return this._getArray(key).reduce(callback, initialValue);
	}

	find(key, callback, thisArg){
		return this._getArray(key).find(callback, thisArg);
	}

	findIndex(key, callback, thisArg){
		return this._getArray(key).findIndex(callback, thisArg);
	}

	filter(key, callback, thisArg){
		return this._getArray(key).filter(callback, thisArg);
	}

	map(key, callback, thisArg){
		return this._getArray(key).map(callback, thisArg);
	}

	some(key, callback, thisArg){
		return this._getArray(key).some(callback, thisArg);
	}

	every(key, callback, thisArg){
		return this._getArray(key).every(callback, thisArg);
	}
}

module.exports = { ArrayUtils, NumberUtils };