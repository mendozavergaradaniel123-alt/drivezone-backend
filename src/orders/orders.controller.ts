import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService, Order, Payment } from './orders.service.js';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('orders')
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Post('orders')
  createOrder(@Body() order: Order) {
    return this.ordersService.createOrder(order);
  }

  @Get('orders/:id')
  trackOrder(@Param('id') id: string) {
    return this.ordersService.trackOrder(id);
  }

  @Post('payments')
  processPayment(@Body() payment: Payment) {
    return this.ordersService.processPayment(payment);
  }
}