import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedDependencyException extends HttpException {
  constructor(message = 'Failed to create resource') {
    super(message, HttpStatus.FAILED_DEPENDENCY);
  }
}
