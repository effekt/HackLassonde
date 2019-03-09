const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let model = "Message";
let messageSchema = new Schema({
    sender: String,
    text: String,
    time: {type: Date, default: Date.now()}
});

messageSchema.statics.getAll = function(cb, asc = true) {
    mongoose.model(model)
    .find({})
    .sort({time: asc ? 'asc' : 'desc'})
    .exec((err, res) => {
        if (err)
            console.log(err);
        cb(err, res);
    });
}

messageSchema.statics.addMessage = function(message, cb) {
    let msg = this(message);
    msg.save((err, res) => {
        if (err)
            console.log(err);
        cb(err, res);
    });
}

module.exports = mongoose.model(model, messageSchema);