const jwt = require("jsonwebtoken");
const secrets = require("./secrets");

function generateToken(user) {
	return jwt.sign(
		{
			userId: user.id
		},
		secrets.jwtSecret,
		{
			expiresIn: "1y"
		}
	);
}

module.exports = generateToken;
