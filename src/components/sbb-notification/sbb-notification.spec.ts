import { SbbNotification } from './sbb-notification';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-notification', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbNotification],
      html: '<sbb-notification />',
    });

    expect(root).toEqualHtml(`
        <sbb-notification>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-notification>
      `);
  });
});
