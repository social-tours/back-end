const router = require('express').Router();
const db = require('../data/models');
const jwtCheck = require('../auth/tokenService');

/**
 * Method to retrieve all schedules from the database
 * @returns sends all schedules in the database as a response
 */
router.get('/', jwtCheck, async (req,res, next) => {
    try {
        const schedules = await db.findAll('Schedules');

        if (schedules){
            res.status(200).json({schedules});
        } else {
            res.status(404).json({"message" : "No schedules found"});
        }
    }
    catch(err){
        console.log(err);
    }
})

/**
 * Method to retrieve a specific schedule from the database
 * @param {number} scheduleId
 * @returns sends the requested schedule as a response
 */
router.get('/:scheduleId', jwtCheck, async (req,res,next) => {
    const {scheduleId} = req.params;

    try {
        const schedule = await db.findById('Schedules', scheduleId);

        if (event){
            res.status(200).json({schedule});

        } else {
            res.status(404).json({"message" : "Schedule not found"});
        }
    } 
    catch (err) {
        console.log(err);
    }
    

})

/**
 * Method to edit an schedule
 * @param {number} scheduleId
 * @returns message indicating edit was successful or not
 */
router.put('/:scheduleId', jwtCheck, async (req,res, next) => {
    const {scheduleId} = req.params;

    try {
        let schedule = await db.findById('Schedules', scheduleId);

        if (schedule){
            const payload = req.body;
            schedule = {...payload};
            const newSchedule = await db.updateRecord('Schedules', scheduleId, schedule);

            if (newSchedule){
                res.status(200).json({"message" : `successly updated schedule - ${scheduleId}`});
            } else {
                res.status(400).json({"message" : "Could not update schedule"});
            }

        }
    }
    catch (err){
        console.log(err);
    }

})

/**
 * Method to add  schedules to the database
 * @returns sends a response to the requester indicating whether or not record creation was successful
 */
router.post('/', jwtCheck, async (req, res, next) => {
    const newSchedule = req.body;

    try {
        const scheduleId = db.addRecord('Schedules', newSchedule);

        if (scheduleId){
            res.status(201).json({"messsage" : `Created new schedule - ${scheduleId}`})
        } else {
            res.status(400).json({"message" : "Something went wrong. Could not create schedule."});
        }
    } catch  (err) {
        console.log(err);
    }

})

/**
 * Method to remove a schedule
 * @returns sends a response to requester indicating whether or not deletion was successful
 */
router.delete('/:scheduleId', jwtCheck, async (req, res, next) => {
    const {scheduleId} = req.params;

    try {
        const schedule = db.removeRecord('Schedules', scheduleId);

        if (schedule){
            res.status(200).message({"message" : `successfully deleted schedule - ${scheduleId}`});
        } else {
            res.status(400).message({"message" : "not successful delete "});
        }
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;