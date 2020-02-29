import { Document } from 'mongoose';
import EState from '../enums/EState';
import IStatIsolation from './IStatIsolation';
import IStatInspection from './IStatInspection';

interface IStat extends Document {
  timestamp: Date;
  state: EState;
  isolation: IStatIsolation;
  inspection: IStatInspection;
  increase: number;
  total: number;
}

export default IStat;
