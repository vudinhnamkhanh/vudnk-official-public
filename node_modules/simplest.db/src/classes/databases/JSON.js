const { DatabaseError } = require('../../utils/utils.js'),
	fs = require('fs');

class JSONDatabase{
	constructor({ path = './simple-db.json', check }){
		if(!fs.existsSync(path)){
			fs.writeFileSync(path, '{}');
		}

		Object.assign(this, { path, check });
	}
	path = null;
	check = false;

	save(value){
	    JSONWrite(this.path, value, this.check);
	}

	set(key, value){
	    const data = this.getAll();
	    data[key] = value;

	    this.save(data);
	}

	delete(key){
		const data = this.getAll();
		const deleted = data[key];

		delete data[key];

		this.save(data);

		return deleted;
	}
	clear(){
		this.save({});
	}

	getAll(){
		return JSONRead(this.path);
	}
	get(key){
		try{
			return this.getAll()[key];
		}catch(e){

		}
	}
}

module.exports = JSONDatabase;

function JSONWrite(path, data, check = false){
	try{
		data = JSON.stringify(data, null, '\t');
	}catch(e){
		throw new DatabaseError('Circular structures cannot be stored');
	}

	try{
		fs.writeFileSync(path, data);
	}catch(e){}

	if(check){
		const dataInJSON = fs.readFileSync(path, 'utf-8');

		if(dataInJSON !== data){
			const path2 = `../backup-${Date.now()}.json`;

			JSONWrite(path2, data);
			throw new DatabaseError(`Error writing JSON in '${path}', data saved in '${path2}'`);
		}
	}
}

function JSONRead(path){
	let data = {};

	try{
		data = fs.readFileSync(path, 'utf-8');
	}catch(e){
		throw new DatabaseError(`the database in ${path} was deleted`);
	}

	try{
		// @ts-ignore
		data = JSON.parse(data);
	}catch(e){
		throw new DatabaseError(`Error parsing JSON in '${path}'`);
	}

	return data;
}

