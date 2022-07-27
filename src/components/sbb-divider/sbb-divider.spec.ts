import { SbbDivider } from './sbb-divider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-divider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider aria-orientation="horizontal" class="sbb-divider sbb-divider--horizontal" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
`);
  });
});
