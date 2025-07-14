import Donation from "../models/Donation.js";

const getactivities = async(req,res) => {
    const v = req.user._id;
    const pending = await Donation.find({volunteerid : v, status : "pending"});
    const completed = await Donation.find({volunteerid : v,status : "completed"});

    if(pending.length === 0 && completed.length === 0){
        return res.status(200).json({
            success : true,
            message : ["No Activities"]
        });
    }

    res.status(200).json({
            success : true,
            message : ["data sent"],
            pending,
            completed
        });

}

export {getactivities};