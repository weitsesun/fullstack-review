const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  login: String,
  url: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  var newRepos = JSON.parse(repos.body);
  // console.log(newRepos[0].owner.login)
  for (let i = 0; i < newRepos.length; i++) {
    var dataToMongo = {
      id: newRepos[i].id,
      name: newRepos[i].name,
      login: newRepos[i].full_name.split('/')[0],
      url: newRepos[i].owner.url,
    }
    Repo.create(dataToMongo, (err) => {
      console.log("in create function");
      if (err) {
        callback(err);
        return;
      }
    });
  }
  callback();
}

let retrive = (callback) => {
  Repo.find((err, data) => {
    if(err) {
      callback(err);
      return;
    } else {
      var myData = [];
      for(var i = 0; i < data.length; i++) {
        myData.push(data[i]._doc);
      }
      console.log("My Data: ", myData);
      callback(null, JSON.stringify(myData));
    }
  })
}

module.exports = {
  save,
  retrive
};