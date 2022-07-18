import { SbbTitle } from './sbb-title';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-title', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTitle],
      html: '<sbb-title level="1" visual-level="2" title-id="test">Sample Title Text</sbb-title>',
    });

    expect(root).toEqualHtml(`
        <sbb-title level="1" visual-level="2" title-id="test">
          <mock:shadow-root>
            <h1 class="title title-2" id="test"><slot></slot></h1>
          </mock:shadow-root>
          Sample Title Text
        </sbb-title>
      `);
  });
});
