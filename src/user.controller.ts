import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Controller('users')
export class UsersController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async getUsers() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('Users')
      .select('*, Appointments(*)');

    if (error) {
      throw new Error(error.message);
    }

    console.log(data[0].id);

    return data;
  }
}
