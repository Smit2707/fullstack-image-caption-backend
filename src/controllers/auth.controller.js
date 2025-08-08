// api ke ander kya hoga aur kese hoga uske kaam mein ayengi

const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token)

    return res.status(201).json({ message: "User registered successfully", user });
}

async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            email: user.email,
            id: user._id
        }
    })
}
async function getUserController(req, res) {
    // const { email, password } = req.body;

    const users = await userModel.find()

    if (!users) {
        return res.status(400).json({ message: "User not found" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //     return res.status(400).json({ message: "Invalid password" });
    // }
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    // res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        users
    })
}

module.exports = {
    registerController,
    loginController,
    getUserController
}