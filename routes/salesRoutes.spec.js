const request = require("supertest");

const db = require("../data/dbConfig");
const server = require("../api/server");

const databaseTables = [
	"TicketTypes",
	"Tickets",
	"Events",
	"EventTypes",
	"UserTypes",
	"Users"
];

describe("sales endpoint testing", () => {
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
				description: "Concert"
			}
		]);

		await db("Events").insert([
			{
				id: 1,
				type: 1, // FK ID in 'EventTypes' table
				title: "See Bifunkal Orchestra",
				description: "Orchestrated Blues and Funk",
				event_image: "Bifunkal Image Here",
				capacity: 5000
			}
		]);

		await db("TicketTypes").insert([
			{
				id: 1,
				title: "1", // FK ID in 'sales' table
				price: 49.99
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
				password: "pass",
				type: 1
			},
			{
				id: 2,
				first_name: "Yana",
				last_name: "Blake",
				user_name: "yblake",
				gender: "Female",
				birth_date: "1987-09-17",
				city: "Dallas",
				state_province: "TX",
				country: "USA",
				email: "yana2@yogiyana.com",
				password: "pass",
				type: 1
			},
			{
				id: 3,
				first_name: "Yana",
				last_name: "Blake",
				user_name: "yblake",
				gender: "Female",
				birth_date: "1987-09-17",
				city: "Dallas",
				state_province: "TX",
				country: "USA",
				email: "yana3@yogiyana.com",
				password: "pass",
				type: 1
			}
        ]);
        
        await db("Tickets").insert([
			{
				id: 1,
				type: 1, // FK ID in 'TicketTypes' table
				user_id: 1, // FK ID in 'Users' table
				event_id: 1
			},
			{
				id: 2,
				type: 1, // FK ID in 'TicketTypes' table
				user_id: 1, // FK ID in 'Users' table
				event_id: 1
			},
			{
				id: 3,
				type: 1, // FK ID in 'TicketTypes' table
				user_id: 1, // FK ID in 'Users' table
				event_id: 1
			}
		]);
	});

	describe("GET /sales", () => {
		// Seed with test data
		const testData = [
			{
                id: 1,
                ticket_id: "1", // FK ID in 'Tickets' table
                sale_amount: 49.99
            }
		];

		beforeEach(async () => {
			await db("Sales").insert(testData);
		});

		// Validate endpoint
		it("endpoint should be live", async () => {
			const res = await request(server).get("/api/sales");
			expect(res.status).toBe(200);
		});

		it("endpoint should return test sale data", async () => {
			const res = await request(server).get("/api/sales");
			expect(res.body.length).toBe(1);
			expect(res.body[0].sale_amount).toEqual('49.99');
		});
	});

	describe("GET /sales/:saleId", () => {
		// Seed with test data
		const testData = {
			id: 1,
			ticket_id: "1", // FK ID in 'Tickets' table
			sale_amount: 49.99
		}

		beforeEach(async () => {
			await db("Sales").insert(testData);
		});

		it("/sales/:saleId return sale by id", async () => {
			let saleId = 1;
			const res = await request(server).get(`/api/sales/${saleId}`);
			expect(res.status).toBe(200);
			expect(res.body.ticket_id).toEqual(1);
		});

		it("return 404 status for missing record", async () => {
			let saleId = 9999;
			const res = await request(server).get(`/api/sales/${saleId}`);
			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: `Record ${saleId} not found` });
		});
	});

	describe("POST /sales", () => {
		const testData = {
			id: 1,
			ticket_id: "1", // FK ID in 'Tickets' table
			sale_amount: 49.99
		}

		it("receive status code that record was created", async () => {
			const res = await request(server)
				.post("/api/sales")
				.send(testData);
			expect(res.status).toBe(201);
		});
	});

	describe("PUT /sales/:ticketId", () => {
		const testData ={
			id: 1,
			ticket_id: "1", // FK ID in 'Tickets' table
			sale_amount: 49.99
		}

		beforeEach(async () => {
			await db("Sales").insert(testData);
		});

		it("update existing record", async () => {
			let saleId = 1;
			const updateData = {
				sale_amount: 99.99
			};
			const res = await request(server)
				.put(`/api/sales/${saleId}`)
				.send(updateData);

			expect(res.status).toBe(200);
		});
	});

	describe("DELETE /sales/:saleId", () => {
		// Seed with test data
		const testData = {
			id: 1,
			ticket_id: "1", // FK ID in 'Tickets' table
			sale_amount: 49.99
		}

		beforeEach(async () => {
			await db("Sales").insert(testData);
		});

		it("confirm successful deletion", async () => {
			const saleId = 1;
			const res = await request(server).delete(`/api/sales/${saleId}`);
			expect(res.status).toBe(200);
		});

		it("confirm record no longer exists", async () => {
			const saleId = 1;
			await request(server).delete(`/api/sales/${saleId}`);
			const res = await request(server).get(`/api/sales/${saleId}`);
			expect(res.status).toBe(404);
		});
	});
});
