import { Document } from 'mongoose';
import EState from '../enums/EState';

interface IStat extends Document {
  state: EState;
  increase: number;
  confirmator: number;
  death: number;
  incidence: number;
  inspection: number;
  updateAt: Date;
}

export default IStat;
