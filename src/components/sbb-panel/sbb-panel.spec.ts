import { SbbPanel } from './sbb-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-panel', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbPanel],
      html: '<sbb-panel text="Example panel text" button-text="Button text" />'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-panel text="Example panel text" button-text="Button text">
          <mock:shadow-root>
            <div class="panel">
              <p class="panel__text">
                Example panel text
              </p>
              <sbb-button class="panel__button" label="Button text" size="small" variant="secondary-negative" visual-button-only=""></sbb-button>
            </div>
          </mock:shadow-root>
        </sbb-panel>
      `);
  });
});
