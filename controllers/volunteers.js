import Volunteer from "../models/Volunteer.js";

const getvolunteers = async(req, res) => {
    const volunteers = await Volunteer.find();

    if(volunteers.length === 0){
        return res.status(200).json({message : "No Volunteers"});
    }

    res.status(200).json({message : "Volunteers fetched successfully"});
}

export { getvolunteers };   
