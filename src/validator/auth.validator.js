import { check } from "express-validator";
import validationError from '../exception/validation.handleError';

const validateCreate = [
    check("usuario").exists()
                .isString()
                .not()
                .isEmpty(),
    check("password").exists()
                .isString()
                .not()
                .isEmpty(),
    (request, response, next) => {
        validationError.validateResult(request, response, next);
    }
];

module.exports = {
    validateCreate
}