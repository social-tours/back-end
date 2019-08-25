var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://dev-r8zrga7p.auth0.com/.well-known/jwks.json"
	}),
	audience: "http://localhost:8080",
	issuer: "https://dev-r8zrga7p.auth0.com/",
	algorithms: ["RS256"]
});

module.exports = {
	jwtCheck
};
