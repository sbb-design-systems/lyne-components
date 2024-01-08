import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import './journey-header';

describe('sbb-journey-header', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-journey-header origin="A" destination="B"></sbb-journey-header>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-journey-header origin="A" destination="B" size="m">
      </sbb-journey-header>
    `);
    expect(root).shadowDom.to.be.equal(`
      <sbb-title role="heading" level="3" visual-level="5" aria-level="3">
        <span class="sbb-journey-header" dir="ltr">
          <span class="sbb-journey-header__origin">
            <span class="sbb-journey-header__connection--visually-hidden">
              Connection from
            </span>
            A
          </span>
          <sbb-icon name="arrow-long-right-small" aria-hidden="true" data-namespace="default" role="img"></sbb-icon>
          <span class="sbb-journey-header__destination">
            <span class="sbb-journey-header__connection--visually-hidden">
              to
            </span>
            B
          </span>
        </span>
      </sbb-title>
    `);
  });

  it('renders H1 L-sized round-trip negative', async () => {
    const root = await fixture(
      html`<sbb-journey-header
        level="1"
        size="l"
        round-trip
        origin="B"
        destination="C"
        negative
      ></sbb-journey-header>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-journey-header level="1" size="l" round-trip="" origin="B" destination="C" negative>
      </sbb-journey-header>
    `);
    expect(root).shadowDom.to.be.equal(`
      <sbb-title level="1" aria-level="1" visual-level="4" role="heading" negative>
        <span class="sbb-journey-header" dir="ltr">
          <span class="sbb-journey-header__origin">
            <span class="sbb-journey-header__connection--visually-hidden">
              Connection from
            </span>
            B
          </span>
          <sbb-icon name="arrows-long-right-left-small" aria-hidden="true" data-namespace="default" role="img"></sbb-icon>
          <span class="sbb-journey-header__destination">
            <span class="sbb-journey-header__connection--visually-hidden">
              to
            </span>
            C
            <span class="sbb-journey-header__connection--visually-hidden">
              and back to B.
            </span>
          </span>
        </span>
      </sbb-title>
    `);
  });
});
