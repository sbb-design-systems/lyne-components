import { LyneTabGroup } from './lyne-tab-group';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-tab-group', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTabGroup],
      html: '<lyne-tab-group />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-tab-group>
          <mock:shadow-root>
          <div class="tab-group" role="tablist">
            <slot name="tab-bar"></slot>
          </div>
          <div class="tab-content">
            <slot></slot>
          </div>
          </mock:shadow-root>
        </lyne-tab-group>
      `);
  });

});
