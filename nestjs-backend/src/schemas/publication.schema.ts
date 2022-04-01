import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublicationDocument = Publication & Document;

@Schema()
export class Publication {
  
  @Prop()
  title: string;

  @Prop()
  description: string;

}

export const PublicationSchema = SchemaFactory.createForClass(Publication);