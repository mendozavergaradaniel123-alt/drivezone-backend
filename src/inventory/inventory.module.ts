import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryService } from './inventory.service.js';
import { InventoryController } from './inventory.controller.js';
import { Product, ProductSchema } from './schemas/product.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}