import Donation from "../models/Donation.js";



const donate = async(req,res) => {
    const { messname, foodtype, category, 
        bestbefore, donationdate,
        description, quantity, imgurl
    } = req.body;

    const volunteerid = req.user._id; 

    const newdonation = new Donation({
        messname : messname,
        foodtype : foodtype,
        volunteerid : volunteerid,
        donationdate : donationdate,
        category : category,
        description : description,
        bestbefore : bestbefore,
        status : "pending",
        quantity : quantity,
        imgurl : imgurl
    })

    await newdonation.save();
    return res.status(201).json({ message: "Donation request sent successfully" });

}

export {donate};