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
            <slot name="tab-bar" onSlotchange={this._onTabsSlotChange}></slot>
          </div>
          <div class="tab-content">
            <slot onSlotchange={throttle(this._onContentSlotChange, 250)}></slot>
          </div>
          </mock:shadow-root>
        </lyne-tab-group>
      `);
  });

});
