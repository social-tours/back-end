const request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../api/server')

describe('Events endpoint testing', () => {
  // Clean up database after each test
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
    ]

    beforeEach(async () => {
      await db('Events').insert(testData)
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

  describe('GET /events/:id', () => {
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
]

    beforeEach(async () => {
      await db('Events').insert(testData)
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

  })

  describe('POST /events', () => {
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
      await db('Events').insert(testData)
    })

    it('update existing record', async () => {
      const id = 1
      const updateData = { title: 6}
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
      await db('Events').insert(testData)
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