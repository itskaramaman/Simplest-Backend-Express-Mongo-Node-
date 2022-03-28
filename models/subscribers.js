const mongoose = require('mongoose');

// we will create a model to interact with the database
const subscibersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// we used mongoose.model here so when we export this and import in a different file this model allows us directly interact with database using this schema
module.exports = mongoose.model('Subscriber', subscibersSchema); // export the model (name of model, schema of model)


