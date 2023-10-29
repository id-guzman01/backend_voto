const conexion = require('../database/conexion.database');
import  ExceptionError  from '../exception/exception.hableError';

const select = (request, response) => {
    try {
        conexion.query("select * from ciudad", function (err, result, fields) {
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