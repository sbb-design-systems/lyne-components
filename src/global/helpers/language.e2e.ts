import { documentLanguage } from './language-change-handler';
import { newE2EPage } from '@stencil/core/testing';

describe('language', () => {
  it('should detect language of html tag', async () => {
    document.documentElement.setAttribute('lang', 'de');
    expect(documentLanguage()).toEqual('de');
  });

  it('should fallback to English if no lang attribute is present', () => {
    document.documentElement.removeAttribute('lang');
    expect(documentLanguage()).toEqual('en');
  });

  it('should extract language from composed language key', () => {
    document.documentElement.setAttribute('lang', 'fr-ch');
    expect(documentLanguage()).toEqual('fr');
  });

  it('should fallback to English if language is unknown', () => {
    document.documentElement.setAttribute('lang', 'foo');
    expect(documentLanguage()).toEqual('en');
  });

  it('should react to language change', async () => {
    const page = await newE2EPage();
    // Use component which uses language
    await page.setContent('<sbb-button></sbb-button>');
    const changeSpy = await page.spyOnEvent('sbbLanguageChange', 'document');

    await page.evaluate(() => document.documentElement.setAttribute('lang', 'fr'));

    expect(await page.evaluate(() => document.documentElement.lang)).toBe('fr');
    expect(changeSpy).toHaveReceivedEventDetail('fr');
  });

  it('should not react to language change if language was not changed', async () => {
    const page = await newE2EPage();
    // Use component which uses language
    await page.setContent('<sbb-button></sbb-button>');
    await page.evaluate(() => document.documentElement.setAttribute('lang', 'fr'));
    const changeSpy = await page.spyOnEvent('sbbLanguageChange', 'document');

    await page.evaluate(() => document.documentElement.setAttribute('lang', 'fr'));

    expect(changeSpy).not.toHaveReceivedEvent();
  });
});
