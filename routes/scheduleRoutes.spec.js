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

	// Remove all database connections
	afterAll(() => db.destroy());

	// Seed a test event before each test
	beforeEach(async () => {
		await db("EventTypes").insert([
			{
				id: 1,
				description: "Concert",
				created_at: "2019-08-14"
			}
		]);

		await db("Events").insert([
			{
				id: 1,
				type: 1, // FK ID in 'EventTypes' table
				title: "See Bifunkal Orchestra",
				description: "Orchestrated Blues and Funk",
				event_image: "Bifunkal Image Here",
				created_at: "2019-08-14"
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
				capacity: 5000,
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

	describe("GET /schedules/:scheduleId", () => {
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
				capacity: 5000,
				start_date_time: "2019-09-05 05:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
			},
			{
				id: 2,
				event_id: 1, // FK ID in 'Events' table
				sequence: 2,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "Madison Square Garden",
				city: "New York City",
				postal_code: "10001",
				country: "USA",
				capacity: 5000,
				start_date_time: "2019-10-17 08:00 PM",
				end_date_time: "2019-10-17 10:00 PM"
			}
		];

		beforeEach(async () => {
			await db("Schedules").insert(testData);
		});

		it("/schedules/:scheduleId return schedule by id", async () => {
			let scheduleId = 2;
			const res = await request(server).get(`/api/schedules/${scheduleId}`);
			expect(res.status).toBe(200);
			expect(res.body.location).toEqual(testData[scheduleId - 1].location);
		});

		it("return 404 status for missing record", async () => {
			let scheduleId = 9999;
			const res = await request(server).get(`/api/schedules/${scheduleId}`);
			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: `Record ${scheduleId} not found` });
		});
	});

	describe("POST /schedules", () => {
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
				capacity: 5000,
				start_date_time: "2019-09-05 05:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
			}
		];

		it("receive status code that record was created", async () => {
			const res = await request(server)
				.post("/api/schedules")
				.send(testData);
			expect(res.status).toBe(201);
		});

		it("should receive the new schedule", async () => {
			const res = await request(server)
				.post("/api/schedules")
				.send(testData);
			expect(res.body.id).toBe(1);
			expect(res.body.title).toEqual("Bifunkal Event Schedule");
			expect(res.body.description).toBe("Blues band from Chicago");
		});
	});

	describe("PUT /schedules/:scheduleId", () => {
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
				capacity: 5000,
				start_date_time: "2019-09-05 05:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
			}
		];

		beforeEach(async () => {
			await db("Schedules").insert(testData);
		});

		it("update existing record", async () => {
			let scheduleId = 1;
			const updateData = {
				location: "The Phoenix",
				city: "Kansas City",
				postal_code: "64105"
			};
			const res = await request(server)
				.put(`/api/schedules/${scheduleId}`)
				.send(updateData);

			expect(res.status).toBe(200);
			expect(res.body.location).toEqual(updateData.location);
			expect(res.body.postal_code).toBe(updateData.postal_code);
		});
	});

	describe("DELETE /schedules/:scheduleId", () => {
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
				capacity: 5000,
				start_date_time: "2019-09-05 05:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
			}
		];

		beforeEach(async () => {
			await db("Schedules").insert(testData);
		});

		it("confirm successful deletion", async () => {
			const scheduleId = 1;
			const res = await request(server).delete(`/api/schedules/${scheduleId}`);
			expect(res.status).toBe(200);
			expect(res.body).toEqual({ message: `1 record deleted` });
		});

		it("confirm record no longer exists", async () => {
			const scheduleId = 1;
			await request(server).delete(`/api/schedules/${scheduleId}`);
			const res = await request(server).get(`/api/schedules/${scheduleId}`);
			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: `Record ${scheduleId} not found` });
		});
	});
});
