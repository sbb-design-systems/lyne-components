import { LyneAccordionItem } from './lyne-accordion-item';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-accordion-item', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneAccordionItem],
      html: '<lyne-accordion-item />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-accordion-item>
          <mock:shadow-root>
          </mock:shadow-root>
        </lyne-accordion-item>
      `);
  });

});
