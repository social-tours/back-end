const router = require('express').Router();
const db = require('../data/models');

/**
 * Method to retrieve all events from the database
 * @returns sends all events in the database as a response
 */
router.get('/', async (req,res, next) => {
    
    try {
        let data = await db.findAll('Events');
        
        for (let event of data){
            event['schedule'] = await db.findAllbyId('Schedules', event.id);
        }
        
        res.status(200).send(data);
    }
    catch(err){
        res.status(500).send(err);
    }
})

/**
 * Method to retrieve a specific event from the database
 * @param {number} eventId
 * @returns rends the requested event as a response
 */
router.get('/:eventId', async (req,res,next) => {
    const {eventId} = req.params;

    try {
        const event = await db.findById('Events', eventId);
        const schedules = await db.findAllbyId('Schedules', eventId);


        if (event){
            res.status(200).json({...event, schedule : schedules});

        } else {
            res.status(404).json({"message" : "Event not found"});
        }
    } 
    catch (err) {
        res.status(500).send(err);
    }
    

})

/**
 * Method to edit an event
 * @param {number} eventId
 * @returns message indicating edit was successful or not
 */
router.put('/:eventId', async (req,res, next) => {
    let { eventId } = req.params;

    try {
      eventId = parseInt(eventId, 10);
      const data = await db.updateRecord("Events", eventId, req.body);
      if (data){
        res.status(200).send(data);
      } else throw err;
    }
  
    catch (err) {
      res.status(500).send(err.message);
    }
})

/**
 * Method to add one event to the database
 * @returns sends a response to the requester indicating whether or not record creation was successful
 */
router.post('/', async (req, res, next) => {
    const newEvent = req.body;

    try {
        const event = await db.addRecord('Events', newEvent);

        if (event){
            res.status(201).json(event);
        } else {
            res.status(400).json({"message" : "Something went wrong. Could not create event."});
        }
    } catch(err) {
        res.status(500).send(err);
    }

})

/**
 * Method to remove an Event
 * @returns sends a response to requester indicating whether or not deletion was successful
 */
router.delete('/:eventId', async (req, res, next) => {
    const {eventId} = req.params;

    try {
        const event = await db.removeRecord('Events', eventId);

        if (event){
            res.status(200).json({"message" : `successfully deleted event - ${eventId}`});
        } else {
            res.status(400).json({"message" : "not successful delete "});
        }
    } catch (err) {
        res.status(500).send(err);
    }

})

module.exports = router;