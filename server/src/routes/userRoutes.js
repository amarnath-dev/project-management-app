const express = require("express");
const { postSignup, postSignin, postProject, deleteProject, getProject, updateProject, getProjects } = require("../controllers/user.controller");
const { isLoggedIn } = require("../middlewares/userAuth");

const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/projects", getProjects);
router.post("/project/new", isLoggedIn, postProject);
router.get("/project/:id", isLoggedIn, getProject);
router.patch("/project/update/:id", isLoggedIn, updateProject);
router.post("/project/delete/:id", isLoggedIn, deleteProject);

module.exports = router;