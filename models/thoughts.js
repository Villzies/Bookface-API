const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
thoughtsText: { type: String, required: true, minlength: 3, maxlength: 500 },
username: { type: String, required: true },
reactions: { reactionSchema }
});

const reactionSchema = new mongoose.Schema({
reactionID: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId(),},
reactionText: { type: String, required: true, minlength: 3, maxlength: 500 },
username: { type: String, required: true },

});
const Thoughts = mongoose.model('Thoughts', thoughtSchema);

module.exports = Thoughts;