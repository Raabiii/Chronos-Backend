import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAppointment(@Request() req, @Body('title') title: string) {
    return this.appointmentService.createAppointment(req.user.id, title);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getAppointments(@Param('email') email: string) {
    console.log(email);
    // return this.appointmentService.getAppointments(email);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAppointment(
    @Param('id') id: number,
    @Body('title') title: string,
  ) {
    return this.appointmentService.updateAppointment(id, title);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAppointment(@Param('id') id: number) {
    return this.appointmentService.deleteAppointment(id);
  }
}
