const errorHandler = (error, req, res, next) =>{
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message || "API ERROR"
    const data = {
        method: req.method,
        url: req.url,
        error: message
    }
    return res.status(status).json(data)
}

export default errorHandler