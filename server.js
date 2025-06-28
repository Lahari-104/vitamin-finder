const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vitamin-finder.firebaseio.com"
});
const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});
app.get("/vitamins", async (req, res) => {
  const data = require('./vitaminsdata.json');
  res.json(data);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
