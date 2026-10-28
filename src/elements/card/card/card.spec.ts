import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCardElement } from './card.component.ts';

import '../../card.ts';

describe(`sbb-card`, () => {
  let element: SbbCardElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-card color="transparent-bordered"></sbb-card>`);
    assert.instanceOf(element, SbbCardElement);
  });

  it('should render with sbb-card-badge', async () => {
    element = await fixture(html`
      <sbb-card>
        <h2>Title</h2>
        Content text
        <sbb-card-badge>
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
      </sbb-card>
    `);

    expect(element).to.match(':state(has-badge)');
  });

  it('should render without sbb-card-badge', async () => {
    element = await fixture(
      html`<sbb-card>
        <h2>Title</h2>
        Content text
      </sbb-card>`,
    );

    expect(element).not.to.match(':state(has-badge)');
  });
});
