import {getConnection} from '../database/conexion.database';
import  ExceptionError  from '../exception/exception.hableError';

const select = async(request, response) => {
    try {
        const {id} = request.params;
        const connection = await getConnection();
        let list = await connection.query("SELECT mesas.id, mesas.mesa FROM ciudad, mesas, ciudad_has_mesa where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad.id = ?",[id]);
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