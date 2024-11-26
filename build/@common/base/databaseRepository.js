"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRepository = void 0;
const connectToDatabase_1 = require("../../infrastructure/database/connectToDatabase");
// this is the base class all Database Repositories should inherit from.
class DatabaseRepository {
    constructor(dataBaseModel) {
        this.model = dataBaseModel;
    }
    async create(dataToSave) {
        await this.model.create(dataToSave);
    }
    async getAll() {
        return await this.model.find({});
    }
    async getOne(id) {
        return await this.model.findOne({ _id: typeof id === "string" ? (0, connectToDatabase_1.tObjectId)(id) : id });
    }
    async update(id, newData) {
        const updatedData = await this.model.findByIdAndUpdate(id, { $set: { newData } });
        if (updatedData)
            return true;
        return false;
    }
    async delete(id) {
        const deletedData = await this.model.findOneAndDelete({ _id: typeof id === "string" ? (0, connectToDatabase_1.tObjectId)(id) : id });
        if (deletedData)
            return true;
        return false;
    }
}
exports.DatabaseRepository = DatabaseRepository;
