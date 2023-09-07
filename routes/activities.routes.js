const express = require('express');
const Activity = require("../models/Activity.model")
const User = require("../models/User.model")
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require('../config/cloudinary.config');


// READ: Display Activities page 
router.get("/", (req, res, next) => {
    Activity.find()
        .then((activitiesFromDB) => {
            res.render("activities/activities-list", { activities: activitiesFromDB });
        })
        .catch(e => next(e))
});

//CREATE: display form 
router.get("/create", isLoggedIn, (req, res, next) => {
    res.render("activities/create-form")
});

router.post("/create", fileUploader.single('image'), (req, res, next) => {
    console.log(req.file);

    const newActivity = {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        review: req.body.review,
        tips: req.body.tips,
        user: req.session.currentUser._id,
        imageUrl: req.file.path,
    };

    Activity.create(newActivity)
        .then((newActivity) => {
            res.redirect("/activities/my-activities");
        })
        .catch(e => next(e))
});

// Display activities created by the logged-in user
router.get("/my-activities", isLoggedIn, (req, res, next) => {
    Activity.find({ user: req.session.currentUser._id })
        .then((userActivities) => {

            res.render("activities/my-activities", { activities: userActivities, currentUser: req.session.currentUser });
        })
        .catch(e => next(e));
});


//UPDATE activity
router.get("/:activityId/edit", (req, res, next) => {
    const { activityId } = req.params;

    Activity.findById(activityId)
        .then(activityToEdit => {
            res.render("activities/update-form", { activity: activityToEdit })
        })
        .catch(e => next(e));
});

router.post("/:activityId/edit", fileUploader.single('image'), (req, res, next) => {
    const { activityId } = req.params;
    const { title, category, description, price, review, tips, existingImage } = req.body;

    let imageUrl;
    if (req.file) {
        imageUrl = req.file.path;
    } else {
        imageUrl = existingImage;
    }

    Activity.findByIdAndUpdate(activityId, { title, category, description, price, review, tips, imageUrl }, { new: true })
        .then(() => res.redirect("/activities/my-activities"))
        .catch(e => next(e));
});

//DELETE activity
router.post("/:activityId/delete", (req, res, next) => {
    const { activityId } = req.params;

    Activity.findByIdAndDelete(activityId)
        .then(() => res.redirect("/activities"))
        .catch(e => next(e));
});

// READ: display details of one activity
router.get("/:activityTitle", (req, res, next) => {
    const title = req.params.activityTitle;

    Activity.findOne({ title })
        .then(activityFromDB => {

            res.render("activities/details", activityFromDB);
        })
        .catch(e => next(e));
});

//Like functionality
router.post("/like/:activityId", isLoggedIn, async (req, res, next) => {
    const { activityId } = req.params
    const userId = req.session.currentUser._id

    try {
        const activity = await Activity.findById(activityId)
        if (activity.like.includes(userId)) {
            await Activity.findByIdAndUpdate(activityId, { $pull: { like: userId } })
            res.redirect('/activities')
            return
        }
        await Activity.findByIdAndUpdate(activityId, { $push: { like: userId } })

        res.redirect('/activities')

    } catch (error) {
        console.log(error)
        next(error)

    }
})

module.exports = router;