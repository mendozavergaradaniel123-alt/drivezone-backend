import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common';
import { InventoryService, InventoryItem } from './inventory.service.js';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  searchInventory(
    @Query('searchString') searchString?: string,
    @Query('category') category?: string,
    @Query('brand') brand?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: string,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
  ) {
    return this.inventoryService.searchInventory(
      searchString,
      category,
      brand,
      maxPrice ? parseFloat(maxPrice) : undefined,
      sort,
      skip ? parseInt(skip, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @Post()
  addInventory(@Body() item: InventoryItem) {
    return this.inventoryService.addInventory(item);
  }

  @Get('categories')
  getCategories() {
    return this.inventoryService.getCategories();
  }

  @Get('recommendations')
  getRecommendations() {
    return this.inventoryService.getRecommendations();
  }

  @Get(':id')
  getInventoryItem(@Param('id') id: string) {
    return this.inventoryService.getInventoryItem(id);
  }

  @Put(':id')
  updateInventory(@Param('id') id: string, @Body() item: InventoryItem) {
    return this.inventoryService.updateInventory(id, item);
  }

  @Delete(':id')
  deleteInventory(@Param('id') id: string) {
    return this.inventoryService.deleteInventory(id);
  }
}