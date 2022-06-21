const getDocumentWritingMode = (): string =>
  document.querySelector('html').getAttribute('dir') || 'ltr';

export default getDocumentWritingMode;
