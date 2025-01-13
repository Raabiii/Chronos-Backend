import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InvalidEmailException } from 'src/exception/InvalidEmail.exception';
import { InvalidPasswordException } from 'src/exception/InvalidPassword.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('Users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw new InvalidEmailException();
    }

    if (password !== data.password) {
      throw new InvalidPasswordException();
    }

    // if (!(await bcrypt.compare(password, data.password))) {
    //   return new InvalidPasswordException();
    // }

    if (password) return { id: data.id, email: data.email };
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(email: string, password: string): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const { data, error } = await this.supabase
      .from('User')
      .insert([{ email, salt, password: hashedPassword }]);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
