"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MembershipBusiness_1 = __importDefault(require("./business/MembershipBusiness"));
const OrganizationBusiness_1 = __importDefault(require("./business/OrganizationBusiness"));
const UserBusiness_1 = __importDefault(require("./business/UserBusiness"));
const app_1 = require("./controller/app");
const MemberShipController_1 = __importDefault(require("./controller/MemberShipController"));
const OrganizationController_1 = __importDefault(require("./controller/OrganizationController"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const MembershipData_1 = __importDefault(require("./data/MembershipData"));
const OrganizationData_1 = __importDefault(require("./data/OrganizationData"));
const UserData_1 = __importDefault(require("./data/UserData"));
const IdGenerator_1 = require("./services/IdGenerator");
const organizationBusiness = new OrganizationBusiness_1.default(new OrganizationData_1.default(), new IdGenerator_1.IdGenerator());
const organizationController = new OrganizationController_1.default(organizationBusiness);
app_1.app.post("/organization/register", organizationController.register);
app_1.app.get("/organization/list", organizationController.getAll);
app_1.app.get("/organization/list/:page", organizationController.getAllByPage);
app_1.app.get("/organization/:id", organizationController.getById);
const userBusiness = new UserBusiness_1.default(new UserData_1.default(), new IdGenerator_1.IdGenerator());
const userController = new UserController_1.default(userBusiness);
app_1.app.post("/user/register", userController.register);
app_1.app.get("/user/list", userController.getAll);
app_1.app.get("/user/list/:page", userController.getAllByPage);
app_1.app.get("/user/:id", userController.getById);
const membershipBusiness = new MembershipBusiness_1.default(new MembershipData_1.default(), new UserData_1.default(), new OrganizationData_1.default(), new IdGenerator_1.IdGenerator());
const membershipController = new MemberShipController_1.default(membershipBusiness);
app_1.app.get("/membership/list/:organization", membershipController.getByOrganizationPage);
app_1.app.post("/membership/register", membershipController.register);
//# sourceMappingURL=index.js.map