import { DB_TYPE } from '../config/appConfig'
import { DB_TYPES } from '../config/constants'
import dbConfig from './postgres'

export const connect = dbConfig.connect
export const controllers = dbConfig.controllers

export default dbConfig.default
