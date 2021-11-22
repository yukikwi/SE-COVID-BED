import { Document, ObjectId } from 'mongoose'

// export interface
export interface IUser extends Document {
    username: string,
    password?: string,
    token?: string,
    role?: string,
}

// export type
export type TUser = {
    _id?: any,
    username?: string,
    password?: string,
    token?: string,
    role?: string,
    hospitalId?: ObjectId | string
}