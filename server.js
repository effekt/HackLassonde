const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/message');

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/hacklassonde", {useNewUrlParser: true}, (err) => {
    if (err)
        console.log(err);
    else
        Message.addMessage({sender: 'SYSTEM', text: 'Successfully connected!'}, (err, res) => {
            if (err)
                console.log(err);
            else
                console.log('Message Saved!');
        });
        
});

require('./api/message')(app);
app.get('/', (req, res) => {
    res.send('Hello HackLassonde');
});

app.listen(port, (err) => {console.log(`Listening on port ${port}`)});