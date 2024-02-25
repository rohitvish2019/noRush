module.exports.home = function(req, res){
    return res.render('home');
}

module.exports.newAppointmentPage = function(req, res){
    return res.render('newAppointment')
}

module.exports.trackAppointments = function(req, res){
    return res.render('trackAppointment');
}