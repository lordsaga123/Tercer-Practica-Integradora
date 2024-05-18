const { EErrors } = require("../services/errors/enums")

const handleError = (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case EErrors.PATH_ERROR:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        case EErrors.INVALID_TYPE:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        case EErrors.BD_ERROR:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        case EErrors.INPUT_VALIDATION:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        case EErrors.AUTHENTICACION:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        case EErrors.AUTHORIZATION:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        case EErrors.CONNECTION:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        case EErrors.REQUEST_TIME:
            res.send({ status: "error", error: error.name, message: error.message, cause: error.cause, code: error.code })
            break
        default:
            res.send({ status: "error", error: "unknown error", message: error.message, cause: error.cause, code: error.code });
    };
};

module.exports = handleError
