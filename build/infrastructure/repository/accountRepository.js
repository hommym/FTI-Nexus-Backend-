"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const databaseRepository_1 = require("../../@common/base/databaseRepository");
class AccountRepository extends databaseRepository_1.DatabaseRepository {
    constructor(model) {
        super(model);
        this.model = model;
    }
    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
    async findByUsername(username) {
        return await this.model.findOne({ username });
    }
}
exports.AccountRepository = AccountRepository;
