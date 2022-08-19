import { Request, Response } from "express"
import MembershipBusiness from "../business/MembershipBusiness"
import { RegisterMembershipInputDTO } from "../types/RegisterMembershipInputDTO"

export default class MembershipController {

    constructor(
        private membershipBusiness: MembershipBusiness
    ){}

    register = async(req:Request, res:Response) => {
        const {email, organization, role} = req.body

        const input: RegisterMembershipInputDTO = {
            email,
            organization,
            role
        }

        try {
            await this.membershipBusiness.register(input)
            res.status(201).send({message: "O usuário foi registrado como membro da organização"})    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Registrar o Usuário como membro`)
        }

    }

    getByOrganizationPage = async(req:Request, res:Response) => {

        const { organization } = req.params

        let { page }:any = req.query

        if(!page) {
            page = "1"
        }

        const queryResult:any = await this.membershipBusiness.getByOrganizationPage(organization, page)

        try {
            res.status(200).send(queryResult)    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Requisitar os Membros dessa Organização`)
        }

    }
}