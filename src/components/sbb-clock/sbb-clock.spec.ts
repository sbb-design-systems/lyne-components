import { SbbClock } from './sbb-clock';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-clock', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbClock],
      html: '<sbb-clock />',
    });

    expect(root).toEqualHtml(`
      <sbb-clock>
        <mock:shadow-root>
          <div class="sbb-clock sbb-clock--not-initialized">
            <span class="sbb-clock__face"></span>
            <span class="sbb-clock__hand-hours"></span>
            <span class="sbb-clock__hand-minutes sbb-clock__hand-minutes--no-transition"></span>
            <span class="sbb-clock__hand-seconds"></span>
          </div>
        </mock:shadow-root>
      </sbb-clock>
    `);
  });
});
