import { SbbSlotComponent } from './sbb-slot-component';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-slot-component', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbSlotComponent],
      html: '<sbb-slot-component />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-slot-component>
          <mock:shadow-root>
            <div>
              <slot></slot>
            </div>
          </mock:shadow-root>
        </sbb-slot-component>
      `);
  });

});
