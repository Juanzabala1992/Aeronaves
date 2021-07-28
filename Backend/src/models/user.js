const {Schema, model} = require('mongoose');

const userSchema= Schema({
    email:String, 
    password: String
}, {
    timestamps:true
});

module.exports = model('user', userSchema);