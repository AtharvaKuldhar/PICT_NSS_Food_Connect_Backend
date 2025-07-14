import Donation from "../models/Donation.js";
import Volunteer from "../models/Volunteer.js";

const approve = async (req, res) => {
    const { donationid, credits } = req.body;  // Destructure donationid and credits
    const d = await Donation.findOne({ _id: donationid });  // Use only the donation ID for querying

    if (!d) {
        return res.status(404).json({
            success : false,
            message : ["Donation not found !"]
        });
    }

    const volunteerid = d.volunteerid;
    const vol = await Volunteer.findOne({ _id: volunteerid });

    if (!vol) {
        return res.status(404).json({
            success : false,
            message : ["Volunteer does not Exist !"]
        });
    }

    // Update the donation status and volunteer credits
    d.status = "completed";
    vol.credits += credits;

    await d.save();  // Save the updated donation
    await vol.save();  // Save the updated volunteer

    return res.status(200).json({
            success : true,
            message : ["Request approved !"]
        });
};

export { approve };