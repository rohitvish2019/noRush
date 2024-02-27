const mongoose = require('mongoose');
const Availability = new mongoose.Schema({
    DocId: {
        type:mongoose.Schema.ObjectId,
        ref:'doctors'
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    }
},
{
    timestamps:true
});

const Availabilities = mongoose.model('Availability', Availability);
module.exports = Availabilities;