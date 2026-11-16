import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'inventory' })
export class Product {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Object, required: true })
  manufacturer: {
    name: string;
    homePage?: string;
    phone?: string;
  };

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ type: [String], default: [] })
  features?: string[];

  @Prop()
  category?: string;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ default: 5 })
  rating?: number;

  @Prop()
  seller?: string;

  @Prop()
  compatibility?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);