const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI).then(() => {
            console.log("mongodb connected");
        });
    } catch (error) {
        console.error("Connection Failed", error);
    }
}

module.exports = connect