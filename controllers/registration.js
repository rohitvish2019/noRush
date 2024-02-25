const Doctor = require('../models/doctors');
module.exports.RegistrationDoctors = function(req, res){
    return res.render('doctorRegistration')
}

module.exports.addDoctor = async function(req, res){
    try{
        await Doctor.create(req.body);
        console.log('Registering')
        return res.status(200).json({
            message:'Your registration was successful'
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Unable to register, Please try again later'
        })
    }
    
}

