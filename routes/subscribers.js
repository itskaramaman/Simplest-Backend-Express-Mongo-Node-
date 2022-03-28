const express = require('express'); // entire application use express so have to import it
const res = require('express/lib/response');
const router = express.Router();
const Subscriber = require('../models/subscribers');

// Get all
router.get('/', async (req, res)=>{
    try {
        const subscibers = await Subscriber.find();
        res.json(subscibers);
    } catch (err) {
        res.status(500).json({message:err.message}); // if error set the status code to 500 and send a json message
    }
});


// Get one (with :id we can access it with req.params.id)
router.get('/:id', getSubscriber, (req, res)=>{
    res.send(res.subsciber);
});


// Creating one
router.post('/', async (req, res)=>{
    // create a new subscriber
    const subsciber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subsciber.save(); // save the object to db
        res.status(201).json(newSubscriber); // set the status (201 used with POST) and send the saved object in db.
    } catch (err) {
        res.status(400).json({message: err.message}); // user gives bad data or missing data so failed, whenver user gives bad data we send 401 req
    }
});
// Updating one (patch updates only the info passed while put updates the entire object)
router.patch('/:id', getSubscriber, async (req, res)=>{
    // we check in req.body that what is changed
    if(req.body.name != null) {
        res.subsciber.name = req.body.name;
    } 
    if(req.body.subscribedToChannel != null){
        res.subsciber.subscribedToChannel = req.subsciber.subscribedToChannel
    } 

    // we save in db and send the changed object back as response
    try {
        const updatedSubscriber = await res.subsciber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
//Delete One
router.delete('/:id', getSubscriber, async (req, res)=>{
    try{
        await res.subsciber.remove();
        res.json({message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// middleware, we need subscriber every time for :id route 
// so we can create a middleware and use it. Here next here says that 
// if we call this move on to next section of code which will be the 
// callback after the middleware
// async as we will be accessing database
async function getSubscriber(req, res, next) {
    let subsciber;
    try {
        subsciber = await Subscriber.findById(req.params.id);
        if (subsciber == null) {
            return res.status(404).json({message: "Cannot find subscriber"});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.subsciber = subsciber;
    next();
}

module.exports = router;