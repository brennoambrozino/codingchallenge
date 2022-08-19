"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Membership_1 = __importDefault(require("../model/Membership"));
class MembershipBusiness {
    constructor(membershipData, userData, organizationData, idGenerator) {
        this.membershipData = membershipData;
        this.userData = userData;
        this.organizationData = organizationData;
        this.idGenerator = idGenerator;
        this.register = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, organization, role } = input;
            if (!email || !organization || !role) {
                throw new Error("Campos inválidos");
            }
            const userQueryResult = yield this.userData.findByEmail(email);
            if (!userQueryResult) {
                throw new Error("Email inválido");
            }
            const user_id = userQueryResult.id;
            const organizationQueryResult = yield this.organizationData.findByName(organization.toUpperCase());
            if (!organizationQueryResult) {
                throw new Error("Confira se o nome da Organização está correto");
            }
            const organization_id = organizationQueryResult.id;
            const id = this.idGenerator.generateId();
            const membership = new Membership_1.default(id, user_id, organization_id, role.toUpperCase());
            yield this.membershipData.insert(membership);
        });
        this.getByOrganizationPage = (organization, page) => __awaiter(this, void 0, void 0, function* () {
            const organizationQueryResult = yield this.organizationData.findByName(organization.toUpperCase());
            const organization_id = organizationQueryResult.id;
            const membershipQueryResult = yield this.membershipData.findByOrganizationIdPage(organization_id, Number(page));
            let members = [];
            for (let membership of membershipQueryResult) {
                const userQueryResult = yield this.userData.findById(membership.user_id);
                const member = {
                    name: userQueryResult.name,
                    role: membership.role
                };
                members.push(member);
            }
            return members;
        });
    }
}
exports.default = MembershipBusiness;
//# sourceMappingURL=MembershipBusiness.js.map