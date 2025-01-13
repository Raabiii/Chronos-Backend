import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEmailException extends HttpException {
  constructor() {
    super('Invalid email address provided', HttpStatus.BAD_REQUEST);
  }
}
