// Instantiate database instance
const db = require("../dbConfig");

// ==== Global Database Methods ==== //
/**
 * Database model to get all records in a table
 * @param {string} table
 * @returns array of table records
 */
async function findAll(table) {
	let records;
	try {
		records = await db(table).orderBy("id");
	} catch (err) {
		console.log(err);
		records = [];
	}

	return records;
}

/**
 * Database model to get all records in a table given some search criteria
 * @param {string} table
 * @returns array of table records
 */
async function findAllbyId(table, id) {
	let records;
	try {
		records = await db(table)
			.where("event_id", id)
			.orderBy("sequence");
	} catch (err) {
		console.log(err);
		records = [];
	}
	return records;
}

/**
 * Database model to get a single record by id
 * @param {string} table
 * @param {integer} id
 * @returns database record
 */
async function findById(table, id) {
	try {
		let record = await db(table)
			.where({ id })
			.first();

		return record;
	} catch (err) {
		return err;
	}
}

/**
 * Database model to get a user record by email
 * @param {string} email
 * @returns database record
 */
async function findByEmail(email) {
	try {
		let record = await db("Users")
			.where({ email })
			.first();

		return record;
	} catch (err) {
		return err;
	}
}

/**
 * Database model to add a record
 * @param {string} table
 * @param {object} data
 * @returns newly created record
 */
async function addRecord(table, data) {
	try {
		const [records] = await db(table)
			.insert(data)
			.returning("*");

		return records;
	} catch (err) {
		return err;
	}
}

/**
 * Database method to update existing record
 * @param {string} table
 * @param {integer} id
 * @param {object} data
 * @returns updated record
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
 * @param {string} table
 * @param {integer} id
 * @returns deletion confirmation message in a json object
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
	findAllbyId,
	findById,
	findByEmail,
	addRecord,
	updateRecord,
	removeRecord
};
