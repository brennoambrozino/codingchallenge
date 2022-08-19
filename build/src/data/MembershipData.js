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
const BaseDataBase_1 = require("./BaseDataBase");
class MembershipData extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "CODING_CHALLENGE_MEMBERSHIP";
        this.insert = (membership) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this
                    .connection(this.TABLE_NAME)
                    .insert(membership);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Error do banco !");
                }
            }
        });
        this.findByOrganizationIdPage = (organization_id, page) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this
                    .connection(this.TABLE_NAME)
                    .select()
                    .where({ organization_id })
                    .limit(10)
                    .offset(10 * (page - 1));
                return queryResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Error do banco !");
                }
            }
        });
    }
}
exports.default = MembershipData;
//# sourceMappingURL=MembershipData.js.map