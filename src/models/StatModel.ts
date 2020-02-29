import Mongoose, { Schema } from 'mongoose';
import IStat from '../interfaces/IStat';
import _ from 'lodash';
import ECity from '../enums/EState';

const StatIsolationSchema = new Schema({
  total: { type: Number, default: 0, required: true },
  process: { type: Number, default: 0, required: true },
  release: { type: Number, default: 0, required: true },
  death: { type: Number, default: 0, required: true },
});

const StatInspectionSchema = new Schema({
  total: { type: Number, default: 0, required: true },
  process: { type: Number, default: 0, required: true },
  negative: { type: Number, default: 0, required: true },
});

const StatSchema = new Schema({
  timestamp: { type: Date, default: Date.now, required: true },
  state: { type: String, enum: _.filter(ECity, _.isNumber), required: true },
  isolation: { type: StatIsolationSchema, required: true },
  inspection: { type: StatInspectionSchema, required: true },
  increase: { type: Number, default: 0, required: true },
  total: { type: Number, default: 0, required: true },
});

export default Mongoose.model<IStat>('Stats', StatSchema);
