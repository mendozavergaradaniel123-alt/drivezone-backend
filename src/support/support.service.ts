import { Injectable } from '@nestjs/common';

export class Message {
  user?: string;
  message: string;
  date?: string;
}

@Injectable()
export class SupportService {
  private messages: Message[] = [
    {
      user: 'Daniel Mendoza',
      message: '¿Tienen cobertura de envío a Cali?',
      date: new Date().toISOString(),
    },
  ];

  getSupportMessages() {
    return {
      data: this.messages,
      message: 'Mensajes de soporte consultados',
      status: 200,
    };
  }

  sendSupportMessage(msg: Message) {
    const newMessage = { ...msg, date: new Date().toISOString() };
    this.messages.push(newMessage);
    return {
      data: newMessage,
      message: 'Mensaje enviado a soporte técnico',
      status: 201,
    };
  }
}
