import { Model } from "mongoose";
import { DatabaseRepository } from "../../@common/base/databaseRepository";
import { Otp } from "../../domain/auth/otp";

export class OtpRepository extends DatabaseRepository<Otp> {
  protected model: Model<Otp>;
  constructor(model: Model<Otp>) {
    super(model);
    this.model = model;
  }

  async upsert(dataToSave: Otp) {
    const { code, email } = dataToSave;
    await this.model.updateOne({ email }, { $set: { code } }, { upsert: true });
  }

  async findByEmail(email: string): Promise<Otp | null> {
    return await this.model.findOne({ email });
  }
}
