import dbConfig from './postgres'

export const connect = dbConfig.connect
export const controllers = dbConfig.controllers

export default dbConfig.default
