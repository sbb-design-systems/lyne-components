import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../core/testing/private.ts';
import { waitForLitRender } from '../core/testing.ts';

import { SbbJourneyHeaderElement } from './journey-header.component.ts';

import '../journey-header.ts';

describe(`sbb-journey-header`, () => {
  let element: SbbJourneyHeaderElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    element = await fixture(html`<sbb-journey-header></sbb-journey-header>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbJourneyHeaderElement);
  });

  describe('aria label', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-journey-header origin="Bern" destination="Zurich"></sbb-journey-header>`,
      );
    });

    it('should set aria label with origin and destination', () => {
      expect(elementInternals.get(element)?.ariaLabel).to.include('Bern');
      expect(elementInternals.get(element)?.ariaLabel).to.include('Zurich');
    });

    it('should not include round-trip text when roundTrip is false', async () => {
      // Round-trip suffix (e.g. "and back to") should not be present
      expect(elementInternals.get(element)?.ariaLabel).not.to.include('back to');
    });

    it('should update aria label when origin changes', async () => {
      element.origin = 'Basel';

      expect(elementInternals.get(element)?.ariaLabel).to.include('Basel');
      expect(elementInternals.get(element)?.ariaLabel).not.to.include('Bern');
    });

    it('should update aria label when destination changes', async () => {
      element.destination = 'Luzern';

      expect(elementInternals.get(element)?.ariaLabel).to.include('Luzern');
      expect(elementInternals.get(element)?.ariaLabel).not.to.include('Zurich');
    });

    it('should include round-trip text when roundTrip is true', async () => {
      element.roundTrip = true;

      expect(elementInternals.get(element)?.ariaLabel).to.include('Bern');
      expect(elementInternals.get(element)?.ariaLabel).to.include('Zurich');
      expect(elementInternals.get(element)?.ariaLabel).to.include('back to');
    });

    it('should update aria label on language change to German', async () => {
      const originalLang = document.documentElement.lang;
      document.documentElement.lang = 'de';
      await waitForLitRender(element);

      expect(elementInternals.get(element)?.ariaLabel).to.equal('Verbindung von Bern nach Zurich ');

      document.documentElement.lang = originalLang;
    });
  });
});
