const express       = require('express'),
      mongo         = require('mongoose'),
      path          = require('path');

const app = express();
const port = process.env.PORT || 5000;
const mongoURL = process.env.DBURL || "mongodb://website:dadadede@ds033196.mlab.com:33196/waifubot"; 

mongo.connect(mongoURL); 

const CommandSchema = mongo.Schema({
    Command: String, 
    Text: String
}, { collection: "Commands" });

const Command = mongo.model("Command", CommandSchema); 

app.use(express.static(__dirname + '../react-ui/build')); 

app.get('/api', (req, res) => {
    Command.find({}, (err, result) => {
        if(err) res.send(err);
        else res.send(result); 
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));