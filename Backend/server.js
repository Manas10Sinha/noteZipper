const express = require("express");
//const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
//------------------------------Deployment------------------------------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}
//------------------------------Deployment------------------------------------------
/*
//API end point GET
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/notes", (req, res) => {
  res.send(notes); //res.json(notes);
});

/*app.get("/api/notes/:id", (req, res) => {
  //fetching single record
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});
*/

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server started on port ${PORT}`));
