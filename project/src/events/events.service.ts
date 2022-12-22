import { userDetails, UserDocument, Users } from '@acute-project/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';

@Injectable()
export class EventService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(data: userDetails) {
    return this.userModel.create(data);
  }

  async findUserByIdAndUpdate(id: Schema.Types.ObjectId, data: userDetails) {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  async findUserById(id: Schema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  async deleteUserAccount(id: string) {
    return this.userModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}
