import User from "./models/users.model.js"
import Product from "./models/products.model.js"

class Manager {
    constructor(model) {
        this.model = model
    }
    create = async (data) => {
        try {
            const one = await this.model.create(data)
            return one
        } catch (error) {
            throw error
        }
    }
    readAll = async (filter) => {
        try {
            const all = await this.model.find(filter).lean()
            return all
        } catch (error) {
            throw error
        }
    }
    readById = async (id) => {
        try {
            const one = await this.model.findById(id).lean()
            return one
        } catch (error) {
            throw error
        }
    }
    
    readBy = async (data) => await this.model.findOne(data).lean()

    readOne = async (filter) => {
        try {
            const one = await this.model.findOne(filter).lean()
        } catch (error) {
            throw error
        }
    }
    updateById = async (id, data) => {
        try {
            const opts = { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }
    updateOne = async (filter, data) => {
        try {
            const opts = { new: true }
            const one = await this.model.findOneAndUpdate(filter, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }
    destroyById = async (id) => {
        try {
            const one = await this.model.findByIdAndDelete(id)
            return one
        } catch (error) {
            throw error
        }
    }
    destroyOne = async (filter) => {
        try {
            const one = await this.model.findOneAndDelete(filter)
            return one
        } catch (error) {
            throw error
        }
    }

    
    updateMany = async (filter, data) => {
        try {
            const result = await this.model.updateMany(filter, { $set: data });
            return result;
        } catch (error) {
            throw error;
        }
    };

    destroyMany = async (filter) => {
        try {
            const result = await this.model.deleteMany(filter);
            return result;
        } catch (error) {
            throw error;
        }
    };
    
    
    
}

export default Manager

const usersManager = new Manager(User)
const productsManager = new Manager(Product)

export { usersManager, productsManager }