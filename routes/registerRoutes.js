const router = require('express').Router();
const db = require('../data/models');

router.post('/', async (req,res,next) => {
    const user = req.body;

    try {
        const newUser = db.addRecord('Users', user);

        if (newUser){
            res.status(201).json({'message' : 'successfully created new user'});
        } else {
            res.status(400).json({'message' : 'could not create new user'});
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;