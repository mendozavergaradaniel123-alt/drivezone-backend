import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService, Review } from './reviews.service.js';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':productId')
  getReviews(@Param('productId') productId: string) {
    return this.reviewsService.getReviews(productId);
  }

  @Post(':productId')
  addReview(@Param('productId') productId: string, @Body() review: Review) {
    return this.reviewsService.addReview(productId, review);
  }
}