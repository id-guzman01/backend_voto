const conexion = require('../database/conexion.database');
import  ExceptionError  from '../exception/exception.hableError';

const select = (request, response) => {
    try {
        const {id} = request.params;
        conexion.query("SELECT mesas.id, mesas.mesa, ciudad_has_mesa.id as cime_id FROM ciudad, mesas, ciudad_has_mesa where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad.id = ?",[id], function (err, result, fields) {
            let list = result;
            response.json({
                status: 200,
                list: list
            });
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

export const method = {
    select
}