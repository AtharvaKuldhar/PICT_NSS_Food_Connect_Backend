import Volunteer from "../models/Volunteer.js";
import asyncHandler from "../utils/asyncHandler.js";

const getProfile = asyncHandler(async (req, res) => {
    const volunteerId = req.user._id;
    
    const volunteer = await Volunteer.findById(volunteerId).select('-password');
    
    if (!volunteer) {
        return res.status(404).json({
            success: false,
            message: ["Volunteer not found"]
        });
    }
    
    return res.status(200).json({
        success: true,
        data: volunteer,
        message: ["Profile retrieved successfully"]
    });
});

export { getProfile }; 