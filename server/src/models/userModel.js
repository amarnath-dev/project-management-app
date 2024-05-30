const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requred: true,
        unique: true,
    },
    password: {
        type: String,
        requires: true,
    }
}, { timestamps: true });

//Hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model("User", userSchema);