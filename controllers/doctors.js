const Doctors = require('../models/doctors');
const Availiability = require('../models/avaialibility');
const Bookings = require('../models/bookings')
module.exports.getAllDoctors = async function(req, res){
    console.log(req.query)
    try{
        let docsList = await Doctors.find({Location:req.query.Location}, '_id FullName Address');
        if(!docsList || docsList.length < 1){
            return res.status(200).json({
                message:'No doctors found for the location'
            })
        }
        return res.status(200).json({
            message:'Total '+docsList.length+' doctors found',
            docsList
        })
    }catch(err){
        return res.status(500).json({
            message:'Error occured fetching doctors, Please try again later'
        })
    }
}


module.exports.getAvailabilityByID = async function(req, res){
    try{
        let timeframe = await Availiability.find({DocId:req.query.id},'DocId startTime endTime');
        console.log(timeframe);
        return res.status(200).json({
            message:'Success',
            timeframe
        })
    }catch(err){
        return res.status(500).json({
            message:'Unable to get availiability'
        })
    }    
}



module.exports.setAvailibility = async function(req, res){
    console.log(req.body);

    try{
        let doctor = await Availiability.findOne({DocId:req.body.id});
        if(doctor){
            doctor.updateOne({startTime:req.body.startTime, endTime:req.body.endTime});
            doctor.save();
        }else{
            Availiability.create(req.body);
        }
        return res.status(200).json({
            message:'Availability updated successfully'
        })
    }catch(err){
        return res.status(500).json({
            message:'Unable to add/update availaibility'
        })
    }
}


module.exports.showBookings = async function(req, res){
    let doctor = await Doctors.findById(req.params.id,'_id FullName Address Location');
    
    return res.render('showBookings',{timeframe:req.query,doctor});
}

module.exports.getBlockedTimes = async function(req, res){
    console.log(req.query)
    try{
        let blockedTimes = await Bookings.find({DocId:req.query.DocId, date:req.query.date},'selectedTime');
        return res.status(200).json({
            blockedTimes
        })
    }catch(err){
        return res.status(500).json({
            message:'Unable to get blocked timings'
        })
    }
}

module.exports.confirmBooking = async function(req, res){
    try{
        let booking = await Bookings.create(req.body);
        return res.status(200).json({
            message:'Booking confirmed'
        })
    }catch(err){
        return res.status(500).json({
            message:'Unable to book, Please try again later'
        })
    }
}