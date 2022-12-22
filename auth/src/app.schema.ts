import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { hashPassword } from '@acute-project/common';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, min: 4, max: 10 })
  firstName: string;

  @Prop({ required: true, min: 1, max: 10 })
  lastName: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPwd = await hashPassword(this.password);
      this.password = hashedPwd;
    }
    return next();
  } catch (err) {
    return;
  }
});
