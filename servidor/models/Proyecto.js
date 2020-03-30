const mongoose = require('mongoose');

const VroyectoscxvxSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true

    },
       //se guarda una referencia del usuario que lo crea,
        //en ref va el nombre que se le dio al modelo en el moongose.model del export del archivo correspondiente
        //De esta forma sabe que modelo tomar y hacer el "join" de mongodb
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'

    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto',VroyectoscxvxSchema);