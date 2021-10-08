import { Document } from 'mongoose'

// export interface
export interface IUser extends Document {
    username: string,
    password: string
}

// export type
export type TUser = {
    username?: string,
    password?: string
}