import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCheckboxPanelElement } from './checkbox-panel.component.ts';

describe(`sbb-checkbox-panel`, () => {
  describe('general', () => {
    let element: SbbCheckboxPanelElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-checkbox-panel name="name" value="value">Label</sbb-checkbox-panel>`,
      );
    });

    it('should render', async () => {
      assert.instanceOf(element, SbbCheckboxPanelElement);
    });
  });

  // All the functionalities of sbb-checkbox-panel are tested in checkbox-common.e2e.ts file
});
