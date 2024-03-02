const mongoose = require('mongoose');
const Bookings = new mongoose.Schema({
    DocId: {
        type:mongoose.Schema.ObjectId,
        ref:'doctors'
    },
    selectedTime:{
        type:String
    },
    date:{
        type:String
    },
    PatientName:String,
    PatientAge:Number,
    PatientAddress:String,
    PatientMobile:String
},
{
    timestamps:true
});

const Booking = mongoose.model('Booking', Bookings);
module.exports = Booking;