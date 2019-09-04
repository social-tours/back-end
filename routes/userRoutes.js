const bcrypt = require("bcryptjs");
const db = require("../data/models");
//const { jwtCheck } = require("../auth/tokenService"); temporarily disabled during FE dev phase

module.exports = server => {
	server.post("/api/register", register);
	server.post("/api/login", login);
	server.get("/api/users/:id", fetchUsers);
	server.get("/api/users", fetchUsers);
	server.put("/api/users/:id", profileUpdate);
	server.delete("/api/users/:id", userDelete);
};

/**
 * Endpoint to register a new user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function register(req, res) {
	// implement user registration
	let { password } = req.body;
	let user;

	password = bcrypt.hashSync(password, 10);
	user = { ...req.body, password };
	if (!user.first_name || !user.last_name || !user.email || !user.password)
		res.status(400).json({ message: "All fields are required" });

	try {
		const result = await db.addRecord("Users", user);

		if (result) return res.status(201).json(result);

		return res.status(400).json({ message: "Something went wrong." });
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong." });
	}
}

/**
 * Endpoint for logging in a user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function login(req, res) {
	// implement user login
	const { email, password } = req.body;

	try {
		const user = await db.findByEmail(email);
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = tokenService.generateToken(user);
			res.status(200).json({
				message: "Login successful",
				user: {
					id: user.id,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email
				},
				token
			});
		} else {
			res.status(401).json({ message: "Something went wrong." });
		}
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong." });
	}
}

/** Endpoint to retrieve user information
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function fetchUsers(req, res) {
	const { id } = req.params;

	try {
		if (id) {
			const user = await db.findById("Users", id);

			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: "user not found" });
			}
		} else {
			const users = await db.findAll("Users");
			res.status(200).json(users);
		}
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong." });
	}
}

/** Endpoint to retrieve user information
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function profileUpdate(req, res) {
	const { id } = req.params;

	try {
		const data = await db.updateRecord("Users", id, req.body);
		if (data) {
			res.send(data);
		} else throw err;
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong." });
	}
}

/** Endpoint to retrieve user information
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
async function userDelete(req, res) {
	const { id } = req.params;

	try {
		const data = await db.removeRecord("Users", id);
		if (data) {
			res.json(data);
		}
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong." });
	}
}
