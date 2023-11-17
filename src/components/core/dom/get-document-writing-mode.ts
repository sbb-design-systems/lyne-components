import { isBrowser } from './platform';

export const getDocumentWritingMode = (): string =>
  (isBrowser() && document.documentElement.getAttribute('dir')) || 'ltr';
