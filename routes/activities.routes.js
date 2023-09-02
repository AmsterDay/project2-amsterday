const express = require('express');
const Activity = require("../models/Activity.model")
const router = express.Router();


/* GET Activities page */
router.get("/activities", (req, res, next) => {
    Activity.find()        
        .then((activitiesFromDB) => {
            res.render("activities", { activity: activitiesFromDB });
        })
        .catch(e => next(e))
});


module.exports = router;