const request = require("supertest");

const db = require("../data/dbConfig");
const server = require("../api/server");
const bcrypt = require('bcryptjs');

const databaseTables = ["TicketTypes", "Tickets", "Events", "EventTypes", "UserTypes", "Users"];

describe("Tickets endpoint testing", () => {
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
        
        await db("TicketTypes").insert([
            {
                id: 1,
                title: "1", // FK ID in 'Tickets' table
                price: 49.99,
                created_at: "2019-08-14",
                updated_at: "2019-08-15"
            }
        ]);

        await db("UserTypes").insert([
            { id: 1, description: "Influencer" },
            { id: 2, description: "Follower" }
        ]);

        await db("Users").insert([
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
            }
        ]);
    

	describe("GET /tickets", () => {
		// Seed with test data
		const testData = [
			{
                id: 1,
                type: 1, // FK ID in 'TicketTypes' table
                user_id: 1, // FK ID in 'Users' table
                event_id: 1
            },
            {
                id: 2,
                type: 1, // FK ID in 'TicketTypes' table
                user_id: 2, // FK ID in 'Users' table
                event_id: 1
            },
            {
                id: 3,
                type: 1, // FK ID in 'TicketTypes' table
                user_id: 3, // FK ID in 'Users' table
                event_id: 1
            }
		];

		beforeEach(async () => {
			await db("Tickets").insert(testData);
		});

		// Validate endpoint
		it("endpoint should be live", async () => {
			const res = await request(server).get("/api/tickets");
			expect(res.status).toBe(200);
		});

		it("endpoint should return test ticket data", async () => {
			const res = await request(server).get("/api/tickets");
			expect(res.body.length).toBe(3);
			expect(res.body[0].user_id).toEqual(1);
		});
	});

	describe("GET /tickets/:ticketId", () => {
		// Seed with test data
		const testData = {
			id: 1,
			type: 1, // FK ID in 'TicketTypes' table
			user_id: 1, // FK ID in 'Users' table
			event_id: 1
		}

		beforeEach(async () => {
			await db("Tickets").insert(testData);
		});

		it("/tickets/:ticketId return ticket by id", async () => {
			let ticketId = 1;
			const res = await request(server).get(`/api/tickets/${ticketId}`);
			expect(res.status).toBe(200);
			expect(res.body.event_id).toEqual(1);
		});

		it("return 404 status for missing record", async () => {
			let ticketId = 9999;
			const res = await request(server).get(`/api/tickets/${ticketId}`);
			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: `Record ${ticketId} not found` });
		});
	});

	describe("POST /tickets", () => {
		const testData = {
			id: 1,
			type: 1, // FK ID in 'TicketTypes' table
			user_id: 1, // FK ID in 'Users' table
			event_id: 1
		}

		it("receive status code that record was created", async () => {
			const res = await request(server)
				.post("/api/tickets")
				.send(testData);
			expect(res.status).toBe(201);
		});

		it("should receive the new ticket", async () => {
			const res = await request(server)
				.post("/api/tickets")
				.send(testData);
			expect(res.body.event_id).toBe(1);
		});
	});

	describe("PUT /tickets/:ticketId", () => {
		const testData = {
			id: 1,
			type: 1, // FK ID in 'TicketTypes' table
			user_id: 1, // FK ID in 'Users' table
			event_id: 1
		}

		beforeEach(async () => {
			await db("Tickets").insert(testData);
		});

		it("update existing record", async () => {
			let ticketId = 1;
			const updateData = {
				user_id : 2
			};
			const res = await request(server)
				.put(`/api/tickets/${ticketId}`)
				.send(updateData);

			expect(res.status).toBe(200);
			expect(res.body.user_id).toEqual(2);
		});
	});

	describe("DELETE /tickets/:ticketId", () => {
		// Seed with test data
		const testData = {
			id: 1,
			type: 1, // FK ID in 'TicketTypes' table
			user_id: 1, // FK ID in 'Users' table
			event_id: 1
		}

		beforeEach(async () => {
			await db("Tickets").insert(testData);
		});

		it("confirm successful deletion", async () => {
			const ticketId = 1;
			const res = await request(server).delete(`/api/tickets/${ticketId}`);
			expect(res.status).toBe(200);
		});

		it("confirm record no longer exists", async () => {
			const ticketId = 1;
			await request(server).delete(`/api/ticket/${ticketId}`);
			const res = await request(server).get(`/api/tickets/${ticketId}`);
			expect(res.status).toBe(404);
		});
	});
});
