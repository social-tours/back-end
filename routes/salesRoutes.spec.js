const request = require("supertest");

const db = require("../data/dbConfig");
const server = require("../api/server");

const databaseTables = ["EventTypes", "Events", "Schedules"];

// placeholder
describe("/sales endpoint", () => {
    it('one equals one', () => {
        expect(1).toBe(1);
    })
});