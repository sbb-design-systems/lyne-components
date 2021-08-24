import { LynePanel } from './lyne-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-panel', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LynePanel],
      html: '<lyne-panel text= "Example panel text"/>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-panel text= "Example panel text">
          <mock:shadow-root>
            <div class="lyne-panel">
              <p class="lyne-panel__text">
                Example panel text
              </p>
              <lyne-button class="lyne-panel__button" label="Button text" size="small" variant="secondary-negative"></lyne-button>
            </div>
          </mock:shadow-root>
        </lyne-panel>
      `);
  });
});
