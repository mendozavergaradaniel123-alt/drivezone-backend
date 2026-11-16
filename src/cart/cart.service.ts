import { Injectable } from '@nestjs/common';

export class CartItem {
  productId: string;
  quantity: number;
}

@Injectable()
export class CartService {
  private cartItems: CartItem[] = [
    {
      productId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      quantity: 1,
    },
  ];

  getCart() {
    const total = this.cartItems.length * 189900;
    return {
      data: {
        items: this.cartItems,
        total,
      },
      message: 'Carrito consultado exitosamente',
      status: 200,
    };
  }

  addToCart(item: CartItem) {
    const existing = this.cartItems.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    return this.getCart();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter((i) => i.productId !== productId);
    return {
      data: null,
      message: 'Producto eliminado del carrito',
      status: 200,
    };
  }
}