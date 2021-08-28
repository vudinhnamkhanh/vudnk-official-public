# A module to do a database in a simple way in JSON or SQLite3

We leave you some links so you are informed about this module.

* We are working on a better documentation 😔
* [`NPM | Module`](https://npmjs.com/package/simple.db)
* [`Discord Server Support`](https://discord.com/invite/zrESMn6)

# Installation

```js
npm i simplest.db --save
```

if you don't want to use the SQLite database type, you should do 

```js
npm i simplest.db --save --no-optional
```

so `better-sqlite3` does not install.  
if you have any problem in the installation related to better-sqlite3 see [this](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/troubleshooting.md)


> If you have any error you can contact me on [Discord](https://discord.gg/zrESMn6) or [GitHub](https://github.com/Fabricio-191/simplest.db/issues) (i prefer Discord)

# Quick example

```js
const Database = require('simplest.db');
const db = new Database({
    path: './test.json'
})

db.set('ABC', null)
db.set('foo.bar', [123, 456])

console.log(db);
/*
Database {
    ABC: null,
    foo: {
        bar: [123, 456]
    }
}
*/

db.get('foo.bar[0]') //123
db.numbers.add('foo.bar[1]', 4) //460
db.array.push('foo.bar', 800) //[123, 460, 800]

console.log(db);
/*
Database {
    ABC: null,
    foo: {
        bar: [123, 460, 800]
    }
}
*/

console.log(db.entries)
/*
[
    {
        key: 'ABC',
        value: null
    }, 
    {
        key: 'foo',
        value: {
            bar: [123, 460, 800]
        }
    }
]
*/

console.log(db.keys)
//['ABC', 'foo']

console.log(db.values)
/*
[
    null, 
    {
        bar: [123, 460, 800]
    }
]
*/


db.delete('foo.bar')

/*
Database {
    ABC: null
    foo: {}
}
*/

db.clear()

//Database {}
```

# Index
* [Database](#database)
    * [set](#set-get-and-delete)
    * [get](#set-get-and-delete)
    * [delete](#set-get-and-delete)
    * [clear]()
    * [keys]()
    * [values]()
    * [entries]()
    * [number]()
        * [add]()
        * [subtract]()
    * [array]()
        * [push]()
        * [extract]()
        * [splice]()
        * [includes]()
        * [find]()
        * [findIndex]()
        * [filter]()
        * [map]()
        * [sort]()
        * [some]()
        * [every]()
        * [reduce]()
        * [random]()

## Database
```js
new Database(options);
//or 
Database.init(options);
```

Options need to be an object like this
```js
{ 
    path: './somepath.db', 
    type: 'SQLite',
    name: 'things',
    check: false,
    cacheType: 0
}
```

* `path` is where is going to be the file with the database. By default it's `./simple-db.json` for JSON and `./simple-db.sqlite` for SQLite

* `Type` it is the method to store data in the database it can be JSON or SQLite, SQLite needs `better-sqlite3` installed. If you don't specify a type, it will tried to get it from the path (if it ends in "sqlite" or "json"), otherwise, the default type is `JSON` 

* `name` is only required if the database type is `SQLite` (if you know SQL: it's the table name), `simple_db` by default.

* `check` is whenether to check or not if the value was stored correctly, `false` by default

* `cacheType` is explained below by default it's `1`

## cacheType
It is the method that the database will use to manage the cache.  

`0`: No cache (the database will be read every time a method is used)
`1`: Cache with copies (the database will use as cache, copies of the values that are entered and obtained, to avoid errors)
`2`: Cache (interactions occur directly with the cache)

Method 2 is the most efficient, but it has a problem, if you are new to programming, or want to avoid mistakes, don't use it.

```js
let db = new Database({
    path: './test.json',
    cacheType: 2
});

let obj = {
    num: 1
}

db.set('abc', obj);

console.log(db)
/*
Database {
    abc: {
        num: 1
    }
}
*/

obj.num += 30;

console.log(db)
/*
Database {
    abc: {
        num: 31
    }
}
*/


console.log(db.get('abc.num')) //31
//but the real stored value is still 1, you have only modified the cache value

db.set('abc.def', false);
//now the stored value in 'abc.num' is 31, cause thit set, saved that value from the cache
```

if you understood this, you can use this even to your advantage

## `key` and `value`

Values can be anything, you only have to take in account 1 thing, 
they are stored as JSON, you should read [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), in the `description` section, to understand how is it going to be stored.

The keys must be strings, they are parsed between dots `.` and brackets `[]`
Example:

`something.abc[0]` is parsed like `something abc 0`.  
So, you must understand this:
```js
db.set('something.abc[0]', null)

/*
Database {
    something: {
        abc: {
            '0': null
        }
    }
}
*/
```
This is not an error, this is supposed to work like this, it's javascript.  
If you think a little, you can access a normal property putting it as string bewteen brackets, so:

#### putting the property between brakets doesn't mean it's an array

___

Honestly, i will finish the documentation later.  

With what I already said, the use of almost all methods can be deduced, by the way, the code has JSDoc embedded.