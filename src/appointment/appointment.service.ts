import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase) {}

  async createAppointment(userId: number, title: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('Appointment')
      .insert([{ title, UserID: userId }]);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getAppointments(email: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('Users')
      .select('Appointments(*)')
      .eq('email', email);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async updateAppointment(id: number, title: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('Appointment')
      .update({ title })
      .eq('ID', id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async deleteAppointment(id: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('Appointment')
      .delete()
      .eq('ID', id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getUserId(email: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('User')
      .select('ID')
      .eq('email', email);

    if (error) {
      throw new Error(error.message);
    }
    return data[0].ID;
  }
}
