// import Donation from "../models/Donation.js";

// const getdonations = async(req, res) => {
//     const donations = await Donation.find().populate("volunteerid", "name");

//     if(donations.length === 0){
//         return res.status(200).json({
//             success : false,
//             message : ["No Donations"]
//         });
//     }

//     res.status(200).json({
//             success : true,
//             message : ["data sent"],
//             donations
//         });
// }

// export { getdonations };  

import Donation from "../models/Donation.js";

const getdonations = async(req, res) => {
    const donations = await Donation.find().populate("volunteerid", "name");
    if(donations.length === 0){
        return res.status(200).json({
            success : false,
            message : ["No Donations"]
        });
    }
    res.status(200).json({
        success : true,
        message : ["data sent"],
        donations
    });
}

export { getdonations };