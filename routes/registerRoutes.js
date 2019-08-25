const router = require('express').Router();
const bcrypt = require("bcryptjs");
const db = require('../data/models');

router.post('/', async (req,res,next) => {
    let { password } = req.body;
    let user;

    password = bcrypt.hashSync(password, 10);
    user = { ...req.body, password };

    if (!user.first_name || !user.last_name || !user.email || !user.password)
        res.status(400).json({ message: "All fields are required" });

    try {
        const result = await db.addRecord('Users', user);
        if (result) return res.status(201).json({ message: "User created" });

        return res.status(400).json({ message: "Something went wrong." });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;