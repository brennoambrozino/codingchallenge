import UserData from "../data/UserData"
import User from "../model/User"
import { IdGenerator } from "../services/IdGenerator"
import { CreateInputDTO } from "../types/CreateInputDTO"

export default class UserBusiness{

    constructor(
        private userData:UserData,
        private idGenerator:IdGenerator
    ){}

    create = async(input:CreateInputDTO) => {
        const {name, email} = input
        if(!name || !email) {
            throw new Error("Campos inválidos")
        }

        if(!email.includes('@')) {
            throw new Error("O Email deve ter '@' e '.com'")
            
        }

        if(!email.includes('.com')) {
            throw new Error("O Email deve ter '@' e '.com'")
            
        }
        
        const registeredEmail = await this.userData.findByEmail(email)
        if(registeredEmail){
            throw new Error("Esse Email já está cadastrado")
        }
        
        const id = this.idGenerator.generateId()

        const user = new User(
            id, 
            name.toUpperCase(),
            email
        )
        await this.userData.insert(user)

    }

    getAll = async() => {
        const users = await this.userData.selectAll()

        return users
    }

    getById = async(id:string) => {
        const user = await this.userData.findById(id)

        if(!user) {
            throw new Error("Usuário não encontrada")
        }

        return user
    }
}