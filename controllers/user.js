let Bookings = require('../models/bookings');
let Doctors = require('../models/doctors')
module.exports.home = function(req, res){
    return res.render('home');
}

module.exports.newAppointmentPage = function(req, res){
    return res.render('newAppointment')
}

module.exports.trackAppointments = async function(req, res){
    try{
        let bookings = await Bookings.find({}).populate("DocId", 'FullName Address');
        console.log(bookings);
        return res.render('trackAppointment', {bookings});
    }catch(err){
        return res.render('trackAppointment')
    }
    
    
    
}