const isValidUser = (req, res, next) =>{
    try {
        const { name, email, password, date } = req.body
        if (!name) {
            const error = new Error("empty type name")
            error.statusCode = 404
            throw error
        }
        if (!email) {
            const error = new Error("empty type email")
            error.statusCode = 404
            throw error
        }
        if (!password) {
            const error = new Error("empty type password")
            error.statusCode = 404
            throw error
        }
        
        next()
    } catch (error) {
        next(error)
    }
}

export default isValidUser