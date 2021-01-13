const express = require("express");
// const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
  
});

//Add Post

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  //console.log(req.body)
  await posts.insertOne({
    Prénom : req.body.info.prenom,
    Nom : req.body.info.nom,
    Texte: req.body.info.text,
    Email: req.body.info.email,
    createdAt: new Date(),
  });
  res.status(201).send();
});

//Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

// async function loadPostsCollection() {
//   const client = await mongodb.MongoClient.connect(
//     "mongodb+srv://constan:Callofduty23@cluster0-ub0gg.mongodb.net/test?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   );
//   return client.db("vue_express").collection("posts");
// }

module.exports = router;
