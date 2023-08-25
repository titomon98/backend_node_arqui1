function statusOk(res, message) {
    return baseResponse(res, 200, true, null, message, null)
}

function dataStatusOk(res, data) {
    return baseResponse(res, 200, true, data, null, null)
}

function messageStatusOk(res, data, message) {
    return baseResponse(res, 200, true, data, message, null)
}

function falseStatusOk(res, message) {
    return baseResponse(res, 200, false, null, message, null)
}

function returnBadRequest(res, message, error) {
    return baseResponse(res, 400, false, null, message, error)
}

function returnNotFound(res, message) {
    return baseResponse(res, 404, false, null, message, null)
}

function returnInternalServerError(res, message, error) {
    return baseResponse(res, 500, false, null, message, error)
}

function baseResponse(res, code, successful, data, message, error) {
    return res
        .status(code)
        .json({
            successful: successful,
            data: data,
            message: message,
            error: error
        })
}

module.exports = {
    statusOk,
    dataStatusOk,
    messageStatusOk,
    falseStatusOk,
    returnBadRequest,
    returnNotFound,
    returnInternalServerError
};