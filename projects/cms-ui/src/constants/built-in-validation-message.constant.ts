// Key-value which is used for mapping validation error with its actual display.
export const builtInValidationMessages: {[name: string]: string; } = {
  required: 'MSG_VALIDATION_PROPERTY_REQUIRED',
  min: 'MSG_VALIDATION_PROPERTY_MIN',
  max: 'MSG_VALIDATION_PROPERTY_MAX',
  minlength: 'MSG_VALIDATION_PROPERTY_MIN_LENGTH',
  maxlength: 'MSG_VALIDATION_PROPERTY_MAX_LENGTH',
  pattern: 'MSG_VALIDATION_PROPERTY_PATTERN',
  email: 'MSG_VALIDATION_PROPERTY_EMAIL'
};
