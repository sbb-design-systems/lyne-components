import { SbbAlertGroup } from './sbb-alert-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-alert-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlertGroup],
      html: '<sbb-alert-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-alert-group>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-alert-group>
      `);
  });
});
