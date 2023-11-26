const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: { type: String, unique: true, required: true },
email: { type: String, unique: true, required: true,  match: [/.+@.+\..+/] },
thoughts: { type: Schema.Types.ObjextID, ref: "Thoughts" },
});

const User = mongoose.model('User', userSchema);

module.exports = User;