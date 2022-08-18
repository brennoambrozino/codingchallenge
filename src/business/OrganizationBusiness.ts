import OrganizationData from "../data/OrganizationData"
import Organization from "../model/Organization"
import { IdGenerator } from "../services/IdGenerator"
import { FindByIdResponse } from "../types/FindByIdResponse"
import { GetByIdDTO } from "../types/GetByIdDTO"
import { RegisterInputDTO } from "../types/RegisterInputDTO"
import { SelectAllResponse } from "../types/SelectAllResponse"

export default class OrganizationBusiness{

    constructor(
        private organizationData:OrganizationData,
        private idGenerator:IdGenerator
    ){}

    register = async(input:RegisterInputDTO) => {
        const {name} = input
        if(!name) {
            throw new Error("Campos inválidos")
        }
        
        const registeredOrganization = await this.organizationData.findByName(name.toUpperCase())
        if(registeredOrganization){
            throw new Error("Já existe uma organização com esse nome")
        }
        
        const id = this.idGenerator.generateId()

        const user = new Organization(
            id, 
            name.toUpperCase()
        )
        await this.organizationData.insert(user)

    }

    getAll = async() => {
        const organizations:SelectAllResponse = await this.organizationData.selectAll()

        return organizations
    }

    getById = async(id:string) => {
        const organization = await this.organizationData.findById(id)

        if(!organization) {
            throw new Error("Organização não encontrada")
        }

        return organization
    }
}