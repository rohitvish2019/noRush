const Doctors = require('../models/doctors');
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