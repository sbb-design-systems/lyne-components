import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbCheckboxElement } from './checkbox.js';

describe(`sbb-checkbox with ${fixture.name}`, () => {
  describe('general', () => {
    let element: SbbCheckboxElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-checkbox name="name" value="value">Label</sbb-checkbox>`, {
        modules: ['./checkbox.ts'],
      });
    });

    it('should render', async () => {
      assert.instanceOf(element, SbbCheckboxElement);
    });
  });
});
