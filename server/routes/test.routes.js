const express = require('express');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/health', (req, res) => {
  return res.status(200).send({ isHealthy: true });
});

module.exports = router;
