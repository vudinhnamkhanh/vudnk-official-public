/* eslint-disable eqeqeq */
/* eslint-disable no-undefined */
/* eslint-disable default-param-last */
module.exports = {
	get(obj, props){
		if(props.length === 0){
			return obj;
		}

		return props.reduce((acc, prop) => {
			if(acc == undefined || acc[prop] == undefined){
				return undefined;
			}

			return acc[prop];
		}, obj);
	},
	set(obj = {}, props, value = null){
		if(props.length === 0){
			return value;
		}

		props.reduce((acc, prop, index) => {
			if(acc == undefined) return undefined;
			if(acc[prop] === undefined){
				acc[prop] = {};
			}

			if(index === props.length - 1){
				acc[prop] = value;
			}

			return acc[prop];
		}, obj);

		return obj;
	},
	delete(obj, props){
		const key = props.pop();

		obj = this.get(obj, props);

		if(obj == undefined) return;

		const deletedValue = obj[key];
		delete obj[key];

		return deletedValue;
	},
	clone(obj){
		try{
			return JSON.parse(
				JSON.stringify(obj)
			);
		}catch(e){
			return undefined;
		}
	},
};