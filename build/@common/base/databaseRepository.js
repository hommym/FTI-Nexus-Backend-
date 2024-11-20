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
exports.DatabaseRepository = void 0;
const connectToDatabase_1 = require("../../infrastructure/database/connectToDatabase");
// this is the base class all Database Repositories should inherit from.
class DatabaseRepository {
    constructor(dataBaseModel) {
        this.model = dataBaseModel;
    }
    create(dataToSave) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.create(dataToSave);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({});
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ _id: typeof id === "string" ? (0, connectToDatabase_1.tObjectId)(id) : id });
        });
    }
    update(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedData = yield this.model.findByIdAndUpdate(id, { $set: { newData } });
            if (updatedData)
                return true;
            return false;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedData = yield this.model.findOneAndDelete({ _id: typeof id === "string" ? (0, connectToDatabase_1.tObjectId)(id) : id });
            if (deletedData)
                return true;
            return false;
        });
    }
}
exports.DatabaseRepository = DatabaseRepository;
