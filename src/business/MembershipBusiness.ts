import MembershipData from "../data/MemberShipData"
import OrganizationData from "../data/OrganizationData"
import UserData from "../data/UserData"
import Membership from "../model/Membership"
import { IdGenerator } from "../services/IdGenerator"
import { RegisterMembershipInputDTO } from "../types/RegisterMembershipInputDTO"

export default class MembershipBusiness{

    constructor(
        private membershipData:MembershipData,
        private userData:UserData,
        private organizationData: OrganizationData,
        private idGenerator:IdGenerator
    ){}

    register = async(input:RegisterMembershipInputDTO) => {
        const {email, organization, role} = input

        if(!email || !organization || !role) {
            throw new Error("Campos inválidos")
        }

        
        const userQueryResult = await this.userData.findByEmail(email)

        if (!userQueryResult) {
            throw new Error("Email inválido")
        }
        const user_id = userQueryResult.id

        const organizationQueryResult = await this.organizationData.findByName(organization.toUpperCase())

        if (!organizationQueryResult) {
            throw new Error("Confira se o nome da Organização está correto")
        }

        const organization_id = organizationQueryResult.id

        
        
        const id = this.idGenerator.generateId()

        const membership = new Membership(
            id, 
            user_id,
            organization_id,
            role.toUpperCase()
        )

        
        await this.membershipData.insert(membership)

    }
}