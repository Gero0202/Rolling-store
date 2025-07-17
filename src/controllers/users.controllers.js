import { readAllUsersService, createUserService, readOneUserService, updateUserService, destroyUserService } from "../services/users.service.js";

const getAllUsers = async (req, res) => {
    const filter = req.query
    const all = await readAllUsersService(filter)
    if (all.length > 0) {
        return res.json200(all)
    }
    return res.json404()
};

const createUser = async (req, res) => {
    const data = req.body
    const one = await createUserService(data)
    res.json201(one)
}

const readOneUser = async (req, res) => {
    const { uid } = req.params;
    const user = await readOneUserService(uid)
    if (user) {
        return res.json200(user)
    }
    return res.json404("User not found")
}

const updateUser = async (req, res) => {
    const { uid } = req.params
    const newData = req.body
    const updatedUser = await updateUserService(uid, newData)
    if (updatedUser) {
        return res.json200(updatedUser)
    }
    return res.json404()
};

const destroyUser = async (req, res) => {
    const { uid } = req.params
    const one = await destroyUserService(uid)
    if (one) {
        return res.json200(one)
    }
    return res.json404()
}

export { getAllUsers, createUser, destroyUser, readOneUser, updateUser }