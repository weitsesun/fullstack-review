const express = require('express');
const cors = require('cors');
let app = express();
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(cors());
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.term, (data) => {
    var newData = data;

    db.save(newData, (err) => {
      if(err) {
        res.status(500).send();
      } else {
        res.status(200).send('success');
      }
    });
  })
});


app.get('/repos', function (req, res) {
  db.retrive((err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  })
  

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

