import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing/wait-for-render.ts';

import { SbbMiniButtonGroupElement } from './mini-button-group.component.ts';
import '../mini-button.ts';
import '../../divider/divider.component.ts';

describe('sbb-mini-button-group', () => {
  let element: SbbMiniButtonGroupElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-mini-button-group>
        <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
        <sbb-divider orientation="vertical"></sbb-divider>
        <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
      </sbb-mini-button-group>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbMiniButtonGroupElement);
  });

  it('proxy negative to children', async () => {
    element.negative = true;
    await waitForLitRender(element);

    Array.from(element.children).forEach((el) => expect(el).to.have.attribute('negative'));
  });
});
