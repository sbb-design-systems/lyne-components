import { SbbTitle } from './sbb-title';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-title', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTitle],
      html: '<sbb-title level="1" visual-level="2">Sample Title Text</sbb-title>',
    });

    expect(root).toEqualHtml(`
        <sbb-title level="1" visual-level="2">
          <mock:shadow-root>
            <h1 class="sbb-title"><slot></slot></h1>
          </mock:shadow-root>
          Sample Title Text
        </sbb-title>
      `);
  });
});
