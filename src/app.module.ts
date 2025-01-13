import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }), // Load environment variables
    DatabaseModule, // Supabase setup module
    AuthModule, // Authentication module
    AppointmentModule,
    UsersModule,
    AppModule, // Appointment module
    // AppointmentGateway, // Appointment gateway
  ],
})
export class AppModule {}
