const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
	// Insert seed entries
	await knex("Users").insert([
		{
			id: 1,
			first_name: "Yana",
			last_name: "Blake",
			user_name: "yblake",
			gender: "Female",
			birth_date: "1987-09-17",
			city: "Dallas",
			state_province: "TX",
			country: "USA",
			email: "yana@yogiyana.com",
			password: bcrypt.hashSync("pass", 12),
			type: 1
		},
		{
			id: 2,
			first_name: "George",
			last_name: "Kaplam",
			user_name: "gkaplan",
			gender: "Male",
			birth_date: "1955-11-05",
			city: "Hill Valley",
			state_province: "CA",
			country: "USA",
			email: "george@gmail.com",
			password: bcrypt.hashSync("pass", 12),
			type: 2
		},
		{
			id: 3,
			first_name: "Cindy",
			last_name: "Brady",
			user_name: "cbrady",
			gender: "Female",
			birth_date: "1995-10-05",
			city: "Chicago",
			state_province: "IL",
			country: "USA",
			email: "cindy@selfiequeen.com",
			password: bcrypt.hashSync("pass", 12),
			type: 1
		}
	]);

	await knex.raw(
		`SELECT setval(('"Users_id_seq"'::regclass), (SELECT MAX(id) from "Users"))`
	);
};
