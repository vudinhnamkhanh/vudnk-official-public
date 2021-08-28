const VALID_TYPES = ['json', 'sqlite'],
	object = require('./object.js'),
	symbols = {
		db: Symbol('db'),
		cache: Symbol('cache'),
		customInspect: Symbol.for('nodejs.util.inspect.custom'),
	};


class DatabaseError extends Error{
    name = 'DatabaseError';
}

module.exports = {
	object,
	symbols,
	DatabaseError,
	parseKey, parseOptions,
};


function parseKey(key){
	if(typeof key !== 'string'){
		throw new DatabaseError('\'key\' must be a string');
	}else if(key.match(/\.{2,}|^\.|\.$/) || key === ''){
		throw new DatabaseError('\'key\' is not valid');
	}

	return key.split(/\.|\[(\d)\]/).filter(k => k);
}

function parseOptions(options){
	if(typeof options !== 'object'){
		throw new DatabaseError('the database options should be an object or a string with the path');
	}

	const { cacheType = 0, check = false, name = 'simple_db', path } = options;
	let { type } = options;

	if(typeof cacheType !== 'number' || isNaN(cacheType)){
		throw new DatabaseError('\'cacheType\' should be a number between 0 and 2');
	}else if(typeof check !== 'boolean'){
		throw new DatabaseError('\'check\' should be a boolean value');
	}

	if(path && typeof path !== 'string'){
		throw new DatabaseError('database \'path\' must be a string');
	}

	if(!type && path){
		const extension = path.split('.').pop().trim()
			.toLowerCase();

		type = VALID_TYPES.includes(extension) ? extension : 'json';
	}else if(typeof type === 'string'){
		type = type.toLowerCase();
	}else{
		throw new DatabaseError('\'type\' should be a string');
	}

	if(type === 'sqlite'){
		if(typeof name !== 'string'){
			throw new DatabaseError('database \'name\' should be a string');
		}else if(name.startsWith('sqlite_')){
			throw new DatabaseError('database \'name\' can\'t start with \'sqlite_\' (in SQLite)');
		}else if(!name.match(/^[A-z_'"`][A-z\d_'"`]*$/)){
			throw new DatabaseError('introduced database \'name\' is not valid (in SQLite)');
		}
	}

	return { cacheType, path, check, type, name };
}