import { LynePanel } from './lyne-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-panel', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LynePanel],
      html: '<lyne-panel text="Example panel text" button-text="Button text" />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-panel text="Example panel text" button-text="Button text">
          <mock:shadow-root>
            <div class="panel">
              <p class="panel__text">
                Example panel text
              </p>
              <lyne-button class="panel__button" label="Button text" size="m" variant="secondary-negative" visual-button-only=""></lyne-button>
            </div>
          </mock:shadow-root>
        </lyne-panel>
      `);
  });
});
