/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint no-unused-vars: "off"*/
const Database = require('../');
const { symbols } = require('../src/utils/utils');

const TO_TEST = [
	{
		path: './test.sqlite',
		name: 'economy',
		cacheType: 0,
	}, {
		path: './test.sqlite',
		name: 'economy',
		cacheType: 1,
		check: true,
	}, {
		path: './test.sqlite',
		name: 'economy',
		cacheType: 2,
	},

	{
		path: './test.json',
		cacheType: 0,
	}, {
		path: './test.json',
		cacheType: 1,
	}, {
		path: './test.json',
		cacheType: 2,
	}, {
		path: './test.json',
		cacheType: 0,
		check: true,
	}
];

function test(config){
	const db = Database.init(config);

	db.clear();

	db.set('253727823972401153', {
		username: 'Crater',
		money: {
			bank: 15000,
			wallet: 200,
			debt: 0,
		},
	});

	db.set('398321973404368927', {
		username: 'Hyuuh',
		money: {
			bank: 0,
			wallet: 1500,
			debt: 0,
		},
	});

	db.get('253727823972401153').money.wallet;
	// lo mismo
	db.get('253727823972401153.money.wallet');


	db.values.find(user => user.username === 'Crater');

	const money = db.get('253727823972401153.money');
	money.bank -= 405;
	money.wallet += 400;
	db.set('253727823972401153.money', money);
	// lo mismo
	db.number.subtract('253727823972401153.money.bank', 405);
	db.number.add('253727823972401153.money.wallet', 400);

	db.keys.forEach(key => {
		db.number.add(`${key}.money.bank`, 2500);
	});

	db.entries
		.filter(entry => entry.value.money.bank > 3000)
		.forEach(entry => {
			db.number.add(`${entry.key}.money.debt`, 200);
		});

	db.entries
		.forEach(entry => {
			if(entry.value.money.bank < 3000) return;
			db.number.add(`${entry.key}.money.debt`, 200);
		});

	db.array.push('123', false, true, false);
	db.array.extract('123', 1); // true

	return db;
}

TO_TEST.map(test);

console.log('Works well :D');