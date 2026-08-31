import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';

import { SbbAutocompleteButtonElement } from './autocomplete-button.component.ts';

import '../../autocomplete.ts';

describe(`sbb-autocomplete-button`, () => {
  let element: SbbAutocompleteButtonElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-autocomplete-button>Button</sbb-autocomplete-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbAutocompleteButtonElement);
    expect(element.id).not.to.be.null;
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      const clickSpy = new EventSpy('click');

      element.click();
      await clickSpy.calledOnce();
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      const clickSpy = new EventSpy('click');
      element.setAttribute('disabled', 'true');
      await waitForLitRender(element);

      element.click();
      expect(clickSpy.count).to.be.equal(0);
    });
  });
});
