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
}