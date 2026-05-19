import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../button.ts';
import { fixture } from '../core/testing/private.ts';
import type { SbbBlockLinkElement } from '../link.ts';

import { SbbActionGroupElement } from './action-group.component.ts';

import '../action-group.ts';
import '../button.ts';
import '../link.ts';

describe(`sbb-action-group`, () => {
  let element: SbbActionGroupElement;
  let button: SbbSecondaryButtonElement;
  let link: SbbBlockLinkElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-action-group>
        <sbb-secondary-button size="l">Button</sbb-secondary-button>
        <sbb-block-link
          icon-name="chevron-small-left-small"
          icon-placement="start"
          href="https://github.com/sbb-design-systems/lyne-components"
          size="xs"
        >
          Link
        </sbb-block-link>
      </sbb-action-group>
    `);

    button = element.querySelector<SbbSecondaryButtonElement>('sbb-secondary-button')!;
    link = element.querySelector<SbbBlockLinkElement>('sbb-block-link')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbActionGroupElement);
  });

  describe('property sync', () => {
    it('should respect default sizes', async () => {
      expect(button.size).to.equal('l');
      expect(link.size).to.equal('xs');
    });
  });
});
