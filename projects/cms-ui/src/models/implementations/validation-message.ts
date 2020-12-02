export class ValidationMessage {

  //#region Methods

  // Property name which is validated.
  public key: string;

  // Validation content.
  public content: string;

  // Additional value that can be used in validation.
  public readonly additionalValue: { [key: string]: any};

  //#endregion

  //#region Constructor

  public constructor(key: string, content: string) {
    this.key = key;
    this.content = content;
    this.additionalValue = {};
  }

  //#endregion
}
