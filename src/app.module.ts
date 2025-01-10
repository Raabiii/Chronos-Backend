import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { UsersController } from './user.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
