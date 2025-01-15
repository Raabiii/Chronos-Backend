import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { DatabaseModule } from '../database/database.module';
import { AppointmentGateway } from './appointment.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [AppointmentService, AppointmentGateway],
})
export class AppointmentModule {}
