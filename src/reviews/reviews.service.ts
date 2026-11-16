import { Injectable } from '@nestjs/common';

export class Review {
  productId?: string;
  user?: string;
  rating: number;
  comment?: string;
}

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [
    {
      productId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      user: 'Daniel Mendoza',
      rating: 5,
      comment: 'Excelente aceite, muy recomendado para motor 2.0L.',
    },
  ];

  getReviews(productId: string) {
    const result = this.reviews.filter((r) => r.productId === productId);
    return {
      data: result,
      message: 'Reseñas obtenidas exitosamente',
      status: 200,
    };
  }

  addReview(productId: string, review: Review) {
    const newReview = { ...review, productId };
    this.reviews.push(newReview);
    return {
      data: newReview,
      message: 'Reseña agregada exitosamente',
      status: 201,
    };
  }
}