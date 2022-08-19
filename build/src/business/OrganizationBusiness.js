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
const Organization_1 = __importDefault(require("../model/Organization"));
class OrganizationBusiness {
    constructor(organizationData, idGenerator) {
        this.organizationData = organizationData;
        this.idGenerator = idGenerator;
        this.register = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name } = input;
            if (!name) {
                throw new Error("Campos inválidos");
            }
            const registeredOrganization = yield this.organizationData.findByName(name.toUpperCase());
            if (registeredOrganization) {
                throw new Error("Já existe uma organização com esse nome");
            }
            const id = this.idGenerator.generateId();
            const user = new Organization_1.default(id, name.toUpperCase());
            yield this.organizationData.insert(user);
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const organizations = yield this.organizationData.selectAll();
            return organizations;
        });
        this.getAllByPage = (page) => __awaiter(this, void 0, void 0, function* () {
            let organizations = [];
            if (Number(page) < 1) {
                organizations = yield this.organizationData.selectAllByPage(1);
            }
            else {
                organizations = yield this.organizationData.selectAllByPage(Number(page));
            }
            if (!organizations) {
                throw new Error("Erro ao encontrar as organizações");
            }
            return organizations;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const organization = yield this.organizationData.findById(id);
            if (!organization) {
                throw new Error("Organização não encontrada");
            }
            return organization;
        });
    }
}
exports.default = OrganizationBusiness;
//# sourceMappingURL=OrganizationBusiness.js.map