import { isServer } from 'lit';

/**
 * @deprecated use :dir() selector instead
 */
export const getDocumentWritingMode = (): string =>
  (!isServer && document.documentElement.getAttribute('dir')) || 'ltr';
