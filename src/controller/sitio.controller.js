import {getConnection} from '../database/conexion.database';
import  ExceptionError  from '../exception/exception.hableError';

const select = async(request, response) => {
    try {
        const connection = await getConnection();
        let list = await connection.query("select * from ciudad");
        response.json({
            status: 200,
            list: list
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

export const method = {
    select
}