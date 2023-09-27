import { SbbLoadingIndicator } from './sbb-loading-indicator';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-loading-indicator', () => {
  it('renders with variant `window`', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator variant="window" size="m"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-loading-indicator variant="window" size="m" color="default" role="progressbar" aria-busy='true'>
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element">
              <span>
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>
            </span>
          </span>
        </mock:shadow-root>
      </sbb-loading-indicator>
    `);
  });

  it('renders with variant `window` and color smoke', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator variant="window" size="m" color="smoke"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-loading-indicator variant="window" size="m" color="smoke" role="progressbar" aria-busy='true'>
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element">
              <span>
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>
            </span>
          </span>
        </mock:shadow-root>
      </sbb-loading-indicator>
    `);
  });

  it('renders with variant `window` and color white', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator variant="window" size="m" color="white"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-loading-indicator variant="window" size="m" color="white" role="progressbar" aria-busy='true'>
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element">
              <span>
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>
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
      <sbb-loading-indicator variant="circle" size="s" color="default" role="progressbar" aria-busy="true">
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element"></span>
          </span>
        </mock:shadow-root>
      </sbb-loading-indicator>
    `);
  });

  it('renders with variant `circle` and color smoke', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator variant="circle" color="smoke"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-loading-indicator variant="circle" color="smoke" size="s" role="progressbar" aria-busy="true">
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element"></span>
          </span>
        </mock:shadow-root>
      </sbb-loading-indicator>
    `);
  });

  it('renders with variant `circle` and color white', async () => {
    const { root } = await newSpecPage({
      components: [SbbLoadingIndicator],
      html: '<sbb-loading-indicator variant="circle" color="white"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-loading-indicator variant="circle" color="white" size="s" role="progressbar" aria-busy="true">
        <mock:shadow-root>
          <span class="sbb-loading-indicator">
            <span class="sbb-loading-indicator__animated-element"></span>
          </span>
        </mock:shadow-root>
      </sbb-loading-indicator>
    `);
  });
});
