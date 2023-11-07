import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbCard } from './card';
import '../card-badge';

describe('sbb-card', () => {
  let element: SbbCard;

  it('renders', async () => {
    element = await fixture(html`<sbb-card size="l" color="transparent-bordered"></sbb-card>`);
    assert.instanceOf(element, SbbCard);
  });

  it('should render with sbb-card-badge', async () => {
    element = await fixture(html`
      <sbb-card size="xl">
        <h2>Title</h2>
        Content text
        <sbb-card-badge>
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
      </sbb-card>
    `);

    expect(
      getComputedStyle(
        element.shadowRoot.querySelector('.sbb-card__badge-wrapper'),
      ).getPropertyValue('display'),
    ).not.to.be.equal('none');
    expect(element).to.have.attribute('data-has-card-badge');
    expect(element).dom.to.be.equal(`
      <sbb-card color="white" data-has-card-badge size="xl">
        <h2>Title</h2>
        Content text
        <sbb-card-badge color="charcoal" dir="ltr" role="text" slot="badge">
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
      </sbb-card>
    `);
    expect(element).shadowDom.to.be.equal(`
      <span class="sbb-card">
        <slot name="action"></slot>
        <span class="sbb-card__wrapper">
          <slot></slot>
        </span>
        <span class="sbb-card__badge-wrapper">
          <slot name="badge"></slot>
        </span>
      </span>
    `);
  });

  it('should render without sbb-card-badge', async () => {
    element = await fixture(
      html` <sbb-card size="xl">
        <h2>Title</h2>
        Content text
      </sbb-card>`,
    );

    expect(
      getComputedStyle(
        element.shadowRoot.querySelector('.sbb-card__badge-wrapper'),
      ).getPropertyValue('display'),
    ).to.be.equal('none');
    expect(element).not.to.have.attribute('data-has-card-badge');
  });
});
