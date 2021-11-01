const getDocumentLang = (): string => document.querySelector('html').getAttribute('lang') || 'en';

export default getDocumentLang;
