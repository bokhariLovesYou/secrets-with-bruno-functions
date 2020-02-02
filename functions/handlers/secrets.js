const { db } = require("../util/admin");

// Get All Secrets
exports.getAllSecrets = (req, res) => {
    db.collection("secrets")
        .orderBy("createdAt", "desc")
        .get()
        .then(data => {
            let secrets = [];
            data.forEach(doc => {
                secrets.push({
                    SecretId: doc.id,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(secrets);
        })
        .catch(err => console.error(err));
};

// Post One Secret
exports.postOneSecret = (req, res) => {
    const newSecret = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
    };
    db.collection("secrets")
        .add(newSecret)
        .then(doc => {
            const resSecret = newSecret;
            resSecret.SecretId = doc.id;
            res.json(resSecret);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong" });
            console.error(err);
        });
};

exports.deleteSecret = (req, res) => {
    const document = db.doc(`/secrets/${req.params.secretId}`);
    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "secret not found" });
            }
            return document.delete();
        })
        .then(() => {
            res.json({ message: "Secret deleted successfully" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}