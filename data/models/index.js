// Instantiate database instance
const db = require("../dbConfig");

// ==== Global Database Methods ==== //
/**
 * Database model to get all records in a table
 * @param {string} table
 * @returns result - array of table contents
 */
function findAll(table) {
	return db(table).orderBy("id");
}

/**
 * Database model to get a single record by id
 * @param {*} table
 * @param {*} id
 * @returns result - database record
 */
async function findById(table, id) {
	let result = await db(table)
		.where({ id })
		.first();

	return result;
}

/**
 * Database model to add a record
 * @param {*} table
 * @param {*} data
 * @returns results - newly created record
 */
async function addRecord(table, data) {
	try {
		const [results] = await db(table)
			.insert(data)
			.returning("*");

		return results;
	} catch (err) {
		return err;
	}
}

/**
 * Database method to update existing record
 * @param {*} table
 * @param {*} id
 * @param {*} data
 * @returns result - updated record
 */
async function updateRecord(table, id, data) {
	try {
		const count = await db(table)
			.where({ id })
			.update(data)
			.update("updated_at", db.fn.now());

		if (count > 0) {
			return findById(table, id);
		}
	} catch (err) {
		return err;
	}
}

/**
 * Database method to remove record from the database
 * @param {*} table
 * @param {*} id
 * @returns delete confirmation message in a json object
 */
async function removeRecord(table, id) {
	try {
		const count = await db(table)
			.where({ id })
			.del();
		if (count > 0) {
			return {
				message: `${count} ${count > 1 ? "records" : "record"} deleted`
			};
		}
	} catch (err) {
		return err;
	}
}

module.exports = {
	db,
	findAll,
	findById,
	addRecord,
	updateRecord,
	removeRecord
};
