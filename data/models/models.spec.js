const db = require("../dbConfig");
const bcrypt = require("bcryptjs");
const Models = require("./index");

const databaseTables = [
	"Users",
	"UserTypes",
	"Interests",
	"UserInterests",
	"Log",
	"Subscriptions",
	"EventTypes",
	"Events",
	"Schedules",
	"TicketTypes",
	"Tickets",
	"Sales"
];

describe("Models testing", () => {
	// Clean up database after each test
	afterEach(async () => {
		for (let i = 0; i < databaseTables.length; i++) {
			await db.raw(`TRUNCATE TABLE "${databaseTables[i]}" CASCADE`);
		}
	});

	describe("findAll()", () => {
		it("find all records in specified tables", async () => {
			// Seed with test data
			const userTypes = [
				{ id: 1, description: "Influencer" },
				{ id: 2, description: "Follower" }
			];

			await db("UserTypes").insert(userTypes);

			const testUsers = [
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
			];

			await db("Users").insert(testUsers);

			// Run Model
			const fetchUserTypes = await Models.findAll("UserTypes");
			const fetchUsers = await Models.findAll("Users");

			//Validate Model
			expect(fetchUserTypes.length).toBe(2);
			expect(fetchUsers[1].user_name).toEqual(testUsers[1].user_name);
		});
	});

	describe("findById()", () => {
		it("find record by id", async () => {
			// Seed with test data
			const userTypes = [
				{ id: 1, description: "Influencer" },
				{ id: 2, description: "Follower" }
			];

			await db("UserTypes").insert(userTypes);

			// Run model
			const fetchRecord = await Models.findById("UserTypes", 2);

			// Validate Model
			expect(fetchRecord.description).toEqual("Follower");
		});
	});

	describe("addRecord", () => {
		it("add records into the database", async () => {
			// Seed with test data
			const userTypes = [
				{ id: 1, description: "Influencer" },
				{ id: 2, description: "Follower" }
			];

			const testUsers = [
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
			];

			// Run model
			await Models.addRecord("UserTypes", userTypes);
			await Models.addRecord("Users", testUsers);

			// Validate model
			const data = await db("Users");
			expect(data).toHaveLength(testUsers.length);
			expect(data[1].first_name).toBe("George");
		});
	});
});
