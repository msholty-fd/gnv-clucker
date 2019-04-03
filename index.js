const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

// parse application/json
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const indexHtml = path.join(__dirname + "/index.html");

app.get("/", function(req, res) {
  return res.sendFile(indexHtml);
});
app.get("/app.js", (req, res) =>
  res.sendFile(path.join(__dirname + "/app.js"))
);

app.post("/clucks", urlencodedParser, (req, res) => {
  const MongoClient = require("mongodb").MongoClient;

  // Connection URL
  // const url = process.env.MONGODB_URI;
  const url =
    "mongodb://heroku_nndjz5dt:o2b43nc5ce0u1mdp7u022kgpkp@ds125616.mlab.com:25616/heroku_nndjz5dt";

  // Database Name
  const dbName = "heroku_nndjz5dt";

  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(async function(err, client) {
    const db = client.db(dbName);
    await db.collection("clucks").insert(req.body);
    return res.json(req.body);
  });
});

app.get("/clucks", (req, res) => {
  const MongoClient = require("mongodb").MongoClient;

  // Connection URL
  // const url = process.env.MONGODB_URI;
  const url =
    "mongodb://heroku_nndjz5dt:o2b43nc5ce0u1mdp7u022kgpkp@ds125616.mlab.com:25616/heroku_nndjz5dt";

  // Database Name
  const dbName = "heroku_nndjz5dt";

  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(async function(err, client) {
    const db = client.db(dbName);
    const clucks = await db
      .collection("clucks")
      .find()
      .toArray();

    return res.json({ clucks: clucks });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
