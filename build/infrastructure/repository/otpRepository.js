"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
const databaseRepository_1 = require("../../@common/base/databaseRepository");
const jwt_1 = require("../../libs/jwt");
class OtpRepository extends databaseRepository_1.DatabaseRepository {
    constructor(model) {
        super(model);
        this.model = model;
    }
    async upsert(dataToSave) {
        const { code, email } = dataToSave;
        await this.model.updateOne({ email }, { $set: { code: (0, jwt_1.jwtForOtp)(code) } }, { upsert: true });
    }
    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
}
exports.OtpRepository = OtpRepository;
