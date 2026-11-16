import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  register() {
    return {
      data: { name: 'Cliente DriveZone', email: 'drivezone@gmail.com' },
      message: 'Cuenta creada exitosamente (Vista de Demostración)',
      status: 201,
    };
  }

  @Post('login')
  login() {
    return {
      data: {
        token: 'jwt-mock-token-drivezone-2026',
        userId: 'u1234567-89ab-cdef-0123-456789abcdef',
      },
      message: 'Inicio de sesión exitoso (Vista de Demostración)',
      status: 200,
    };
  }

  @Get('logout')
  logout() {
    return {
      data: null,
      message: 'Sesión cerrada exitosamente (Vista de Demostración)',
      status: 200,
    };
  }
}
