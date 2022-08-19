export default class Membership{
    constructor(
        private id:string,
        private user_id:string,
        private organization_id: string,
        private role:string
    ){}
}