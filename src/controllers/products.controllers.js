import { createService, readAllService, readByIdService, updateByIdService, destroyByIdService } from "../services/products.service.js"
import { Types } from "mongoose"

const readOneProduct = async (req, res) => {

    const { pid } = req.params
    const one = await readByIdService(pid)
    if (one) {
        return res.json200(one)
    }
    return res.json400()
}

const readProducts = async (req, res) => {

    const filter = req.query
    const all = await readAllService(filter)
    if (all.length > 0) {
        return res.json200(all)
    }
    return res.json404()
}

const createProduct = async (req, res) => {
    const data = req.body
    const one = await createService(data)
    res.json201(one)
}

const updateProduct = async (req, res) => {
    const { pid } = req.params
    const data = req.body
    const one = await updateByIdService(pid, data)
    if (one) {
        return res.json200(one)
    }
    return res.json404()
}

const destroyProduct = async (req, res) => {

    const { pid } = req.params
    const one = await destroyByIdService(pid)
    if (one) {
        return res.json200(one)
    }
    return res.json404()
}

const pidParam = (req, res, next, pid) => {
    try {
        const isObjectId = Types.ObjectId.isValid(pid)
        if (isObjectId) return next()
        const error = new Error("Invalid ID")
        error.statusCode = 400
        throw error
    } catch (error) {
        next(error)
    }
}

export { readOneProduct, readProducts, createProduct, updateProduct, destroyProduct, pidParam }