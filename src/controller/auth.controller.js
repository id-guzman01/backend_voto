const conexion = require('../database/conexion.database');
import  ExceptionError  from '../exception/exception.hableError';
import bcrypt from "bcryptjs";
import config from "../config";
import jwt from "jsonwebtoken";

const createUser = (req, res) => {
}

const login = (request, response) => {
    try {
        const {usuario, password} = request.body;
        conexion.query('select * from usuarios where usuario = ?',[usuario], function (err, result, fields) {
            if(bcrypt.compareSync(password,result[0].password)){
                const data = {
                    usuario: result[0].usuario
                };
                const payload = {
                    check:true
                };
                const token = jwt.sign({
                    payload,
                    data: data
                }, config.secret_key, { expiresIn: '1h' });
                response.status(200).json({
                    status: 200,
                    message: "logged in session successful",
                    token: token
                });
            }else{
                response.status(400).json({
                    status: 400,
                    message: "No autorizado, password erronea"
                });
            }
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

export const method = {
    createUser,
    login
}
