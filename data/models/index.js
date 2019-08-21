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
		console.log(`addRecord results`, results);

		return results;
	} catch (err) {
		return err;
	}
}

module.exports = {
	db,
	findAll,
	findById,
	addRecord
};
