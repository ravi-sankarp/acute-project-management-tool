import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as mongooseSchema } from 'mongoose';
import { UserDocument, Users } from './app.schema';
import { IUser } from './types/interfaces';

@Injectable()
export class AppService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(data: IUser) {
    return this.userModel.create(data);
  }

  async getUserDetailsByEmail(email: string) {
    return this.userModel.findOne({ email, isDeleted: false }).select('+password');
  }

  async checkPhoneNumberExists(phoneNumber: string) {
    return this.userModel.findOne({ phoneNumber, isDeleted: false });
  }

  async getUserDetailsById(id: string) {
    return this.userModel.findOne({ id, isDeleted: false });
  }

  async updateUserDetails(id: string, data: IUser) {
    return this.userModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true
    });
  }

  async updateUserPassword(id: mongooseSchema.Types.ObjectId, pwd: string) {
    return this.userModel.findByIdAndUpdate(id, { password: pwd });
  }

  async deleteUserAccount(id: mongooseSchema.Types.ObjectId) {
    return this.userModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}
