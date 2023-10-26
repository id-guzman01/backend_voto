import {getConnection} from '../database/conexion.database';
import  ExceptionError  from '../exception/exception.hableError';

const insertAvance = async(request, response) => {
    try {
        const { nombre, telefono, password, email } = request.body;
        const connection = await getConnection();
        //const password_bcrypt = await bcrypt.hash(password,10);
        //await connection.query("insert into usuarios (nombre, telefono, password, email) value (?,?,?,?)",[nombre,telefono,password_bcrypt,email]);
        response.json({
            status: 200,
            message: "user added susseful"
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}


export const method = {
    insertAvance
}
