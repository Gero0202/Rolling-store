import { usersManager } from "../dao/dao.factory.js";

const readAllUsersRep = async(filter) => await usersManager.readAll(filter);
const createUserRep = async(data) => await usersManager.create(data)
const readOneUserRep = async(uid) => await usersManager.readById(uid)
const readByRep = async(data) => await usersManager.readBy(data)
const updateUserRep= async(uid, newData) => await usersManager.updateById(uid, newData)
const destroyUserRep = async(uid) => await usersManager.destroyById(uid)

export {readAllUsersRep, createUserRep, readOneUserRep, updateUserRep, destroyUserRep, readByRep}