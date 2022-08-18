import User from "../model/User"
import { FindByEmailResponse } from "../types/FindByEmailResponse"
import { BaseDataBase } from "./BaseDataBase"

export default class UserData extends BaseDataBase{
    protected TABLE_NAME = "CODING_CHALLENGE_USER"

    insert = async (user: User) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(user)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    findByEmail = async(email:string) => {
        try {
            const queryResult:FindByEmailResponse = await this
                .connection(this.TABLE_NAME)
                .select("*")
                .where({email})
            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    selectAll = async() => {
        try {
            const queryResult:any = await this
                .connection(this.TABLE_NAME)
                .select()
            return queryResult
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    findById = async(id:string) => {
        try {
            const queryResult:any= await this
                .connection(this.TABLE_NAME)
                .select("*")
                .where({id})
            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }
}