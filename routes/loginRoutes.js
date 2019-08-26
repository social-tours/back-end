const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../data/models');

router.post('/', async (req,res,next) => {

    const { email, password } = req.body;

    try {
        const user = await db.findById('Users', email);

        if (user && bcrypt.compareSync(password, user.password)) {
        // need to figure out correct way to authenticate with front end client
        // currently sending back a test bearer token from auth0 api
        const token = '123456'
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
});

module.exports = router;