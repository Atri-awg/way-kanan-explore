export class ApiResponse<T> {
  success: boolean = true;

  message: string = '';

  metadata: object = {};

  data?: T;
}
