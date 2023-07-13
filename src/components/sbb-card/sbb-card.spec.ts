import { newSpecPage } from '@stencil/core/testing';
import { SbbCard } from './sbb-card';

const cardBadgeWrapperSelector = '.sbb-card__badge-wrapper';
const hasBadgeDataAttributeName = 'data-has-card-badge';

describe('sbb-card', () => {
  it('should not render sbb-card-badge for small sizes', async () => {
    // Note: for easier testing, we add the slot="badge"
    // to <sbb-card-badge> which would not be needed in real.
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
      <sbb-card size="xs">
        <h2>Title</h2>
        Content text
        <sbb-card-badge slot="badge">
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
      </sbb-card>`,
    });

    expect(root.shadowRoot.querySelector(cardBadgeWrapperSelector)).toBeFalsy();
    expect(root).not.toHaveAttribute(hasBadgeDataAttributeName);
  });
});
