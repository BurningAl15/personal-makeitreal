const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const db =
            "mongodb+srv://aldhairvera:u2cmqqztZhqRTk4n@cafe-app.xyps9.mongodb.net/aldhaNote";
        const connectionString = process.env.MONGODB_CNN || db;
        await mongoose.connect(connectionString, {});
        console.log("DB Online!");
    } catch (error) {
        console.log(error);
        throw new Error("Error when trying to initialize DB");
    }
};

module.exports = {
    dbConnection,
};