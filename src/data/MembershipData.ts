import Membership from "../model/Membership"
import { BaseDataBase } from "./BaseDataBase"

export default class MembershipData extends BaseDataBase{
    protected TABLE_NAME = "CODING_CHALLENGE_MEMBERSHIP"

    insert = async (membership: Membership) => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(membership)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }
    
    findByOrganizationIdPage = async(organization_id:string, page:number) => {
        try {
            const queryResult:any= await this
                .connection(this.TABLE_NAME)
                .select()
                .where({organization_id})
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
}