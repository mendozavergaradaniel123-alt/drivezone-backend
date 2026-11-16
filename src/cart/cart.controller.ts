import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService, CartItem } from './cart.service.js';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Post()
  addToCart(@Body() item: CartItem) {
    return this.cartService.addToCart(item);
  }

  @Delete(':productId')
  removeFromCart(@Param('productId') productId: string) {
    return this.cartService.removeFromCart(productId);
  }
}