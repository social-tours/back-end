const router = require('express').Router();
const db = require('../data/models');

/**
 * Method to retrieve all tickets from the database
 * @returns sends all tickets in the database as a response
 */
router.get('/', async (req,res, next) => {
    
    try {
        let data = await db.findAll('Tickets');
        
        res.status(200).send(data);
    }
    catch(err){
        res.status(500).send(err);
    }
})

/**
 * Method to retrieve a specific ticket from the database
 * @param {number} ticketId
 * @returns rends the requested ticket as a response
 */
router.get('/:ticketId', async (req,res,next) => {
    const { ticketId } = req.params;

    try {
        const ticket = await db.findById('Tickets', ticketId);

        if (ticket){
            res.status(200).send(ticket);

        } else {
            res.status(404).json({"message" : "Ticket not found"});
        }
    } 
    catch (err) {
        res.status(500).send(err);
    }
})

/**
 * Method to edit a ticket
 * @param {number} ticketId
 * @returns message indicating edit was successful or not
 */
router.put('/:ticketId', async (req,res, next) => {
    const { ticketId } = req.params;

    const validFields = ['type', 'user_id', 'event_id'];

    for (let key in req.body){
        if (!validFields.includes(key)){
            res.status(400).json({'message' : 'invalid data'})
        }
    }

    if (!req.body){
        res.status(400).json({'message' : 'No data was submitted'})
    }

    if (typeof type === 'string'){
        type = parseInt(type, 10);
    }

    if (typeof user_id === 'string'){
        user_id = parseInt(user_id, 10);
    }

    if (typeof event_id === 'string'){
        event_id = parseInt(event_id, 10);
    }

    try {
      const data = await db.updateRecord('Tickets', ticketId, req.body);
      res.status(200).send(data);
    }
    catch (err) {
      res.status(500).send(err.message);
    }
})

/**
 * Method to add one ticket to the database
 * @returns sends a response to the requester indicating whether or not record creation was successful
 */
router.post('/', async (req, res, next) => {

    const {type, user_id, event_id} = req.body;


    if (!type || !user_id || !event_id){
        res.status(400).json({'message' : 'All fields are required.'});
    }

    if (typeof type === 'string'){
        type = parseInt(type, 10);
    }

    if (typeof user_id === 'string'){
        user_id = parseInt(user_id, 10);
    }

    if (typeof event_id === 'string'){
        event_id = parseInt(event_id, 10);
    }

    try {
        const ticket = await db.addRecord('Tickets', {type, user_id, event_id});

        if (ticket){
            res.status(201).send(ticket);
        } else {
            res.status(400).json({"message" : "Something went wrong. Could not create ticket."});
        }
    } catch(err) {
        res.status(500).send(err);
    }
})

/**
 * Method to remove a Ticket
 * @returns sends a response to requester indicating whether or not deletion was successful
 */
router.delete('/:ticketId', async (req, res, next) => {
    const { ticketId } = req.params;

    try {
        const ticket = await db.removeRecord('Tickets', ticketId);

        if (ticket){
            res.status(200).send({"message" : `successfully deleted ticket - ${ticketId}`});
        } else {
            res.status(400).json({"message" : "not successful delete "});
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;