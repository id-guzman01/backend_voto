import {getConnection} from '../database/conexion.database';
import  ExceptionError  from '../exception/exception.hableError';
import bcrypt from "bcryptjs";
import config from "../config";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const connection = await getConnection();
        const password_bcrypt= await bcrypt.hash(password,10);
        const result = await connection.query("insert into usuarios (usuario, password) value (?,?)",[usuario,password_bcrypt]);
        if(result){
            res.status(200).json({
                status: 200,
                message: "Usuario registrado con exito"
            });
        }else{
            res.status(200).json({
                status: 400,
                message: "Actualmente no es posible registrar al usuario, intente más tarde"
            });
        }
    } catch (error) {
        ExceptionError.errors(res,error);
    }
}

const login = async(request, response) => {
    try {
        const {usuario, password} = request.body;
        const connection = await getConnection();
        const result = await connection.query("select * from usuarios where usuario = ?",usuario);
        if(result){
            if(bcrypt.compareSync(password,result[0].password)){
                const data = {
                    id: result[0].usuario
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
        }else{
            response.status(401).json({
                status: 401,
                message: "No autorizado, email no registrado."
            });
        }
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

export const method = {
    createUser,
    login
}
