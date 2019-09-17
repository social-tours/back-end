var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const jwtoken = require("jsonwebtoken");

var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://dev-r8zrga7p.auth0.com/.well-known/jwks.json"
	}),
	audience: process.env.AUDIENCE || "http://localhost:8080",
	issuer: "https://dev-r8zrga7p.auth0.com/",
	algorithms: ["RS256"]
});

const secret = process.env.JWT_SECRET;

function generateToken(user) {
	const payload = {
		...jwtCheck,
		id: user.id
	};

	const options = {
		expiresIn: "1d"
	};

	return jwtoken.sign(payload, secret, options);
}

module.exports = {
	jwtCheck,
	generateToken
};
