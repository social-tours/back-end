const router = require('express').Router();
const db = require('../data/models');

// DB methods don't exist yet, will need to refactor once data/models is complete

// get all events
router.get('/', async (req,res, next) => {
    try {
        // grab all events from db
        const events = await db.fetchEvents();
        // try to send the data back

        if (events){
            res.status(200).json({events});
        } else {
            res.status(404).json({"message" : "No events found"});
        }
    }
    catch(err){
        console.log(err);
    }
    

    // catch error, if any
})

// get one event
router.get('/:eventId', async (req,res,next) => {

    // grab even from param
    const {eventId} = req.params;

    // search database for event

    try {
        const event = await db.fetchEvent(eventId);

        if (event){
            res.status(200).json({event});

        } else {
            res.status(404).json({"message" : "Event not found"});
        }
    } 
    catch (err) {
        console.log(err);
    }
    

})

// put
router.put('/:eventId', async (req,res, next) => {
    const {eventId} = req.params;

    try {
        let event = await db.fetchEvent(eventId);

        if (event){
            const payload = req.body;
            event = {...payload};
            const newEvent = await db.updateEvent(eventId, event);

            if (newEvent){
                res.status(200).json({"message" : `successly updated event - ${eventId}`});
            } else {
                res.status(400).json({"message" : "Could not update event"});
            }

        }
    }
    catch (err){
        console.log(err);
    }

})

// post
router.post('/', async (req, res, next) => {
    const newEvent = req.body;

    try {
        // expecting db method to return event ID
        const eventId = db.addEvent(newEvent);

        if (event){
            res.status(201).json({"messsage" : `Created new event - ${eventId}`})
        } else {
            res.status(400).json({"message" : "Something went wrong. Could not create event."});
        }
    } catch  (err) {
        console.log(err);
    }

})

// delete
router.delete('/:eventId', async (req, res, next) => {
    const {eventId} = req.params;

    try {
        // deleteEvent should return boolean -- T if successful, F is not
        const event = db.deleteEvent(eventId);

        if (event){
            res.status(200).message({"message" : `successfully deleted event - ${eventId}`});
        } else {
            res.status(400).message({"message" : "not successful delete "});
        }
    } catch (err) {
        console.log(err);
    }

})

// export
module.exports = router;