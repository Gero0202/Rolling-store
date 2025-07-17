import { createRep, readAllRep, readByIdRep, updateByIdRep, destroyByIdRep } from "../repositories/products.rep.js"

const createService = async(data) => await createRep(data)
const readAllService = async(filter) => await readAllRep(filter)
const readByIdService = async(pid) => await readByIdRep(pid)
const updateByIdService = async(pid, data) => await updateByIdRep(pid, data)
const destroyByIdService = async(pid) => await destroyByIdRep(pid)

export { createService, readAllService, readByIdService, updateByIdService, destroyByIdService }