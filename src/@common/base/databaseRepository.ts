import mongoose, { Model, Types } from "mongoose";
import { tObjectId } from "../../infrastructure/database/connectToDatabase";

// this is the base class all Database Repositories should inherit from.
export class DatabaseRepository<T> {
  protected model: Model<T>;
  constructor(dataBaseModel: Model<T>) {
    this.model = dataBaseModel;
  }

  async create(dataToSave: T) {
    await this.model.create(dataToSave);
  }

  async getAll(): Promise<T[]> {
    return await this.model.find({});
  }

  async getOne(id: string | Types.ObjectId): Promise<T | null> {
    return await this.model.findOne({ _id: typeof id === "string" ? tObjectId(id) : id });
  }

  async update(id: string, newData: T): Promise<boolean> {
    const updatedData = await this.model.findByIdAndUpdate(id, { $set: { newData } });
    if (updatedData) return true;
    return false;
  }

  async delete(id: string | Types.ObjectId): Promise<boolean> {
    const deletedData = await this.model.findOneAndDelete({ _id: typeof id === "string" ? tObjectId(id) : id });

    if (deletedData) return true;
    return false;
  }
}
