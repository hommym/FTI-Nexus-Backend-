import { DatabaseRepository } from "../../@common/base/databaseRepository";
import { Account } from "../../domain/auth/userAccount";
import { AccountDb } from "../database/schemas/userAccountSchema";
import mongoose, { Model, Types } from "mongoose";

export class AccountRepository extends DatabaseRepository<Account> {
  protected model: Model<Account>;
  constructor(model: Model<Account>) {
    super(model);
    this.model = model;
  }

  async findByEmail(email: string): Promise<Account | null> {
    return await this.model.findOne({ email });
  }

  async findByUsername(username: string): Promise<Account | null> {
    return await this.model.findOne({ username });
  }
}
