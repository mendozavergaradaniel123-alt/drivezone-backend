import { Injectable } from '@nestjs/common';

export class User {
  name: string;
  email: string;
  password?: string;
}

export class Login {
  email: string;
  password?: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      name: 'Cliente DriveZone',
      email: 'drivezone@gmail.com',
      password: '12345password',
    },
  ];

  register(user: User) {
    const exists = this.users.find((u) => u.email === user.email);
    if (exists) {
      return { data: null, message: 'El correo ya está registrado', status: 409 };
    }
    this.users.push(user);
    return {
      data: { name: user.name, email: user.email },
      message: 'Cuenta creada exitosamente',
      status: 201,
    };
  }

  login(credentials: Login) {
    const user = this.users.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    );
    if (!user) {
      return { data: null, message: 'Credenciales inválidas', status: 401 };
    }
    return {
      data: {
        token: 'jwt-mock-token-drivezone-2026',
        userId: 'u1234567-89ab-cdef-0123-456789abcdef',
      },
      message: 'Inicio de sesión exitoso',
      status: 200,
    };
  }

  logout() {
    return {
      data: null,
      message: 'Sesión cerrada exitosamente',
      status: 200,
    };
  }
}