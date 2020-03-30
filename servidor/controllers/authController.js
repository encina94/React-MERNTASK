const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) => {

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body;

    try{
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password incorrecto'});
        }

        //si todo es correcto creo el jwt crear y firmar el JWT
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

    } catch(error){
        console.log(error);
    }

//Cuando el usuario se autentica, se le genera un token, ese token lo toma el cliente y despues
//cada peticion que haga manda ese token en el header, entonces cada endpoint primero va a chequear si ese token
//es valido y despues accede a proceder con la accion

}

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}