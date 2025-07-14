import Volunteer from "../models/Volunteer.js";

const getvolunteers = async(req, res) => {
    const volunteers = await Volunteer.find();

    if(volunteers.length === 0){
        return res.status(200).json({
                success : false,
                message: ["No volunteers"]
            });
    }

    res.status(200).json({
                success : true,
                message: [""],
                volunteers
            });
}

export { getvolunteers };   
