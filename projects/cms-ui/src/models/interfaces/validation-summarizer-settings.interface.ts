export interface IValidationSummarizerSettings {

  //#region Properties

  // Messages which is used for validation.
  messages?: { [key: string]: any };

  // Whether to fallback to built in validation message or not.
  builtInMessageFallback?: boolean;

  //#endregion

}
