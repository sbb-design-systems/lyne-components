import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCheckboxElement } from './checkbox.component.ts';

describe(`sbb-checkbox`, () => {
  describe('general', () => {
    let element: SbbCheckboxElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-checkbox name="name" value="value">Label</sbb-checkbox>`);
    });

    it('should render', async () => {
      assert.instanceOf(element, SbbCheckboxElement);
    });
  });

  // All the functionalities of sbb-checkbox are tested in checkbox-common.spec.ts file
});
