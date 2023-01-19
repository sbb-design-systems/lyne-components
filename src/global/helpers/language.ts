import { AgnosticMutationObserver as MutationObserver } from './mutation-observer';

export type SbbLanguageChangeEvent = CustomEvent<string>;

/**
 * Extracts `lang` attribute from `<html>` tag. If language is not supported, fall back to English.
 * If lang attribute contains the country, it will be stripped away.
 */
export const documentLanguage = (): string => {
  const fallbackLanguage = 'en';
  const langAttribute = document.documentElement.getAttribute('lang') || fallbackLanguage;

  // Support e.g. cases like `de-ch`.
  const langAttributeNormalized = langAttribute.split('-')[0];

  if (!['en', 'de', 'fr', 'it'].includes(langAttributeNormalized)) {
    return fallbackLanguage;
  }
  return langAttributeNormalized;
};

const mutationObserver = new MutationObserver((records) => {
  if (records[0].oldValue === documentLanguage()) {
    return;
  }

  const languageChange = new CustomEvent('sbbLanguageChange', {
    detail: documentLanguage(),
  });
  document.dispatchEvent(languageChange);
});

// Globally register the mutation observer
mutationObserver.observe(document.documentElement, {
  attributeFilter: ['lang'],
  attributeOldValue: true,
});
