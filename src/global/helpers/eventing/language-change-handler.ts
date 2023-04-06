import { AgnosticMutationObserver as MutationObserver } from '../mutation-observer';
import { HandlerAspect } from './handler-repository';

export const sbbLanguageChangeEventName = 'sbbLanguageChange';
export type SbbLanguageChangeEvent = CustomEvent<string>;
export interface SbbLanguageChangeCallback {
  (language: string): void;
}

declare global {
  interface DocumentEventMap {
    [sbbLanguageChangeEventName]: SbbLanguageChangeEvent;
  }
}

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

class LanguageChangeObserver {
  private _signals = new Set<AbortSignal>();
  private _observer = new MutationObserver((records) => {
    if (records[0].oldValue === documentLanguage()) {
      return;
    }

    const currentLanguage = documentLanguage();
    const languageChange = new CustomEvent(sbbLanguageChangeEventName, {
      detail: currentLanguage,
    });
    document.dispatchEvent(languageChange);
  });

  public register(signal: AbortSignal): void {
    if (!this._signals.size) {
      this._observe();
    }

    this._signals.add(signal);
    signal.addEventListener('abort', () => {
      if (this._signals.delete(signal) && !this._signals.size) {
        this._observer.disconnect();
      }
    });
  }

  private _observe(): void {
    // Globally register the mutation observer
    this._observer.observe(document.documentElement, {
      attributeFilter: ['lang'],
      attributeOldValue: true,
    });
  }
}

const languageChangeObserver = new LanguageChangeObserver();

export function languageChangeHandlerAspect(action: SbbLanguageChangeCallback): HandlerAspect {
  return ({ signal }) => {
    languageChangeObserver.register(signal);
    document.addEventListener(sbbLanguageChangeEventName, (e) => action(e.detail), {
      signal,
      passive: true,
    });
  };
}
