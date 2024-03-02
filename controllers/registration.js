const Doctor = require('../models/doctors');
const Avaialibility = require('../models/avaialibility');
module.exports.RegistrationDoctors = function(req, res){
    return res.render('doctorRegistration')
}

module.exports.addDoctor = async function(req, res){
    console.log(req.body)
    try{
        let doctor = await Doctor.create(req.body);
        console.log('Registering');
        await Avaialibility.create({
            DocId:doctor._id,
            startTime:req.body.startTime,
            endTime:req.body.endTime
        })
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

