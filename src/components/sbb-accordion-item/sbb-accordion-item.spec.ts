jest.mock('./guid');

import { SbbAccordionItem } from './sbb-accordion-item';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-accordion-item', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbAccordionItem],
      html: '<sbb-accordion-item />',
    });

    expect(root).toEqualHtml(`
        <sbb-accordion-item>
          <mock:shadow-root>
            <div class="accordion-item accordion-item--closed" role="listitem">
              <h1 class="accordion-item__heading">
                <button aria-controls="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX_body" class="accordion-item__button" aria-expanded="false">
                  <div class="accordion-item__icon">
                    <slot name="icon"></slot>
                  </div>
                  <span class="accordion-item__title"></span>
                  <div class="accordion-item__chevron"></div>
                </button>
              </h1>
              <div aria-hidden="true" class="accordion-item__body" id="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX_body">
                <div class="accordion-item__body-inner">
                  <slot name="content"></slot>
                </div>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-accordion-item>
      `);
  });
});
