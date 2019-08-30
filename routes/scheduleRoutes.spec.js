const request = require("supertest");

const db = require("../data/dbConfig");
const server = require("../api/server");

const databaseTables = ["EventTypes", "Events", "Schedules"];

describe("Schedules endpoint testing", () => {
	// Clean up database after each test
	afterEach(async () => {
		for (let i = 0; i < databaseTables.length; i++) {
			await db.raw(`TRUNCATE TABLE "${databaseTables[i]}" CASCADE`);
		}
	});

	// Seed a test event before each test
	beforeEach(async () => {
		await db("EventTypes").insert([
			{
				id: 1,
				description: "Concert",
				created_at: "2019-08-14",
				updated_at: "2019-08-15"
			}
		]);

		await db("Events").insert([
			{
				id: 1,
				type: 1, // FK ID in 'EventTypes' table
				title: "See Bifunkal Orchestra",
				description: "Orchestrated Blues and Funk",
				event_image: "Bifunkal Image Here",
				capacity: 5000,
				created_at: "2019-08-14",
				updated_at: "2019-08-15"
			}
		]);
	});

	describe("GET /schedules", () => {
		// Seed with test data
		const testData = [
			{
				id: 1,
				event_id: 1, // FK ID in 'Events' table
				sequence: 1,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: "2019-09-05 05:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
			}
		];

		beforeEach(async () => {
			await db("Schedules").insert(testData);
		});

		// Validate endpoint
		it("endpoint should be live", async () => {
			const res = await request(server).get("/api/schedules");
			expect(res.status).toBe(200);
		});

		it("endpoint should return test schedule data", async () => {
			const res = await request(server).get("/api/schedules");
			expect(res.body.length).toBe(1);
			expect(res.body[0].description).toEqual(testData[0].description);
		});
	});
});
