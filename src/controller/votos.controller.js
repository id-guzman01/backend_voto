import {getConnection} from '../database/conexion.database';
import  ExceptionError  from '../exception/exception.hableError';

const insertAvance = async(request, response) => {
    try {
        const { cime_id, votantes, votos_alcalde, registradopor } = request.body;
        const connection = await getConnection();
        await connection.query("insert into cantidad (cime_id, votantes, votos_alcalde, registradopor, hora)values (?,?,?,?,DATE_FORMAT(CURRENT_TIME(), '%h:%i %p'))",[cime_id, votantes, votos_alcalde, registradopor]);
        response.json({
            status: 200,
            message: "registro nuevo exitoso"
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

//Total de votos en una mesa
const selectOneMesa = async(request, response) => {
    try {
        const { id } = request.params;
        const connection = await getConnection();
        let list = await connection.query("select cantidad.id, ciudad.municipio as 'lugar de votacion', mesas.mesa, SUM(cantidad.votos_alcalde) as 'total votos por alcalde', SUM(cantidad.votantes) as 'total votantes' from ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id and ciudad_has_mesa.id = ?",[id]);
        response.json({
            status: 200,
            list: list
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

const selectSumatoriaAllMesas = async(request, response) => {
    try {
        const connection = await getConnection();
        let list = await connection.query("select cantidad.id, ciudad.municipio as 'lugar de votacion', mesas.mesa, SUM(cantidad.votos_alcalde) as 'total votos por alcalde', SUM(cantidad.votantes) as 'total votantes' from ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id GROUP by ciudad.id, mesas.id");
        response.json({
            status: 200,
            list: list
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

const selectAllRegistrosPorMesa = async(request, response) => {
    try {
        const { id } = request.params;
        const connection = await getConnection();
        let list = await connection.query("select cantidad.votantes as 'Votantes', cantidad.votos_alcalde as 'Votos por alcalde', cantidad.hora as 'Hora de registro', cantidad.registradopor as 'Registrador' from ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id and ciudad_has_mesa.id = ?",[id]);
        response.json({
            status: 200,
            list: list
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}



export const method = {
    insertAvance,
    selectOneMesa,
    selectSumatoriaAllMesas,
    selectAllRegistrosPorMesa
}

/*
select cantidad.id, ciudad.municipio as 'lugar de votacion', mesas.mesa, cantidad.votantes, cantidad.votos_alcalde as 'votos por alcalde', cantidad.registradopor as registrador, cantidad.hora as 'hora de registro', SUM(cantidad.votos_alcalde) as 'total votos por alcalde', SUM(cantidad.votantes) as 'total votantes' from ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id and ciudad_has_mesa.id = 1;
*/

/*
select cantidad.id, ciudad.municipio as 'lugar de votacion', mesas.mesa, SUM(cantidad.votos_alcalde) as 'total votos por alcalde', SUM(cantidad.votantes) as 'total votantes' from ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id GROUP by ciudad.id, mesas.id;
*/