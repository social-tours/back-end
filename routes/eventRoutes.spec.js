const request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../api/server')



describe('Events endpoint testing', async () => {
	// Clean up database after each test

	const typesData = {
		id: 1,
		description: "Concert",
		created_at: "2019-08-14",
		updated_at: "2019-08-15"
	};
	try {
		let types = await db('EventTypes').where({id : 1});

		if (!types){
			types = await db('EventTypes').insert(typesData);
		}
	} catch (err){
		console.log(err);
	}
	


  afterEach(async () => {
    await db('Events').truncate()
  })

  describe('GET /events', () => {
		// Seed with test data
	
		
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
			await db('Events').insert(testData);
    })

    it('should returns status code 200', async () => {
      const res = await request(server).get('/api/events')
      expect(res.status).toBe(200)
    })

    it('should return all events in test database', async () => {
      const res = await request(server).get('/api/events')
      expect(res.body.length).toEqual(testData.length)
    })
  })
})