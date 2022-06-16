import { SbbAccordion } from './sbb-accordion';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-accordion', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbAccordion],
      html: '<sbb-accordion />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-accordion>
          <mock:shadow-root>
            <div class="accordion" role="list">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </sbb-accordion>
      `);
  });

});
