const express = require("express");
const app = express();

const users = [
  { username: "ana", password: "12345" },
  { username: "billie", password: "12345" },
  { username: "charlie", password: "12345" },
];

app.use(express.json());

app.get("/users", (req, res) => {
    //query database, and send the response to client
  res.json(users);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  //instead of pushing to an array, we would insert req.body info to our users table
  res.json(req.body);
});

app.listen(5000, () => console.log("server running on port 5000"));
