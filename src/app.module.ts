import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { InventoryModule } from './inventory/inventory.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CartModule } from './cart/cart.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { SupportModule } from './support/support.module.js';
import { FavoritesModule } from './favorites/favorites.module.js';
import { PaymentsModule } from './payments/payments.module.js';

@Module({
  imports: [InventoryModule, AuthModule, CartModule, OrdersModule, ReviewsModule, SupportModule, FavoritesModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
