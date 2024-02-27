export class Result {
  private data: any;
  private code: number;
  private message: string;
  private success: boolean;
  private path: string;
  constructor(data = null, code = 200, message = null, success = true) {
    this.data = data;
    this.code = code;
    this.message = message;
    this.success = success;
  }
}
