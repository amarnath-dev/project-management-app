const express = require("express");
const { postSignup, postSignin, postProject, deleteProject, getProject, updateProject, getProjects } = require("../controllers/user.controller");
const { isLoggedIn } = require("../middlewares/userAuth");

const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/projects", getProjects);
router.post("/projects/new", isLoggedIn, postProject);
router.get("/projects/:id", isLoggedIn, getProject);
router.patch("/projects/update/:id", isLoggedIn, updateProject);
router.delete("/projects/delete/:id", isLoggedIn, deleteProject);

module.exports = router;