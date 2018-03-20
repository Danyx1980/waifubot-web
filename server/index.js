const express       = require('express'),
      mongo         = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const mongoURL = process.env.DBURL || "mongodb://website:dadadede@ds033196.mlab.com:33196/waifubot"; 

mongo.connect(mongoURL); 

const CommandSchema = mongo.Schema({
    Command: String, 
    Text: String
}, { collection: "Commands" });

const Command = mongo.model("Command", CommandSchema); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next(); 
});

app.get('/api', (req, res) => {
    Command.find({}, (err, result) => {
        if(err) res.send(err);
        else res.send(result); 
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));