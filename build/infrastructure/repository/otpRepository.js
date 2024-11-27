"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
const databaseRepository_1 = require("../../@common/base/databaseRepository");
class OtpRepository extends databaseRepository_1.DatabaseRepository {
    constructor(model) {
        super(model);
        this.model = model;
    }
    async upsert(dataToSave) {
        const { code, email } = dataToSave;
        await this.model.updateOne({ email }, { $set: { code } }, { upsert: true });
    }
    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
}
exports.OtpRepository = OtpRepository;
