const request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../api/server')

describe('Tickets endpoint testing', () => {
  // Clean up database after each test
  afterEach(async () => {
    await db('Tickets').truncate()
  })

  describe('GET /tickets', () => {
    // Seed with test data
    const testData = [
        { 
            id: 1,
            type: 1,
            user_id: 1,
            event_id: 1
        },
        { 
            id: 2,
            type: 1,
            user_id: 2,
            event_id: 2
        },
        { 
            id: 3,
            type: 1,
            user_id: 3,
            event_id: 3
        },
        { 
            id: 4,
            type: 1,
            user_id: 4,
            event_id: 4
        } 
    ]

    beforeEach(async () => {
      await db('Tickets').insert(testData)
    })

    it('should returns status code 200', async () => {
      const res = await request(server).get('/api/tickets')
      expect(res.status).toBe(200)
    })

    it('should return all tickets in test database', async () => {
      const res = await request(server).get('/api/tickets')
      expect(res.body.length).toEqual(testData.length)
    })
  })

  describe('GET /tickets/:id', () => {
    // Seed with test data
    const testData = [
    { 
        id: 1,
        type: 1,
        user_id: 1,
        event_id: 1
    },
    { 
        id: 2,
        type: 1,
        user_id: 2,
        event_id: 2
    },
    { 
        id: 3,
        type: 1,
        user_id: 3,
        event_id: 3
    },
    { 
        id: 4,
        type: 1,
        user_id: 4,
        event_id: 4
    } 
]

    beforeEach(async () => {
      await db('Tickets').insert(testData)
    })

    it('/tickets/:id return ticket by id', async () => {
      const id = 2
      const res = await request(server).get(`/api/tickets/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.event_id).toBe(testData[id-1].event_id)
    })

    it('return 404 status code for missing record', async () => {
      const id = 9999
      const res = await request(server).get(`/api/tickets/${id}`)
      expect(res.status).toBe(404)
    })

  })

  describe('POST /tickets', () => {
    const testData = { 
        id: 1,
        type: 1,
        user_id: 1,
        event_id: 1
    }

    it('will receive status code that record was created', async () => {
      const res = await request(server).post('/api/tickets').send(testData)
      expect(res.status).toBe(201)
    })

    it('should receive the new ticket', async () => {
      const res = await request(server).post('/api/tickets').send(testData)
      expect(res.body.id).toBe(1)
      expect(res.body.event_id).toBe(testData.event_id)
      expect(res.body.user_id).toBe(testData.user_id)
    })
  })

  describe('UPDATE /tickets/:id', () => {
    // Seed with test data
    const testData = [
        { 
            id: 1,
            type: 1,
            user_id: 1,
            event_id: 1
        },
        { 
            id: 2,
            type: 1,
            user_id: 2,
            event_id: 2
        },
        { 
            id: 3,
            type: 1,
            user_id: 3,
            event_id: 3
        },
        { 
            id: 4,
            type: 1,
            user_id: 4,
            event_id: 4
        } 
    ]

    beforeEach(async () => {
      await db('Tickets').insert(testData)
    })

    it('update existing record', async () => {
      const id = 1
      const updateData = { event_id: 6}
      const res = await request(server).put(`/api/tickets/${id}`).send(updateData)
      expect(res.status).toBe(200)
      expect(res.body.event_id).toBe(updateData.event_id)
    })

    it(`test update timestamp`, async () => {
      const id = 3
      const updateData = { user_id: 999 }
      const res = await request(server).put(`/api/tickets/${id}`).send(updateData)
      expect(res.body.updated_at).not.toBeNull()
    })
  })

  describe('DELETE /tickets/:id', () => {
    // Seed with test data
    const testData = [
        { 
            id: 1,
            type: 1,
            user_id: 1,
            event_id: 1
        },
        { 
            id: 2,
            type: 1,
            user_id: 2,
            event_id: 2
        },
        { 
            id: 3,
            type: 1,
            user_id: 3,
            event_id: 3
        },
        { 
            id: 4,
            type: 1,
            user_id: 4,
            event_id: 4
        } 
    ]

    beforeEach(async () => {
      await db('Tickets').insert(testData)
    })
    
    it('confirm successful deletion', async () => {
      const id = 2
      const res = await request(server).delete(`/api/tickets/${id}`)
      expect(res.status).toBe(200)
    })

    it('confirm ticket no longer exists', async () => {
      const id = 2
      await request(server).delete(`/api/tickets/${id}`)
      const res = await request(server).get(`/api/tickets/${id}`)
      expect(res.status).toBe(404)
    })

  })
})