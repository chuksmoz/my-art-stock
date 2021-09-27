export class CustomServiceException extends Error {
  private _code: number;
  constructor(message: string, code: number) {
    super(message);
    this._code = code;
  }

  get Code() {
    return this._code;
  }
}
