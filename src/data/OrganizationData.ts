import Organization from "../model/Organization"
import { FindByIdResponse } from "../types/FindByIdResponse"
import { FindByNameResponse } from "../types/FindByNameResponse"
import { GetByIdDTO } from "../types/GetByIdDTO"
import { SelectAllResponse } from "../types/SelectAllResponse"
import { BaseDataBase } from "./BaseDataBase"

export default class OrganizationData extends BaseDataBase{
    protected TABLE_NAME = "CODING_CHALLENGE_ORGANIZATION"

    insert = async (organization: Organization) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(organization)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    findByName = async(name:string) => {
        try {
            const queryResult:FindByNameResponse = await this
                .connection(this.TABLE_NAME)
                .select()
                .where({name})
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
            const queryResult:SelectAllResponse = await this
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

    selectAllByPage = async(page:number) => {
        try {
            const queryResult:SelectAllResponse = await this
                .connection(this.TABLE_NAME)
                .select()
                .orderBy("name")
                .limit(10)
                .offset(10 * (page - 1))
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
            const queryResult:FindByIdResponse = await this
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