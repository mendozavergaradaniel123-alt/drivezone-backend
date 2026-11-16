import { Injectable } from '@nestjs/common';

export class Order {
  id?: string;
  products: { productId: string; quantity: number }[];
  total: number;
  paymentMethod: 'card' | 'PSE' | 'Nequi' | 'Daviplata';
  status?: string;
  shippingAddress?: string;
  trackingNumber?: string;
}

export class Payment {
  orderId: string;
  method: 'card' | 'PSE' | 'Nequi' | 'Daviplata';
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    {
      id: 'o1001-uuid-fake',
      products: [{ productId: 'd290f1ee-6c54-4b01-90e6-d701748f0851', quantity: 1 }],
      total: 189900,
      paymentMethod: 'Nequi',
      status: 'shipped',
      shippingAddress: 'Calle 18 # 118-250, Cali',
      trackingNumber: 'TRK-987654',
    },
  ];

  getOrders() {
    return {
      data: this.orders,
      message: 'Historial de compras obtenido',
      status: 200,
    };
  }

  createOrder(order: Order) {
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      status: 'pending',
      trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)}`,
    };
    this.orders.push(newOrder);
    return {
      data: newOrder,
      message: 'Orden creada exitosamente',
      status: 201,
    };
  }

  trackOrder(id: string) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      return { data: null, message: 'Orden no encontrada', status: 404 };
    }
    return { data: order, message: 'Información del pedido', status: 200 };
  }

  processPayment(payment: Payment) {
    const order = this.orders.find((o) => o.id === payment.orderId);
    if (order) {
      order.status = 'paid';
    }
    return {
      data: { paymentId: `pay-${Date.now()}`, status: 'success' },
      message: 'Pago procesado exitosamente',
      status: 200,
    };
  }
}
