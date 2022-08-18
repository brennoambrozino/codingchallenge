import { Request, Response } from "express"
import OrganizationBusiness from "../business/OrganizationBusiness"
import { GetByIdDTO } from "../types/GetByIdDTO"
import { RegisterInputDTO } from "../types/RegisterInputDTO"
import { SelectAllResponse } from "../types/SelectAllResponse"

export default class OrganizationController {

    constructor(
        private organizationBusiness: OrganizationBusiness
    ){}

    register = async(req:Request, res:Response) => {
        const {name} = req.body

        const input: RegisterInputDTO = {
            name
        }

        try {
            await this.organizationBusiness.register(input)
            res.status(201).send({message: "Organização registrada com sucesso"})    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Registrar a Organização '${name}'`)
        }

    }

    getAll = async(req:Request, res:Response) => {

        const queryResult:SelectAllResponse = await this.organizationBusiness.getAll()

        try {
            res.status(200).send(queryResult)    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Requisitar as Organizações`)
        }

    }

    getById = async(req:Request, res:Response) => {

        const { id } = req.params

        const queryResult:any = await this.organizationBusiness.getById(id)

        const organization: GetByIdDTO = {
            name: queryResult.name
        }

        try {
            res.status(200).send({organization})    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Requisita a Organização`)
        }

    }

}