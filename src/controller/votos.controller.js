import {getConnection} from '../database/conexion.database';
import  ExceptionError  from '../exception/exception.hableError';

const insertAvance = async(request, response) => {
    try {
        const { cime_id, votantes, votos_alcalde, registradopor } = request.body;
        const connection = await getConnection();
        await connection.query("insert into cantidad (cime_id, votantes, votos_alcalde, registradopor, hora)values (?,?,?,?,DATE_FORMAT(CURRENT_TIME(), '%h:%i %p'))",[cime_id, votantes, votos_alcalde, registradopor]);
        response.json({
            status: 200,
            message: "Nuevo registro exitoso"
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
        let list = await connection.query("SELECT cantidad.id, ciudad.municipio, cantidad.votantes, cantidad.votos_alcalde, cantidad.hora FROM ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id and cime_id = ?",[id]);
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
        let list = await connection.query("SELECT ciudad.municipio ,sum(votantes) as 'sumatoria_votantes', SUM(votos_alcalde) as 'sumatoria_votos_por_alcalde' FROM ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id group by ciudad.municipio");
        response.json({
            status: 200,
            list: list
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

const selectTotal = async(request, response) => {
    try {
        const connection = await getConnection();
        let list = await connection.query("SELECT sum(votantes) as 'sumatoria_votantes', SUM(votos_alcalde) as 'sumatoria_votos_por_alcalde' FROM ciudad, mesas, ciudad_has_mesa, cantidad where ciudad.id = ciudad_has_mesa.ciudad_id and ciudad_has_mesa.mesa_id = mesas.id and ciudad_has_mesa.id = cantidad.cime_id");
        response.json({
            status: 200,
            list: list
        });
    } catch (error) {
        ExceptionError.errors(response,error);
    }
}

const selectGrafica = async(request, response) => {
    try {
        const connection = await getConnection();
        let list = await connection.query("SELECT ciudad.municipio, SUM(votantes) AS sumatoria_votantes, SUM(votos_alcalde) AS sumatoria_votos_por_alcalde, EXTRACT(HOUR FROM cantidad.hora) AS hora FROM ciudad JOIN ciudad_has_mesa ON ciudad.id = ciudad_has_mesa.ciudad_id JOIN mesas ON ciudad_has_mesa.mesa_id = mesas.id JOIN cantidad ON ciudad_has_mesa.id = cantidad.cime_id GROUP BY ciudad.municipio, EXTRACT(HOUR FROM cantidad.hora)");
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
    selectTotal,
    selectGrafica
}