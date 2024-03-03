const mongoose = require('mongoose');
const Doctors = new mongoose.Schema({
    FullName : {
        type: String,
    },
    Mobile:{
        type:String
    },
    Address :{
        type: String
    },
    DocId: {
        type:String
    },
    Location:{
        type:String
    }
},
{
    timestamps:true
});

const Doctor = mongoose.model('doctors', Doctors);
module.exports = Doctor;