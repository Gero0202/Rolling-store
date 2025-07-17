import { productsManager } from "../dao/dao.factory.js"
import ProductDto from "../dto/products.dto.js"


const createRep = async(data) =>{ 
    data = new ProductDto(data)
    await productsManager.create(data)
}    
const readAllRep = async(filter) => await productsManager.readAll(filter)
const readByIdRep = async(pid) => await productsManager.readById(pid)
const updateByIdRep = async(pid, data) => await productsManager.updateById(pid, data)
const destroyByIdRep = async(pid) => await productsManager.destroyById(pid)

export { createRep, readAllRep, readByIdRep, updateByIdRep, destroyByIdRep }