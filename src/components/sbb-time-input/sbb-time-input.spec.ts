import { SbbTimeInput } from './sbb-time-input';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimeInput],
      html: '<sbb-time-input />',
    });

    expect(root).toEqualHtml(`
        <sbb-time-input>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-time-input>
      `);
  });
});
