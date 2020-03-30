const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //Leer el token del header

    const token = req.header('x-auth-token');

    console.log(token)

    //Revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no válido'});
    }



    //Validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.usuario = cifrado.usuario;
        next(); //se usa para finalizar el middleware e ir al siguiente
    }catch(error){
        res.status(401).json({msg:'Token no válido'});
    }
}
//El token generado anteriormente fue almacenado por el cliente y es leído mediante este middleware cada vez
//que el usuario haga una petcion a un endpoint