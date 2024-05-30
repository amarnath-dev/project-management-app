const User = require("../models/userModel");
const Project = require("../models/projectModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Generate token JWT Token function
const generateToken = async (email, id) => {
    try {
        const token = jwt.sign({ email, id }, process.env.JWT_SECRETE, {
            expiresIn: 3 * 24 * 60 * 60
        });
        if (token) {
            return token;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}

const postSignup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: "Missing credentials" });
        }
        const exists = await User.findOne({ email: email });
        if (exists) {
            res.status(400).json({ status: false, message: "Email Alredy Exists" });
        }
        const newUser = new User({
            email: email,
            password: password
        });
        await newUser.save();
        if (newUser) {
            const token = await generateToken(email, newUser?._id);
            res.status(201).json({
                success: true, message: "User registration successfull", user: {
                    _id: newUser?._id,
                    email: newUser?.email,
                },
                token,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

const postSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: "Missing credentials" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({ status: false, message: "User not found" });
            return;
        }
        const match = bcrypt.compare(password, user?.password);
        if (match) {
            const token = await generateToken(user.email, user._id);
            res.status(200).json({
                status: true, message: "User login successfull", user: {
                    _id: user._id,
                    email: user.email,
                },
                token,
            })
        } else {
            res.status(400).json({ status: false, message: "Incorrect Password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal server error" });
    }
}


const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        console.log("--->", projects);
        res.status(200).json({ status: true, message: "Projects fetch successfull", projects })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal server error" });
    }
}

const postProject = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, role } = req.body;
        if (!name || !description || !role) {
            res.status(400).json({ success: false, message: "Missing Details" });
        }
        const newProject = new Project({
            name: name,
            description: description,
            role: role,
        });
        await newProject.save();
        if (newProject) {
            res.status(201).json({ status: true, message: "New Project has added" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal server error" });
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const deleteProject = await Project.findByIdAndDelete(id);
            if (deleteProject) {
                res.status(200).json({ status: true, message: "Project has been deleted" });
            } else {
                res.status(400).json({ status: false, message: "Project not found" });
            }
        } else {
            res.status(400).json({ status: false, message: "Project ID not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal server error" });
    }
}

const getProject = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const project = await Project.findById(id);
            if (project) {
                res.status(200).json({ status: true, project });
            } else {
                res.status(400).json({ status: false, message: "Project not found" });
            }
        } else {
            res.status(400).json({ status: false, message: "Project ID not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal server error" });
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, role } = req.body;
        if (!name || !description || !role) {
            res.status(400).json({ success: false, message: "Missing Details" });
        }
        if (id) {
            const update = await Project.findByIdAndUpdate(id, { name: name, description: description, role: role });
            if (update) {
                res.status(200).json({ status: true, message: "Project has been updated" });
            } else {
                res.status(400).json({ status: false, message: "Project updation failed" });
            }
        } else {
            res.status(400).json({ status: false, message: "Project ID not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal server error" });
    }
}


module.exports = { postSignup, postSignin, postProject, deleteProject, getProject, updateProject, getProjects };