/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

/** Value stored in the database */
type Value = any;

/** Key to a position in the database */
type Key = string;

/** Database configuration */
interface DatabaseOptions{
	/**
	 * The path to the file with the database
	 * The default value depends on the database type,
	 * if it is JSON, the default value is `./simple-db.json`
	 * if it is SQLite, the default value is `./simple-db.sqlite`
	 */
	path?: string;

	/**
	 * Wich method use to store the data
	 * By default is `JSON`
	*/
	type?: 'JSON' | 'SQLite';

	/**
	 * Wich method use to manage the cache
	 * By default is `0`
	*/
	cacheType?: 0 | 1 | 2;

	/** Name of the SQLite table */
	name?: string;

	/**
	 * Whenether to check if the value was stored correctly
	 * `false` by default
	*/
    check?: boolean;
}

/** An key/value object that represent something stored in the database */
interface Entry{
    key: Key;
    value: Value;
}

declare class NumberUtils{
	/**
	 * A method to just add x number to a number stored in the database
     * @param key The key where the number is stored
     * @param value The amount to add to the stored number
     * @returns The new value of the stored number
    */
	add(key: Key, value: number): number;

	/**
	 * @param key The key where the number is stored
	 * @param value The amount to subtract to the stored number
	 * @returns The new value of the stored number
	*/
	subtract(key: Key, value: number): number;
}

declare class ArrayUtils{
	/**
	 * `Array.prototype.push` applied to an array in the database
	 * @param key The key to the array.
	 * @param values Values to insert into the array.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
	 * @returns The new array.
	*/
	push(key: Key, ...values: any[]): any[];

	/**
	 * A little similar to `Array.prototype.splice`, aplied to an array in the database
	 * @param key The key to the array.
	 * @param index A number (index in the array), a string that is in the array or a function that is passed to findIndex
	 * @example
	 * db.array.extract('Hyuuh.cases', 'Sexy')
	 * db.array.extract('Hyuuh.cases', 1)
	 * db.array.extract('Hyuuh.cases', value => value === 'Sexy')
	*/
	extract(key: Key, index: Function | string | number): any;

	/**
	 * `Array.prototype.splice` applied to an array in the database
	 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 * @param key The key to the array.
	 * @param start The index at which to start changing the array.
	 * @param deleteCount The number of elements to remove.
	 * @param items Elements to insert into the array in place of the deleted elements.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
	 * @returns The deleted values
	*/
	splice(key: Key, start: number, deleteCount: number, ...item: any[]): any[];


	/**
	 * `Array.prototype.includes` applied to an array in the database
	 * Determines whether an array includes a certain element, returning true or false as appropriate.
	 * @param key The key to the array.
	 * @param searchElement The element to search for.
	 * @param fromIndex The position in this array at which to begin searching for searchElement.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
	 * @returns true if the value is in the array, otherwise is false
	*/
	includes(key: Key, searchElement: any, fromIndex?: number): boolean;

	/**
	 * `Array.prototype.find` applied to an array in the database
	 * Returns the value of the first element in the array that satisfies the provided function.
	 * @param key The key to the array.
	 * @param callback Function that the value must satisfy.
	 * @param thisArg Value to use as this inside the callback.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
	 * @return The value.
	*/
	find(
        key: Key,
        callback: (value: any, index: number, obj: any[]) => unknown,
        thisArg?: any
    ): any;


	/**
	 * `Array.prototype.findIndex` applied to an array in the database
	 * Returns the index of the first element in the array where function is true, and -1 otherwise.
	 * @param key The key to the array.
	 * @param callback A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found
	 * @param thisArg Optional object to use as this inside the callback.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
	 * @returns The index of the element
	*/
	findIndex(
        key: Key,
        callback: (value: any, index: number, obj: any[]) => unknown,
        thisArg?: any
    ): number;


	/**
	 * `Array.prototype.filter` applied to an array in the database
	 * Returns the elements of an array that meet the condition specified in a callback function.
	 * @param key The key to the array.
	 * @param callback Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise.
	 * @param thisArg Value to use as this inside the callback.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	 * @return Array of values that satisfied the function
	 */
	filter(
        key: Key,
        callback: (value: any, index: number, obj: any[]) => unknown,
        thisArg?: any
    ): any[];


