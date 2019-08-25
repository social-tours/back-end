const router = require('express').Router();
const db = require('../data/models');
const jwtCheck = require('../auth/tokenService');

router.get('/', jwtCheck, async (req,res,next) => {
  try {
    const users = await db.findAll('Users');

    if (users){
      res.status(200).json(users);
    } else {
      res.status(404).json({'message' : 'no users found'});
    }
  } catch (err) {
    console.log(err);
    }
});

router.get('/:userId', jwtCheck, async (req,res,next) => {
  const { userId } = req.params;
  
  try {
    const user = await db.findById('Users', userId);

    if (user){
      res.status(200).json(user);
    } else {
      res.status(404).json({'message' : 'user not found'});
    }
  } catch (err) {
    console.log(err);
  }

});

module.exports = router;