const request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../api/server')

const databaseTables = [
	"EventTypes",
	"Events",
	"Schedules"
];

describe('Events endpoint testing',  () => {
	// Clean up database after each test

  afterEach(async () => {
		for (let i = 0; i < databaseTables.length; i++) {
			await db.raw(`TRUNCATE TABLE "${databaseTables[i]}" CASCADE`);
		}
	});

	afterAll(() => db.destroy())

  describe('GET /events', () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert",
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
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
				start_date_time: "2019-09-05 05:00 PM",
				end_date_time: "2019-09-05 06:00 PM"
			},
			{
				id: 11,
				event_id: 1,
				sequence: 2,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: "2019-09-05 06:00 PM",
				end_date_time: "2019-09-05 07:00 PM"
			},{
				id: 12,
				event_id: 1,
				sequence: 3,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: "2019-09-05 07:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
			},
			,
			{
				id: 13,
				event_id: 2,
				sequence: 1,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: "2019-09-05 06:00 PM",
				end_date_time: "2019-09-05 07:00 PM"
			},{
				id: 14,
				event_id: 2,
				sequence: 2,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: "2019-09-05 07:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
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
				start_date_time: "2019-09-05 06:00 PM",
				end_date_time: "2019-09-05 07:00 PM"
			}
		];

    const testData = [
        {
			id: 1,
			type: 1,
			title: "See Bifunkal Orchestra",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 2,
			type: 1,
			title: "See Bifunkal Orchestra 2",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 3,
			type: 1,
			title: "See Bifunkal Orchestra 3",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 4,
			type: 1,
			title: "See Bifunkal Orchestra 4",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		}
    ];

    beforeEach(async () => {
			await db('EventTypes').insert(typesData);
			await db('Events').insert(testData);
			await db('Schedules').insert(scheduleData);
    })

    it('should returns status code 200', async () => {
      const res = await request(server).get('/api/events')
      expect(res.status).toBe(200)
    })

    it('should return all events in test database', async () => {
      const res = await request(server).get('/api/events')
      expect(res.body.length).toEqual(testData.length)
		})

	it('should return all schedules for all events in test database', async () => {
			const res = await request(server).get('/api/events');
			
			expect(res.body[0].schedule.length).toEqual(3);
			expect(res.body[1].schedule.length).toEqual(2);
			expect(res.body[2].schedule.length).toEqual(1);
	})
		
  })

  describe('GET /events/:id', () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert",
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
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
				start_date_time: "2019-09-05 05:00 PM",
				end_date_time: "2019-09-05 06:00 PM"
			},
			{
				id: 11,
				event_id: 1,
				sequence: 2,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: "2019-09-05 06:00 PM",
				end_date_time: "2019-09-05 07:00 PM"
			},{
				id: 12,
				event_id: 1,
				sequence: 3,
				title: "Bifunkal Event Schedule",
				description: "Blues band from Chicago",
				location: "House of Blues",
				city: "Chicago",
				postal_code: "60654",
				country: "USA",
				start_date_time: "2019-09-05 07:00 PM",
				end_date_time: "2019-09-05 08:00 PM"
			}
		];
		
    const testData = [
        {
			id: 1,
			type: 1,
			title: "See Bifunkal Orchestra",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 2,
			type: 1,
			title: "See Bifunkal Orchestra 2",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 3,
			type: 1,
			title: "See Bifunkal Orchestra 3",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 4,
			type: 1,
			title: "See Bifunkal Orchestra 4",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		}
];

    beforeEach(async () => {
			await db('EventTypes').insert(typesData);
			await db('Events').insert(testData);
			await db('Schedules').insert(scheduleData);
    })

    it('/events/:id return event by id', async () => {
      const id = 2
      const res = await request(server).get(`/api/events/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.title).toBe(testData[id-1].title)
    })

    it('return 404 status code for missing record', async () => {
      const id = 9999
      const res = await request(server).get(`/api/events/${id}`)
      expect(res.status).toBe(404)
		})
		
		it('should return all schedules for an event', async () => {
			const id = 1;
			const res = await request(server).get(`/api/events/${id}`)
			
			expect(res.body.schedule.length).toEqual(scheduleData.length)
		})

  })

  describe('POST /events', () => {
		const typesData = {
			id: 1,
			description: "Concert",
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		};

    const testData = {
        id: 1,
        type: 1,
        title: "See Bifunkal Orchestra",
        description: "Orchestrated Blues and Funk",
        event_image: "Bifunkal Image Here",
        capacity: 5000,
        created_at: "2019-08-14",
        updated_at: "2019-08-15"
    }
		beforeEach(async () => {
			await db('EventTypes').insert(typesData);
    })
    it('will receive status code that record was created', async () => {
      const res = await request(server).post('/api/events').send(testData)
      expect(res.status).toBe(201)
    })

    it('should receive the new event', async () => {
      const res = await request(server).post('/api/events').send(testData)
      expect(res.body.id).toBe(1)
      expect(res.body.title).toBe(testData.title)
      expect(res.body.description).toBe(testData.description)
    })
  })

  describe('UPDATE /events/:id', () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert",
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		};
	
    const testData = [
        {
			id: 1,
			type: 1,
			title: "See Bifunkal Orchestra 1",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 2,
			type: 1,
			title: "See Bifunkal Orchestra 2",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 3,
			type: 1,
			title: "See Bifunkal Orchestra 3",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 4,
			type: 1,
			title: "See Bifunkal Orchestra 4",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		}
    ]

    beforeEach(async () => {
			await db('EventTypes').insert(typesData);
      await db('Events').insert(testData);
    })

    it('update existing record', async () => {
      const id = 1
      const updateData = { title : "See Bifunkal Orchestra 9" }
      const res = await request(server).put(`/api/events/${id}`).send(updateData)
      expect(res.status).toBe(200)
      expect(res.body.title).toBe(updateData.title)
    })

    it(`test update timestamp`, async () => {
      const id = 3
      const updateData = { user_id: 999 }
      const res = await request(server).put(`/api/events/${id}`).send(updateData)
      expect(res.body.updated_at).not.toBeNull()
    })
  })

  describe('DELETE /events/:id', () => {
		// Seed with test data
		const typesData = {
			id: 1,
			description: "Concert",
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		};

    const testData = [
        {
			id: 1,
			type: 1,
			title: "See Bifunkal Orchestra 1",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 2,
			type: 1,
			title: "See Bifunkal Orchestra 2",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 3,
			type: 1,
			title: "See Bifunkal Orchestra 3",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		},
        {
			id: 4,
			type: 1,
			title: "See Bifunkal Orchestra 4",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		}
    ]

    beforeEach(async () => {
			await db('EventTypes').insert(typesData);
      await db('Events').insert(testData);
    })
    
    it('confirm successful deletion', async () => {
      const id = 2
      const res = await request(server).delete(`/api/events/${id}`)
      expect(res.status).toBe(200)
    })

    it('confirm event no longer exists', async () => {
      const id = 2
      await request(server).delete(`/api/events/${id}`)
      const res = await request(server).get(`/api/events/${id}`)
      expect(res.status).toBe(404)
    })

	})
})