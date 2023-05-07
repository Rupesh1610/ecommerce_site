const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => console.log(`mongo connnected`));
};

module.exports = connectDatabase;
