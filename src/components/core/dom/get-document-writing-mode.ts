import { isBrowser } from './platform.js';

export const getDocumentWritingMode = (): string =>
  (isBrowser() && document.documentElement.getAttribute('dir')) || 'ltr';
