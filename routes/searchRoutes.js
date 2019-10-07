const router = require('express').Router();
import db from '../data/models'

router.get('/search/:name', async (req, res) => {
    let { name } = req.params;
    try {
        if (name !== 'undefined') {
            let records = await db.search(name);

            res.status(200).send(records);
        } else {
            res.send([]);
        }
    } catch (e) {
        res.send(e);
    }
})

module.exports = router;