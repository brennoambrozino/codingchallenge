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
const User_1 = __importDefault(require("../model/User"));
class UserBusiness {
    constructor(userData, idGenerator) {
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.create = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email } = input;
            if (!name || !email) {
                throw new Error("Campos inválidos");
            }
            if (!email.includes('@')) {
                throw new Error("O Email deve ter '@' e '.com'");
            }
            if (!email.includes('.com')) {
                throw new Error("O Email deve ter '@' e '.com'");
            }
            const registeredEmail = yield this.userData.findByEmail(email);
            if (registeredEmail) {
                throw new Error("Esse Email já está cadastrado");
            }
            const id = this.idGenerator.generateId();
            const user = new User_1.default(id, name.toUpperCase(), email);
            yield this.userData.insert(user);
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userData.selectAll();
            return users;
        });
        this.getAllByPage = (page) => __awaiter(this, void 0, void 0, function* () {
            let users = [];
            if (Number(page) < 1) {
                users = yield this.userData.selectAllByPage(1);
            }
            else {
                users = yield this.userData.selectAllByPage(Number(page));
            }
            if (!users) {
                throw new Error("Erro ao encontrar os Usuários");
            }
            return users;
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userData.findById(id);
            if (!user) {
                throw new Error("Usuário não encontrada");
            }
            return user;
        });
    }
}
exports.default = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map