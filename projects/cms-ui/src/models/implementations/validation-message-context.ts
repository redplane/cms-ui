export class ValidationMessageContext {

  //#region Properties

  public controlLabel: string;

  public code: string;

  public message: string;

  public readonly additionalValue: { [key: string]: any; };

  //#endregion

  //#region Constructor

  public constructor(controlLabel: string, code: string, message: string, additionalValue?: { [key: string]: any }) {
    this.controlLabel = controlLabel;
    this.code = code;
    this.message = message;
    this.additionalValue = additionalValue || {};
  }

  //#endregion

}
