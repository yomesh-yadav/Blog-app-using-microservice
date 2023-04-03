const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
app.use(cors());
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
const list_of_posts = {};

// app.get("/", (req, res) => {
//   res.send({ message: "Server Running Fine" });
// });

app.get("/posts", (req, res) => {
  res.send(list_of_posts);
});

app.post("/posts/create", async (req, res) => {
  try {
    const { title } = req.body;
    const id = randomBytes(4).toString("hex");
    list_of_posts[id] = {
      id,
      title,
    };
    await axios.post("http://event-us-srv:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });

    return res.status(201).send(list_of_posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server Error" });
  }
});
app.post("/events", (req, res) => {
  console.log("receiveed events", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("version 2");
  console.log("the app is running on port 4000");
});
