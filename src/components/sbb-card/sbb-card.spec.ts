import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-card';
import '../sbb-card-badge';

const cardBadgeWrapperSelector = '.sbb-card__badge-wrapper';

describe('sbb-card', () => {
  it('should not render sbb-card-badge for small sizes', async () => {
    // Note: for easier testing, we add the slot="badge"
    // to <sbb-card-badge> which would not be needed in real.
    const root = await fixture(
      html` <sbb-card size="xs">
        <h2>Title</h2>
        Content text
        <sbb-card-badge slot="badge">
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
      </sbb-card>`,
    );

    expect(root.shadowRoot.querySelector(cardBadgeWrapperSelector)).not.to.be.ok;
  });
});
