import fs from 'fs/promises'
import { existsSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'

class FileSystemManager {
    constructor(filePath) {
        this.filePath = filePath
        this.#init()
    }

   
    async #init() {
        if (!existsSync(this.filePath)) {
            await fs.writeFile(this.filePath, JSON.stringify([]))
        }
    }

    async #readFile() {
        const data = await fs.readFile(this.filePath, 'utf-8')
        return JSON.parse(data)
    }

    async #writeFile(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2))
    }

    async create(data) {
        try {
            const all = await this.#readFile()
            const newItem = { _id: uuidv4(), ...data }
            all.push(newItem)
            await this.#writeFile(all)
            return newItem
        } catch (error) {
            throw error
        }
    }

    async readAll(filter = {}) {
        try {
            const all = await this.#readFile()
            return all.filter(obj =>
                Object.entries(filter).every(([key, value]) => obj[key] === value)
            )
        } catch (error) {
            throw error
        }
    }

    async readById(id) {
        try {
            const all = await this.#readFile()
            return all.find(obj => obj._id === id)
        } catch (error) {
            throw error
        }
    }

    async readBy(data) {
        try {
            const all = await this.#readFile()
            return all.find(obj =>
                Object.entries(data).every(([key, value]) => obj[key] === value)
            )
        } catch (error) {
            throw error
        }
    }

    async readOne(filter) {
        return await this.readBy(filter)
    }

    async updateById(id, data) {
        try {
            const all = await this.#readFile()
            const index = all.findIndex(obj => obj._id === id)
            if (index === -1) return null
            all[index] = { ...all[index], ...data }
            await this.#writeFile(all)
            return all[index]
        } catch (error) {
            throw error
        }
    }

    async updateOne(filter, data) {
        try {
            const all = await this.#readFile()
            const index = all.findIndex(obj =>
                Object.entries(filter).every(([key, value]) => obj[key] === value)
            )
            if (index === -1) return null
            all[index] = { ...all[index], ...data }
            await this.#writeFile(all)
            return all[index]
        } catch (error) {
            throw error
        }
    }

    async updateMany(filter, data) {
        try {
            const all = await this.#readFile()
            let modified = 0
            const updated = all.map(obj => {
                if (Object.entries(filter).every(([key, value]) => obj[key] === value)) {
                    modified++
                    return { ...obj, ...data }
                }
                return obj
            })
            await this.#writeFile(updated)
            return { modifiedCount: modified }
        } catch (error) {
            throw error
        }
    }

    async destroyById(id) {
        try {
            const all = await this.#readFile()
            const index = all.findIndex(obj => obj._id === id)
            if (index === -1) return null
            const [deleted] = all.splice(index, 1)
            await this.#writeFile(all)
            return deleted
        } catch (error) {
            throw error
        }
    }

    async destroyOne(filter) {
        try {
            const all = await this.#readFile()
            const index = all.findIndex(obj =>
                Object.entries(filter).every(([key, value]) => obj[key] === value)
            )
            if (index === -1) return null
            const [deleted] = all.splice(index, 1)
            await this.#writeFile(all)
            return deleted
        } catch (error) {
            throw error
        }
    }

    async destroyMany(filter) {
        try {
            const all = await this.#readFile()
            const remaining = all.filter(obj =>
                !Object.entries(filter).every(([key, value]) => obj[key] === value)
            )
            const deletedCount = all.length - remaining.length
            await this.#writeFile(remaining)
            return { deletedCount }
        } catch (error) {
            throw error
        }
    }
}

export default FileSystemManager

