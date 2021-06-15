// Banner data type
export type BANNER_COLOR_PALLET = 'info' | 'danger' | 'success' | 'warn';
export type BANNER_TITLE_KIND = 'default' | 'html' | 'template' | 'unknown';
export type BANNER_MESSAGE_KIND = 'default' | 'html' | 'template' | 'unknown';
export type BANNER_BUTTON_KIND = 'default' | 'html' | 'template' | 'unknown';
export type BANNER_QUERY_MODE = 'dequeue' | 'pop';
export type BANNER_PRESERVE_MODE = 'navigate-start-clear' | 'navigate-end-clear' | 'default';


// Validation summarizer data types.
export type TYPE_VALIDATION_SUMMARIZER_MESSAGE = { [id: string]: string };
