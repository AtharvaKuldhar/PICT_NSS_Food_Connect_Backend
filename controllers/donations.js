import Donation from "../models/Donation";

const getdonations = async(req, res) => {
    const donations = await Donation.find();

    if(Donation.length === 0){
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