const express = require('express')
const router = express.Router()


// preloaded example
router.all('/login', function (req, res) {
  const jsonReturn = {"inviteKey": (process.env.API_INVITE_KEY || 'MRST3434300'),
                      "name": (process.env.API_NAME || 'John Marston'),
                      "dob": (process.env.API_DOB || '10/10/1220')};

                    res.json(jsonReturn);
})

router.all('/login-auth', function (req, res) {
  const jsonReturn = {"inviteKey": (process.env.API_INVITE_KEY || 'MRST3434300'),
                      "name": (process.env.API_NAME || 'John Marston'),
                      "dob": (process.env.API_DOB || '10/10/1220')};


    if (req.body.inviteKey ===  jsonReturn.inviteKey) {
      res.json(jsonReturn);
    } else {
      res.status('404').json({message:'Invite key not found'}); 
    }
})

module.exports = router
