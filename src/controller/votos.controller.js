import {getConnection} from '../database/conexion.database';
import  ExceptionError  from '../exception/exception.hableError';

const insertAvance = async(request, response) => {
    try {
        const { nombre, telefono, password, email } = request.body;
        const connection = await getConnection();
        for(let i = 1; i <= 9; i++){
            await connection.query("insert into ciudad_has_mesa (ciudad_id, mesa_id) values (?,?)",[4,i]);
        }
        response.json({
            status: 200,
            message: "user added successful"
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}


export const method = {
    insertAvance
}
