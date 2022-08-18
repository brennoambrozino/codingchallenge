import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"
import { CreateInputDTO } from "../types/CreateInputDTO"

export default class UserController {

    constructor(
        private userBusiness: UserBusiness
    ){}

    register = async(req:Request, res:Response) => {
        const {name, email} = req.body

        const input: CreateInputDTO = {
            name,
            email
        }

        try {
            await this.userBusiness.create(input)
            res.status(201).send({message: "Usuário registrado com sucesso"})    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Registrar o Usuário`)
        }

    }

    getAll = async(req:Request, res:Response) => {

        const queryResult:any= await this.userBusiness.getAll()

        try {
            res.status(200).send(queryResult)    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Requisitar os Usuários`)
        }

    }

    getById = async(req:Request, res:Response) => {

        const { id } = req.params

        const queryResult:any = await this.userBusiness.getById(id)

        const user = {
            name: queryResult.name,
            email: queryResult.email
        }

        try {
            res.status(200).send({user})    
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send(`Erro ao Requisitar o Usuário`)
        }

    }
}