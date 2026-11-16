import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupportService, Message } from './support.service.js';

@Controller('support/messages')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get()
  getSupportMessages() {
    return this.supportService.getSupportMessages();
  }

  @Post()
  sendSupportMessage(@Body() message: Message) {
    return this.supportService.sendSupportMessage(message);
  }
}