	/**
	 * `Array.prototype.map` applied to an array in the database
	 * This method creates a new array populated with the results of calling a provided function on every element in the calling array.
	 * @param key
	 * @param callback Function that is called for every element of arr. Each time callback executes, the returned value is added to new_array.
	 * @param thisArg Value to use as this when executing callback.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
	 * @return The new array
	 */
	map(
        key: Key,
        callback: (value: any, index: number, obj: any[]) => unknown,
        thisArg?: any
    ): any[];


	/**
	 * `Array.prototype.sort` applied to an array in the database
	 * The only diference is that this method does not modify de array stored in the database, just a copy of it
	 *
	 * Sorts the elements inside an array.
	 * @param key The key to the array.
	 * @param compareFunction Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	 * @returns An copy of the array with sorted values
	*/
	sort(
        key: Key,
        compareFn?: (a: any, b: any) => number
    ): any[];

	/**
	 * `Array.prototype.some` applied to an array in the database
	 * Tests whether at least one element in the array passes the test implemented by the provided function.
	 * @param key The key to the array.
	 * @param callback A function that accepts up to three arguments. The some method calls the callback function for each element in the array until the callback returns a value which is coercible to the Boolean value true, or until the end of the array.
	 * @param thisArg Value to use as this when executing callback.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
	 * @returns true if the callback function returns a truthy value for at least one element in the array. Otherwise, false.
	*/
	some(
        key: Key,
        callback: (value: any, index: number, obj: any[]) => unknown,
        thisArg?: any
    ): boolean;

	/**
	 * `Array.prototype.every` applied to an array in the database
	 * Tests whether all elements in the array passes the test implemented by the provided function.
	 * @param key The key to the array.
	 * @param callback A function that accepts up to three arguments. The every method calls the callback function for each element in the array until the callback returns a value which is coercible to the Boolean value false, or until the end of the array.
	 * @param thisArg Value to use as this when executing callback.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
	 * @returns true if the callback function returns a truthy value for every array element. Otherwise, false.
	*/
	every(
        key: Key,
        callback: (value: any, index: number, obj: any[]) => unknown,
        thisArg?: any
    ): boolean;

	/**
	 * `Array.prototype.reduce` applied to an array in the database
	 * This method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
	 * @param key The key to the array.
	 * @param callback A function to execute on each element in the array (except for the first, if no initialValue is supplied).
	 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callback function provides this value as an argument instead of an array value.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
	 * @returns The single value that results from the reduction.
	*/
	reduce(
        key: Key,
        callback: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any,
        initialValue: any
    ): any;

	/**
	 * Gets a random value from the array.
	 * @param key The key to the array.
	 * @returns A random value of the array, or undefined if the array is empty
	*/
	random(key: Key): any;
}


declare class Database{
	/**
	 * @class Database - This database class
    */
	constructor(options: DatabaseOptions);

	/**
	 * A method to retrieve data from the database
	 * @param key Key where the value is stored.
	 * @returns The stored value.
	*/
	get(key: Key): Value;


	/**
	 * A method to set data in the database
	 * @param key Key where the value is stored.
	 * @param value Value to set.
	 * @returns The stored value.
	*/
	set(key: Key, value?: Value): Value;

	/**
	 * A method to delete data in the database
	 * @param key Key where is the data to delete.
	 * @returns Deleted value.
	*/
	delete(key: Key): Value;

	/**
	 * Deletes all data in the database.
	 * @returns All data deleted.
	*/
	clear(): object;


	/**
	 * An getter that returns an array with all the data in the database, in form of entries (key/value objects).
	 * @returns Database entries
	*/
	get entries(): Entry[];

	/**
	 * An getter that returns an array with all database keys.
	 * @returns Database keys
	*/
	get keys(): Key[];

	/**
	 * An getter that returns an array with all database values.
	 * @returns Database values
	*/
	get values(): Value[];

	/**
	 * Special methods for facilitating storing and modifying numbers.
	*/
    number: NumberUtils;

    /**
	 * Special methods for facilitating storing and modifying arrays.
	*/
    array: ArrayUtils;

    /**
	 * Returns database data as a JSON string
     * @param beautify Whenever beautify the JSON or not
	*/
    toJSON(beautify: boolean): string;

    /**
	 * Another method to create a database
	 * @param options Database configuration
	*/
    static init(options: DatabaseOptions): Database;
}

export = Database;