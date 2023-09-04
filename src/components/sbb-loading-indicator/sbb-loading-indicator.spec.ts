import { SbbLoadingIndicator } from './sbb-loading-indicator';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-loading-indicator', () => {
  it('renders with variant `window`', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator variant="window"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-loading-indicator variant="window" size="s">
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element">
              <div>
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </span>
          </span>
        </mock:shadow-root>
      </sbb-loading-indicator>
    `);
  });

  it('renders with variant `circle`', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator variant="circle"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-loading-indicator variant="circle" size="s">
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element"></span>
          </span>
        </mock:shadow-root>
      </sbb-loading-indicator>
    `);
  });
});
