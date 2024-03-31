const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./connectDB");

const middleware = require("./middleware");
const { errorHandler } = require("./middleware/errorMiddleware");
const { logger } = require("./middleware/utilitiesMiddleware");

dotenv.config();
const app = express();
const PORT = 5000; // backend routing port

// Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(middleware.responder());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use(logger);

// DB Connection
// let gfs;
connectDB();

// const conn = mongoose.connection;
// conn.once('open', function () {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('photos');
// });

// Overwrite Default Error Handler
app.use(errorHandler);

// Router Connection
// // app.use('/api/file', require('./routes/videoRoutes'));

app.post("/api/status", (req, res) => {
  console.log(req?.body);
  res.apiResponse({ result: { message: "Connection Established" } });
});

app.use("/api/user", require("./routes/userRoutes"));

// https://localhost:4000/api/posts

// Media routes
// app.get('file/:filename', async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({ filename: req.params.filename });
//     const readStream = gfs.createReadStream(file.filename);
//     readStream.pipe(res);
//   } catch (error) {
//     console.log(error);
//     res.send('Not found');
//   }
// });

// app.delete('file/:filename', async (req, res) => {
//   try {
//     await gfs.files.deleteOne({ filename: req.params.filename });
//     res.send('Delete Success');
//   } catch (error) {
//     console.log(error);
//     res.send('Not found');
//   }
// });

// Bind and Listen to Port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
