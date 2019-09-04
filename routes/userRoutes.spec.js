const request = require("supertest");
const bcrypt = require("bcryptjs");

const db = require("../data/dbConfig");
const server = require("../api/server");

const databaseTables = ["UserTypes", "Users"];

describe("Users endpoint testing", () => {
	// Clean up database after each test
	afterEach(async () => {
		for (let i = 0; i < databaseTables.length; i++) {
			await db.raw(`TRUNCATE TABLE "${databaseTables[i]}" CASCADE`);
		}
	});

	// Remove all database connections
	afterAll(() => db.destroy());

	// Seed UserTypes table before each test
	beforeEach(async () => {
		await db("UserTypes").insert([
			{ id: 1, description: "Influencer" },
			{ id: 2, description: "Follower" }
		]);
	});

	describe("GET /users", () => {
		// Seed with test data
		const testData = [
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

		beforeEach(async () => {
			await db("Users").insert(testData);
		});

		// Validate endpoint
		it("endpoint should be live", async () => {
			const res = await request(server).get("/api/users");
			expect(res.status).toBe(200);
		});

		it("endpoint should return test user data", async () => {
			const res = await request(server).get("/api/users");
			expect(res.body.length).toBe(3);
			expect(res.body[1].last_name).toEqual(testData[1].last_name);
		});
	});

	describe("GET /users/:userId", () => {
		// Seed with test data
		const testData = [
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

		beforeEach(async () => {
			await db("Users").insert(testData);
		});

		it("/users/:userId return user by id", async () => {
			let userId = 2;
			const res = await request(server).get(`/api/users/${userId}`);
			expect(res.status).toBe(200);
			expect(res.body.email).toEqual(testData[userId - 1].email);
		});

		it("return 404 status for missing record", async () => {
			let userId = 9999;
			const res = await request(server).get(`/api/users/${userId}`);
			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "user not found" });
		});
	});

	describe("POST /register", () => {
		const testData = {
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
		};

		it("receive status code that record was created", async () => {
			const res = await request(server)
				.post("/api/register")
				.send(testData);

			expect(res.status).toBe(201);
		});

		it("should register new user", async () => {
			const res = await request(server)
				.post("/api/register")
				.send(testData);

			expect(res.body.id).toBe(1);
			expect(res.body.first_name).toBe("Yana");
			expect(res.body.user_name).toBe("yblake");
		});
	});
});
