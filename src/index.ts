import MembershipBusiness from "./business/MembershipBusiness"
import OrganizationBusiness from "./business/OrganizationBusiness"
import UserBusiness from "./business/UserBusiness"
import { app } from "./controller/app"
import MembershipController from "./controller/MemberShipController"
import OrganizationController from "./controller/OrganizationController"
import UserController from "./controller/UserController"
import MembershipData from "./data/MembershipData"

import OrganizationData from "./data/OrganizationData"
import UserData from "./data/UserData"
import { IdGenerator } from "./services/IdGenerator"

const organizationBusiness = new OrganizationBusiness(
    new OrganizationData(),
    new IdGenerator()
)


const organizationController = new OrganizationController(
    organizationBusiness
)

app.post("/organization/register", organizationController.register)
app.get("/organization/list", organizationController.getAll)
app.get("/organization/list/:page", organizationController.getAllByPage) 
app.get("/organization/:id", organizationController.getById)

const userBusiness = new UserBusiness(
    new UserData(),
    new IdGenerator()
)


const userController = new UserController(
    userBusiness
)

app.post("/user/register", userController.register)
app.get("/user/list", userController.getAll)
app.get("/user/list/:page", userController.getAllByPage)
app.get("/user/:id", userController.getById)

const membershipBusiness = new MembershipBusiness(
    new MembershipData(),
    new UserData(),
    new OrganizationData(),
    new IdGenerator()
)


const membershipController = new MembershipController(
    membershipBusiness
)

app.get("/membership/list/:organization", membershipController.getByOrganizationPage)
app.post("/membership/register", membershipController.register)