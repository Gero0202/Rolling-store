const setupResponses = (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const messages = {
            200: "Succes",
            201: "Created",
            400: "Client error",
            401: "Bad auth",
            403: "Forbbiden",
            404: "Not found",
            500: "Server error"
        }
        const succesResponse = (code, response, message = messages[code]) => {
            return res.status(code).json({
                method,
                message,
                url,
                response
            })
        }
        const errorResponse = (code, message = messages[code]) => {
            const error = new Error(message)
            error.statusCode = code
            throw error
        }
        res.json200 = (response, message) => succesResponse(200, response, message)
        res.json201 = (response, message) => succesResponse(201, response, message)
        res.json400 = (message) => errorResponse(400, message)
        res.json401 = (message) => errorResponse(401, message)
        res.json403 = (message) => errorResponse(403, message)
        res.json404 = (message) => errorResponse(404, message)
        res.json500 = (message) => errorResponse(500, message)
        next()
    } catch (error) {
        next(error)
    }
}

export default setupResponses