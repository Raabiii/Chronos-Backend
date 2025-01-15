import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppointmentService } from './appointment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway(3001, { namespace: 'appointment', cors: { origin: '*' } })
export class AppointmentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly appointmentService: AppointmentService) {}

  handleConnection(client: Socket) {
    console.log(
      'Client connected:',
      client.handshake.headers?.authorization?.split(' ')[1],
    );
    const token = client.handshake.headers?.authorization?.split(' ')[1];

    if (!token) {
      console.log('No token provided');
      client.emit('error', 'No token provided');
      client.disconnect();
      return;
    }

    try {
      const configService = new ConfigService();
      const secret = configService.get<string>('JWT_SECRET');
      const decoded = jwt.verify(token, secret);

      // console.log('JWT Decoded:', decoded);
    } catch (error) {
      console.log('Invalid token');
      client.emit('error', 'Invalid token');
      client.disconnect();
      return;
    }
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyAll(message: string) {
    this.server.emit('appointmentUpdate', message);
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('list')
  async getAppointments(client: Socket, payload: any) {
    return await this.appointmentService.getAppointments(
      Array.isArray(client.handshake.headers['email'])
        ? client.handshake.headers['email'][0]
        : client.handshake.headers['email'],
    );
  }
}
