const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = "Message";

let messageSchema = new Schema({
    sender: String,
    text: String,
    time: {type: Date, default: Date.now()}
});

messageSchema.statics.getAll = (cb, asc = true) => {
    mongoose.model(model)
    .find({})
    .exec((err, data) => {
        cb(err, data);
    });
}

messageSchema.statics.addMessage = function(newMessage, cb) {
    let msg = this(newMessage);
    msg.save((err, data) => {
        cb(err, data);
    })
}

module.exports = mongoose.model(model, messageSchema);