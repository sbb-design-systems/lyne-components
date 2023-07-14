export const getDocumentWritingMode = (): string =>
  document.querySelector('html').getAttribute('dir') || 'ltr';
