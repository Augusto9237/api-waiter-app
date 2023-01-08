import { model, Schema } from 'mongoose';

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  office: {
    type: String,
    enum: ['MANANGER', 'KITCHEN_ASSISTANT', 'CLERK'],
    default: 'CLERK',
  },
}));
