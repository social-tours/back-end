require("dotenv").config(); // activate module to read environmental variables

module.exports = {
	development: {
		client: "pg",
		useNullAsDefault: true,
		connection: {
			connectionString: process.env.DEV_DB_URL,
			ssl: true
		},
		pool: { min: 0, max: 7 },
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		},
		debug: true
	},

	testing: {
		client: "pg",
		useNullAsDefault: true,
		connection: {
			connectionString: process.env.TEST_DB_URL,
			ssl: true
		},
		pool: { min: 0, max: 7 },
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds/testing" // disposable generic boilerplate tables, not dev data
		},
		debug: false // too verbose of an operation
	},

	staging: {
		client: "pg",
		useNullAsDefault: true,
		connection: {
			connectionString: process.env.STAGING_DB_URL,
			ssl: true
		},
		pool: { min: 0, max: 7 },
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		},
		debug: true // could be either
	},

	production: {
		client: "pg",
		useNullAsDefault: true,
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: true
		},
		pool: { min: 0, max: 7 },
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds/production"
		},
		debug: false
	}
};
