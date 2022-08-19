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
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.body;
            const input = {
                name,
                email
            };
            try {
                yield this.userBusiness.create(input);
                res.status(201).send({ message: "Usuário registrado com sucesso" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Registrar o Usuário`);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield this.userBusiness.getAll();
            try {
                res.status(200).send(queryResult);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Requisitar os Usuários`);
            }
        });
        this.getAllByPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page } = req.params;
            const queryResult = yield this.userBusiness.getAllByPage(page);
            try {
                res.status(200).send(queryResult);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Requisitar os Usuários`);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const queryResult = yield this.userBusiness.getById(id);
            const user = {
                name: queryResult.name,
                email: queryResult.email
            };
            try {
                res.status(200).send({ user });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Requisitar o Usuário`);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map