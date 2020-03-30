
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //revisar si hay errores generados en el route que llama a esta funcion de este controlador
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body;

    try{
        // Revisar que el usuario sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }

        };

        //firmar el JWT
        jwt.sign(payload,process.env.SECRET,{
            expiresIn: 36000000
        }, (error,token) => {
            if(error) throw error;

            //Mensaje de confirmacion, retorna el token
            return res.json({token});

        })

    }catch(error){
        console.log(error);
        return res.status(400).send('Hubo un error');

    }

}