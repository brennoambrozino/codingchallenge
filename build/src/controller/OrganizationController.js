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
class OrganizationController {
    constructor(organizationBusiness) {
        this.organizationBusiness = organizationBusiness;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const input = {
                name
            };
            try {
                yield this.organizationBusiness.register(input);
                res.status(201).send({ message: "Organização registrada com sucesso" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Registrar a Organização '${name}'`);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield this.organizationBusiness.getAll();
            try {
                res.status(200).send(queryResult);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Requisitar as Organizações`);
            }
        });
        this.getAllByPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { page } = req.params;
            const queryResult = yield this.organizationBusiness.getAllByPage(page);
            try {
                res.status(200).send(queryResult);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Requisitar as Organizações`);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const queryResult = yield this.organizationBusiness.getById(id);
            const organization = {
                name: queryResult.name
            };
            try {
                res.status(200).send({ organization });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Requisita a Organização`);
            }
        });
    }
}
exports.default = OrganizationController;
//# sourceMappingURL=OrganizationController.js.map