const admin = require("firebase-admin");
// const serviceAccount = require("../../secrets-with-bruno-80451-firebase-adminsdk-fhqv3-766f98d0c2.json");
admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://secrets-with-bruno-80451.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
