const app = require("./app");
const env = require("dotenv");
const connectDatabase = require("./config/database");
env.config({ path: "backend/config/.env" });
const cloudinary = require("cloudinary");

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

app.listen(process.env.PORT, () =>
  console.log("server is running on port", process.env.PORT)
);

//handling uncaught exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error:${err.message}`);
//   console.log("shutting down the server due to uncaught exception");

//   server.close(() => {
//     process.exit(1);
//   });
// });

//handling unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error:${err.message}`);
//   console.log("shutting down the server due to unhandled promise rejection");

//   server.close(() => {
//     process.exit(1);
//   });
// });
