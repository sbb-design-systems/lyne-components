import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.ts';

import { SbbActionGroupElement } from './action-group.component.ts';

import '../action-group.ts';
import '../button.ts';
import '../link.ts';

describe(`sbb-action-group`, () => {
  let element: SbbActionGroupElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-action-group>
        <sbb-secondary-button>Button</sbb-secondary-button>
        <sbb-block-link
          icon-name="chevron-small-left-small"
          href="https://github.com/sbb-design-systems/lyne-components"
        >
          Link
        </sbb-block-link>
      </sbb-action-group>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbActionGroupElement);
  });
});
