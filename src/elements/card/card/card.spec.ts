import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCardElement } from './card.component.ts';

import '../card-badge.ts';

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

    expect(element).to.match(':state(slotted-badge)');

    expect(
      getComputedStyle(
        element.shadowRoot!.querySelector<HTMLSpanElement>('.sbb-card__badge-wrapper')!,
      ).getPropertyValue('display'),
    ).not.to.be.equal('none');
  });

  it('should render without sbb-card-badge', async () => {
    element = await fixture(
      html` <sbb-card>
        <h2>Title</h2>
        Content text
      </sbb-card>`,
    );

    expect(
      getComputedStyle(
        element.shadowRoot!.querySelector<HTMLSpanElement>('.sbb-card__badge-wrapper')!,
      ).getPropertyValue('display'),
    ).to.be.equal('none');
    expect(element).not.to.match(':state(slotted-badge)');
  });
});
