import { SbbCalendar } from './sbb-calendar';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-calendar', () => {
  // FIXME fix and remove skip
  it.skip('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCalendar],
      html: '<sbb-calendar />',
    });

    expect(root).toEqualHtml(`
        <sbb-calendar>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </sbb-calendar>
      `);
  });
});
