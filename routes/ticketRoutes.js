const router = require('express').Router();
const db = require('../data/models');
const { jwtCheck } = require('../auth/tokenService');

/**
 * Method to retrieve all tickets from the database
 * @returns sends all tickets in the database as a response
 */
router.get('/', jwtCheck, async (req,res, next) => {
    try {
        const tickets = await db.findAll('Tickets');

        if (tickets){
            res.status(200).json({tickets});
        } else {
            res.status(404).json({"message" : "No tickets found"});
        }
    }
    catch(err){
        console.log(err);
    }
})

/**
 * Method to retrieve a specific ticket from the database
 * @param {number} ticketId
 * @returns sends the requested ticket as a response
 */
router.get('/:ticketId', jwtCheck, async (req,res,next) => {
    const {ticketId} = req.params;

    try {
        const ticket = await db.findById('Tickets', ticketId);

        if (event){
            res.status(200).json({ticket});

        } else {
            res.status(404).json({"message" : "Ticket not found"});
        }
    } 
    catch (err) {
        console.log(err);
    }
    

})

/**
 * Method to edit a ticket
 * @param {number} ticketId
 * @returns message indicating edit was successful or not
 */
router.put('/:ticketId', jwtCheck, async (req,res, next) => {
    const {ticketId} = req.params;

    try {
        let ticket = await db.findById('Tickets', ticketId);

        if (ticket){
            const payload = req.body;
            ticket = {...payload};
            const newTicket = await db.updateRecord('Tickets', ticketId, ticket);

            if (newTicket){
                res.status(200).json({"message" : `successly updated ticket - ${ticketId}`});
            } else {
                res.status(400).json({"message" : "Could not update ticket"});
            }

        }
    }
    catch (err){
        console.log(err);
    }

})

/**
 * Method to add  tickets to the database
 * @returns sends a response to the requester indicating whether or not record creation was successful
 */
router.post('/', jwtCheck, async (req, res, next) => {
    const newTicket = req.body;

    try {
        const ticketId = db.addRecord('Tickets', newTicket);

        if (ticketId){
            res.status(201).json({"messsage" : `Created new ticket - ${ticketId}`})
        } else {
            res.status(400).json({"message" : "Something went wrong. Could not create ticket."});
        }
    } catch  (err) {
        console.log(err);
    }

})

/**
 * Method to remove a ticket
 * @returns sends a response to requester indicating whether or not deletion was successful
 */
router.delete('/:ticketId', jwtCheck, async (req, res, next) => {
    const {ticketId} = req.params;

    try {
        const ticket = db.removeRecord('Tickets', ticketId);

        if (ticket){
            res.status(200).message({"message" : `successfully deleted ticket - ${ticketId}`});
        } else {
            res.status(400).message({"message" : "not successful delete "});
        }
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;