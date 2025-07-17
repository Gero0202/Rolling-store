import { readAllUsersRep, createUserRep, readOneUserRep, updateUserRep, destroyUserRep, readByRep } from "../repositories/users.rep.js"

const readAllUsersService = async(filter) => await readAllUsersRep(filter);
const createUserService = async(data) => await createUserRep(data)
const readOneUserService = async(uid) => await readOneUserRep(uid)
const readByService = async(data) => await readByRep(data)
const updateUserService = async(uid, newData) => await updateUserRep(uid, newData)
const destroyUserService = async(uid) => await destroyUserRep(uid)

export {readAllUsersService, createUserService, readOneUserService, updateUserService, destroyUserService, readByService}