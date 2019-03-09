const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Message = require('./models/message');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/hacklassonde', {useNewUrlParser: true}, (err) => {
    console.log(err ? 'Could not connect to database.' : 'Successfully connected to database.');
    if (!err)
        Message.addMessage({sender: 'SYSTEM', text: 'Successfully connected to database.'}, (err, res) => {
            console.log(err ? err : 'Message added.');
        });
});

require('./api/message')(app);
app.get('/', (req, res) => {
    res.send('Hello HackLassonde!');
});

app.listen(port, () => console.log(`HackLassonde is listening on port ${port}`));