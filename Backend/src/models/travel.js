const {Schema, model} = require('mongoose');

const travelSchema= Schema({
    ubicacion:String, 
    llegada: String,
    salida:String,
    pasajeros:String 
}, {
    timestamps:true
});

module.exports = model('travel', travelSchema);