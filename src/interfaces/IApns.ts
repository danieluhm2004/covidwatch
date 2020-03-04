import { Document } from 'mongoose';

interface IApns extends Document {
  enabled: boolean;
  uuid: string;
  token: string;
  sendAt: Date;
  updateAt: Date;
  createAt: Date;
}

export default IApns;
