const express = require('express');
const Activity = require("../models/Activity.model")
const router = express.Router();


// READ: Display Activities page 
router.get("/activities", (req, res, next) => {
    Activity.find()
        .then((activitiesFromDB) => {
            res.render("activities/activities-list", { activities: activitiesFromDB });
        })
        .catch(e => next(e))
});

//CREATE: display form (add isloggedIn middleware later)
router.get("/activities/create", (req, res, next) => {
    res.render("activities/create-form")
});

router.post("/activities/create", (req, res, next) => {
    const newActivity = {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        review: req.body.review,
        tips: req.body.tips,
    };

    Activity.create(newActivity)
        .then((newActivity) => {
            res.redirect("/activities");
        })
        .catch(e => next(e))
});

//UPDATE



module.exports = router;