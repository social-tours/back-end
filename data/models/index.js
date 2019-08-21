// Instantiate database instance
const db = require("../dbConfig");

// ==== Global Database Methods ==== //
function findAll(table) {
	return db(table).orderBy("id");
}

async function findById(table, id) {
	let result = await db(table)
		.where({ id })
		.first();

	return result;
}

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
