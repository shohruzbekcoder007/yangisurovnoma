const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { Questionnaire } = require('../models/questionnaire')
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')

router.get('/allres', cookieJwtAuth, async (req, res) => {
    const result1 = await Questionnaire.find({name: req.query.answer});
    res.send(result1)
});

module.exports = router;