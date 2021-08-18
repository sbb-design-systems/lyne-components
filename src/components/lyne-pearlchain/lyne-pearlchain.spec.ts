import { LynePearlchain } from './lyne-pearlchain';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-pearlchain', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LynePearlchain],
      html: '<lyne-pearlchain label="Label" variant="secondary-negative" icon="true" />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-pearlchain>
          <mock:shadow-root>
            <div></div>
        </lyne-pearlchain>
      `);
  });

});
