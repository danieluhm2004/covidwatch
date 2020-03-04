import Mongoose, { Schema } from 'mongoose';
import IStat from '../interfaces/IStat';
import _ from 'lodash';
import ECity from '../enums/EState';

const StatSchema = new Schema({
  state: { type: Number, enum: _.filter(ECity, _.isNumber), required: true },
  increase: { type: Number, default: 0, required: true },
  confirmator: { type: Number, default: 0, required: true },
  death: { type: Number, default: 0, required: true },
  incidence: { type: Number, default: 0, required: true },
  inspection: { type: Number, default: 0, required: true },
  updateAt: { type: Date, default: Date.now, required: true },
});

export default Mongoose.model<IStat>('Stats', StatSchema);
