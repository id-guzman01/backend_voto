import jwt from "jsonwebtoken";
import config from "../config";

const isLogged = (request, response, next) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'] || request.headers['Authorization'];
    if(!token){
        response.json({
            status: 401,
            message: "Bad request, requiere un token para continuar con el acceso"
        });
    }else{
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.secret_key, (error,decoded) => {
            if(error){
                response.json({
                    status: 401,
                    message: "Bad request, token de acceso incorrecto o ya expiró"
                });
            }else{
                next();
            }
        });
    }
}

module.exports = {
    isLogged
}