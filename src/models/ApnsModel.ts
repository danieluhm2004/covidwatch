import Mongoose, { Schema } from 'mongoose';
import IApns from '../interfaces/IApns';

const ApnsSchema = new Schema({
  enabled: { type: Boolean, default: false, required: true },
  uuid: { type: String, required: true },
  token: { type: String, required: true },
  sendAt: { type: Date, default: Date.now, required: true },
  updateAt: { type: Date, default: Date.now, required: true },
  createAt: { type: Date, default: Date.now, required: true },
});

export default Mongoose.model<IApns>('Apns', ApnsSchema);
