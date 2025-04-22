import Donation from "../models/Donation";

const getdonations = async(req, res) => {
    const donations = await Donation.find();

    if(Donation.length === 0){
        return res.status(200).json({message : "No Donations"});
    }

    res.status(200).json({message : "Donations fetched successfully"});
}

export { getdonations };  