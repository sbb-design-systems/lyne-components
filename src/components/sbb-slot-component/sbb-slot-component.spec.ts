import { LyneSlotComponent } from './lyne-slot-component';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-slot-component', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneSlotComponent],
      html: '<lyne-slot-component />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-slot-component>
          <mock:shadow-root>
            <div>
              <slot></slot>
            </div>
          </mock:shadow-root>
        </lyne-slot-component>
      `);
  });

});
