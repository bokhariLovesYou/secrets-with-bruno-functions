const functions = require("firebase-functions");
const app = require("express")();

const cors = require("cors");
app.use(cors());

const { db } = require("./util/admin");

const {
  getAllSecrets,
  postOneSecret,
  deleteSecret
} = require("./handlers/secrets");

// Get Post Functions Start Here

// Screams Routes
app.get("/secrets", getAllSecrets);
app.post("/secret", postOneSecret);
app.delete("/secret/:secretId", deleteSecret);

exports.api = functions.https.onRequest(app);
