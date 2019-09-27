const request = require("supertest");
const moment = require("moment");

const db = require("../data/dbConfig");
const server = require("../api/server");

const databaseTables = ["EventTypes", "Events", "Schedules"];

describe("Events endpoint testing", () => {
	// Clean up database after each test

	afterEach(async () => {
		for (let i = 0; i < databaseTables.length; i++) {
			await db.raw(`TRUNCATE TABLE "${databaseTables[i]}" CASCADE`);
		}
	});

	afterAll(() => db.destroy());

	describe("GET /events", () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert"
		};

		const scheduleData = [
			{
				id: 10,
				event_id: 1,
				sequence: 1,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: moment()
					.add(10, "days")
					.calendar(),
				end_date_time: moment()
					.add(10, "days")
					.add(2, "hours")
					.calendar()
			},
			{
				id: 11,
				event_id: 1,
				sequence: 2,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "The Phoenix",
				city: "The Phoenix",
				postal_code: "64105",
				country: "USA",
				start_date_time: moment()
					.add(12, "days")
					.calendar(),
				end_date_time: moment()
					.add(12, "days")
					.add(2, "hours")
					.calendar()
			},
			{
				id: 12,
				event_id: 1,
				sequence: 3,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "Madison Square Garden",
				city: "New York City",
				postal_code: "10001",
				country: "USA",
				start_date_time: moment()
					.add(15, "days")
					.calendar(),
				end_date_time: moment()
					.add(15, "days")
					.add(2, "hours")
					.calendar()
			},
			{
				id: 13,
				event_id: 2,
				sequence: 1,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "The Phoenix",
				city: "Kansas City",
				postal_code: "64105",
				country: "USA",
				start_date_time: moment()
					.add(17, "days")
					.calendar(),
				end_date_time: moment()
					.add(17, "days")
					.add(2, "hours")
					.calendar()
			},
			{
				id: 14,
				event_id: 2,
				sequence: 2,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: moment()
					.add(18, "days")
					.calendar(),
				end_date_time: moment()
					.add(18, "days")
					.add(2, "hours")
					.calendar()
			},
			,
			{
				id: 15,
				event_id: 3,
				sequence: 1,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: moment()
					.add(19, "days")
					.calendar(),
				end_date_time: moment()
					.add(19, "days")
					.add(2, "hours")
					.calendar()
			}
		];

		const testData = [
			{
				id: 1,
				type: 1,
				title: "See Bifunkal Orchestra",
				description: "Orchestrated Blues and Funk",
				event_image: "Bifunkal Image Here",
				capacity: 5000
			},
			{
				id: 2,
				type: 1,
				title: "TEDx Muncie",
				description: "TEDx event in Muncie, Indiana",
				event_image: "TEDx logo",
				capacity: 350
			},
			{
				id: 3,
				type: 1,
				title: "Hair and back again with Kylie Jenner",
				description: "Kylie Jenner Fan Club Meetup",
				event_image: "KJ logo",
				capacity: 3000
			},
			{
				id: 4,
				type: 1,
				title: "Nerd Fitness Bootcamp",
				description: "Nerd Fitness Reloaded Bootcamp Tour",
				event_image: "NF logo url",
				capacity: 50
			}
		];

		beforeEach(async () => {
			await db("EventTypes").insert(typesData);
			await db("Events").insert(testData);
			await db("Schedules").insert(scheduleData);
		});

		it("should returns status code 200", async () => {
			const res = await request(server).get("/api/events");
			expect(res.status).toBe(200);
		});

		it("should return all events in test database", async () => {
			const res = await request(server).get("/api/events");
			expect(res.body.length).toEqual(testData.length);
		});

		it("should return all schedules for all events in test database", async () => {
			const res = await request(server).get("/api/events");

			expect(res.body[0].schedule.length).toEqual(3);
		});
	});

	describe("GET /events/:id", () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert"
		};

		const scheduleData = [
			{
				id: 10,
				event_id: 1,
				sequence: 1,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: moment()
					.add(10, "days")
					.calendar(),
				end_date_time: moment()
					.add(10, "days")
					.add(2, "hours")
					.calendar()
			},
			{
				id: 11,
				event_id: 1,
				sequence: 2,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "The Phoenix",
				city: "The Phoenix",
				postal_code: "64105",
				country: "USA",
				start_date_time: moment()
					.add(12, "days")
					.calendar(),
				end_date_time: moment()
					.add(12, "days")
					.add(2, "hours")
					.calendar()
			},
			{
				id: 12,
				event_id: 1,
				sequence: 3,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "Madison Square Garden",
				city: "New York City",
				postal_code: "10001",
				country: "USA",
				start_date_time: moment()
					.add(15, "days")
					.calendar(),
				end_date_time: moment()
					.add(15, "days")
					.add(2, "hours")
					.calendar()
			}
		];

		const testData = [
			{
				id: 1,
				type: 1,
				title: "See Bifunkal Orchestra",
				description: "Orchestrated Blues and Funk",
				event_image: "Bifunkal Image Here",
				capacity: 5000
			},
			{
				id: 2,
				type: 1,
				title: "TEDx Muncie",
				description: "TEDx event in Muncie, Indiana",
				event_image: "TEDx logo",
				capacity: 350
			},
			{
				id: 3,
				type: 1,
				title: "Hair and back again with Kylie Jenner",
				description: "Kylie Jenner Fan Club Meetup",
				event_image: "KJ logo",
				capacity: 3000
			},
			{
				id: 4,
				type: 1,
				title: "Nerd Fitness Bootcamp",
				description: "Nerd Fitness Reloaded Bootcamp Tour",
				event_image: "NF logo url",
				capacity: 50
			}
		];

		beforeEach(async () => {
			await db("EventTypes").insert(typesData);
			await db("Events").insert(testData);
			await db("Schedules").insert(scheduleData);
		});

		it("/events/:id return event by id", async () => {
			const id = 2;
			const res = await request(server).get(`/api/events/${id}`);
			expect(res.status).toBe(200);
			expect(res.body.title).toBe(testData[id - 1].title);
		});

		it("return 404 status code for missing record", async () => {
			const id = 9999;
			const res = await request(server).get(`/api/events/${id}`);
			expect(res.status).toBe(404);
		});

		it("should return all schedules for an event", async () => {
			const id = 1;
			const res = await request(server).get(`/api/events/${id}`);

			expect(res.body.schedule.length).toEqual(scheduleData.length);
		});
	});

	describe("POST /events", () => {
		const typesData = {
			id: 1,
			description: "Concert"
		};

		const testData = {
			id: 1,
			type: 1,
			title: "See Bifunkal Orchestra",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000
		};
		beforeEach(async () => {
			await db("EventTypes").insert(typesData);
		});
		it("will receive status code that record was created", async () => {
			const res = await request(server)
				.post("/api/events")
				.send(testData);
			expect(res.status).toBe(201);
		});

		it("should receive the new event", async () => {
			const res = await request(server)
				.post("/api/events")
				.send(testData);
			expect(res.body.id).toBe(1);
			expect(res.body.title).toBe(testData.title);
			expect(res.body.description).toBe(testData.description);
		});
	});

	describe("UPDATE /events/:id", () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert"
		};

		const testData = [
			{
				id: 1,
				type: 1,
				title: "See Bifunkal Orchestra",
				description: "Orchestrated Blues and Funk",
				event_image: "Bifunkal Image Here",
				capacity: 5000
			},
			{
				id: 2,
				type: 1,
				title: "TEDx Muncie",
				description: "TEDx event in Muncie, Indiana",
				event_image: "TEDx logo",
				capacity: 350
			},
			{
				id: 3,
				type: 1,
				title: "Hair and back again with Kylie Jenner",
				description: "Kylie Jenner Fan Club Meetup",
				event_image: "KJ logo",
				capacity: 3000
			},
			{
				id: 4,
				type: 1,
				title: "Nerd Fitness Bootcamp",
				description: "Nerd Fitness Reloaded Bootcamp Tour",
				event_image: "NF logo url",
				capacity: 50
			}
		];

		beforeEach(async () => {
			await db("EventTypes").insert(typesData);
			await db("Events").insert(testData);
		});

		it("update existing record", async () => {
			const id = 1;
			const updateData = { title: "See Bifunkal Orchestra 9" };
			const res = await request(server)
				.put(`/api/events/${id}`)
				.send(updateData);
			expect(res.status).toBe(200);
			expect(res.body.title).toBe(updateData.title);
		});

		it(`test update timestamp`, async () => {
			const id = 3;
			const updateData = { user_id: 999 };
			const res = await request(server)
				.put(`/api/events/${id}`)
				.send(updateData);
			expect(res.body.updated_at).not.toBeNull();
		});
	});

	describe("DELETE /events/:id", () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert"
		};

		const testData = [
			{
				id: 1,
				type: 1,
				title: "See Bifunkal Orchestra",
				description: "Orchestrated Blues and Funk",
				event_image: "Bifunkal Image Here",
				capacity: 5000
			},
			{
				id: 2,
				type: 1,
				title: "TEDx Muncie",
				description: "TEDx event in Muncie, Indiana",
				event_image: "TEDx logo",
				capacity: 350
			},
			{
				id: 3,
				type: 1,
				title: "Hair and back again with Kylie Jenner",
				description: "Kylie Jenner Fan Club Meetup",
				event_image: "KJ logo",
				capacity: 3000
			},
			{
				id: 4,
				type: 1,
				title: "Nerd Fitness Bootcamp",
				description: "Nerd Fitness Reloaded Bootcamp Tour",
				event_image: "NF logo url",
				capacity: 50
			}
		];

		beforeEach(async () => {
			await db("EventTypes").insert(typesData);
			await db("Events").insert(testData);
		});

		it("confirm successful deletion", async () => {
			const id = 2;
			const res = await request(server).delete(`/api/events/${id}`);
			expect(res.status).toBe(200);
		});

		it("confirm event no longer exists", async () => {
			const id = 2;
			await request(server).delete(`/api/events/${id}`);
			const res = await request(server).get(`/api/events/${id}`);
			expect(res.status).toBe(404);
		});
	});
});
