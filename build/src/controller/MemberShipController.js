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
class MembershipController {
    constructor(membershipBusiness) {
        this.membershipBusiness = membershipBusiness;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, organization, role } = req.body;
            const input = {
                email,
                organization,
                role
            };
            try {
                yield this.membershipBusiness.register(input);
                res.status(201).send({ message: "O usuário foi registrado como membro da organização" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Registrar o Usuário como membro`);
            }
        });
        this.getByOrganizationPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { organization } = req.params;
            let { page } = req.query;
            if (!page) {
                page = "1";
            }
            const queryResult = yield this.membershipBusiness.getByOrganizationPage(organization, page);
            try {
                res.status(200).send(queryResult);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(`Erro ao Requisitar os Membros dessa Organização`);
            }
        });
    }
}
exports.default = MembershipController;
//# sourceMappingURL=MemberShipController.js.map