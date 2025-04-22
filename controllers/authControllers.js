// import  Volunteer  from "../models/Volunteer.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";  // Add this import


// const admingenerateAccessToken = async function () {
//     const payload = {
//         role: "Admin",
//     };
//     return jwt.sign(
//         payload, 
//         process.env.ACCESS_TOKEN_SECRET, 
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//         }
//     );
// };

// const handleLogin = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     if (!email) {
//         throw new Error("Email not found");
//     }
//     if (!password) {
//         throw new Error("Password not found");
//     }

//     if(email === "admin@foodconnect.com"){
//         if (password == process.env.ADMIN_PASSWORD) {
//             const access_token = await admingenerateAccessToken();
//             console.log(access_token);
//             const options = {
//             secure: false,
//             httpOnly: false,
//             credentials: true,
//             };
//             return res.cookie("access_token", access_token, options).status(200).json({
//             role: "admin",
//             message: "Login successful",
//             });
//         } else {
//             res.status(404).send("Invalid credentials");
//             throw new Error("Incorrect admin password");
//         }
//     }

//     const user = await Volunteer.findOne({ email });
//     if (!user) {
//         res.status(401).send("Credentials not found");
//         throw new Error("User doesn't exist");
//     }

//     if (await user.matchPassword(password)) {
//         const access_token = await user.generateAccessToken("volunteer");
//         console.log(access_token);
//         const options = {
//         secure: true,
//         httpOnly: false,
//         credentials: true,
//         };
//         return res.cookie("access_token", access_token, options).status(200).json({
//         role: "volunteer",
//         message: "Login successful",
//         });
//     } else {
//         res.status(404).send("Incorrect credentials");
//         throw new Error("Incorrect volunteer password");
//     }
// });

// // register complete
// const handleRegister = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     // console.log(req.body);
//     if (!email) {
//         throw new Error("Email not found");
//     }
//     if (!password) {
//         throw new Error("Password not found");
//     }
//     // if (!role) {
//     //     throw new Error("Role not found");
//     // }

//     const volunteer = await Volunteer.findOne({ email });
//     if (!volunteer) {
//         const newvolunteer = await Volunteer.create({
//         name,
//         email,
//         password: password.trim(),
//         });
//         console.log("New volunteer successfully created");
//         res.status(200).send("New volunteer successfully created");
//     } else {
//         console.log("User exists");
//         return res.status(409).send("User already exists");
//     }
// });

// export { handleLogin, handleRegister };


import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import Volunteer from "../models/Volunteer.js";
import bcrypt from "bcrypt";  // Ensure bcrypt is imported for password hashing

const admingenerateAccessToken = async function () {
    const payload = {
        role: "Admin",
    };
    return jwt.sign(
        payload, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).send("Email not found");
    }
    if (!password) {
        return res.status(400).send("Password not found");
    }

    if (email === "admin@foodconnect.com") {
        if (password === process.env.ADMIN_PASSWORD) {
            const access_token = await admingenerateAccessToken();
            console.log(access_token);
            const options = {
                secure: process.env.NODE_ENV === "production",  // Use secure cookies in production
                httpOnly: true,  // It's a good practice to keep the cookie httpOnly to prevent XSS
                credentials: true,
            };
            return res.cookie("access_token", access_token, options).status(200).json({
                role: "admin",
                message: "Login successful",
            });
        } else {
            return res.status(404).send("Invalid credentials");
        }
    }

    const user = await Volunteer.findOne({ email });
    if (!user) {
        return res.status(401).send("Credentials not found");
    }

    if (await user.matchPassword(password)) {
        const access_token = await user.generateAccessToken("volunteer");
        console.log(access_token);
        const options = {
            secure: process.env.NODE_ENV === "production",  // Secure in production
            httpOnly: true,  // HttpOnly cookie for security
            credentials: true,
        };
        return res.cookie("access_token", access_token, options).status(200).json({
            role: "volunteer",
            message: "Login successful",
        });
    } else {
        return res.status(404).send("Incorrect credentials");
    }
});

// Register complete
const handleRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!email) {
        return res.status(400).send("Email not found");
    }
    if (!password) {
        return res.status(400).send("Password not found");
    }

    const volunteer = await Volunteer.findOne({ email });
    if (volunteer) {
        return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10); // Hash the password
    const newVolunteer = await Volunteer.create({
        name,
        email: email.trim().toLowerCase(),  // Normalize email
        password: hashedPassword,
    });

    console.log("New volunteer successfully created");
    return res.status(200).send("New volunteer successfully created");
});

export { handleLogin, handleRegister };

