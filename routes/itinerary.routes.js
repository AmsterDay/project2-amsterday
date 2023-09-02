const express = require('express');
const Itinerary = require("../models/Itinerary.model")
const router = express.Router();

/* GET itinerary page */
router.get("/itinerary", (req, res, next) => {
    Itinerary.find()
        .populate("activities")
        .then((itinerariesFromDB) => {
            res.render("itineraries", { itinerary: itinerariesFromDB });
        })
        .catch(e => next(e))
});


module.exports = router;