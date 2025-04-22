import mongoose, { Schema } from "mongoose";

const DonationSchema = new Schema({
    messname : {
        type : String,
        // required : true
    },

    foodtype : {
        type : String,
        enum : ["Veg", "Non Veg"]
        
        // required : true
    },

    volunteerid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Volunteer'
        // required : true  
    },

    donationdate : {
        type : Date
    },

    category : {
        type : String,
        enum : ["Dry Vegetable", "Gravy Vegetable", "Rice", "Chapati", "Snacks"] 
    },

    description : {
        type : String
    },

    bestbefore : {
        type : String
    },

    status : {
        type : String,
        enum : ["pending", "completed"],
        default : "pending"
    },
    
    quantity : {
        type : String,

    },

    imgurl : {
        type : String
    }

})


const Donation = mongoose.model("Donation",DonationSchema);
export default Donation;