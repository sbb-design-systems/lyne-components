import { SbbAlert } from './sbb-alert';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-alert', () => {
  it('should render default properties', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlert],
      html: '<sbb-alert title-content="Interruption">Alert content</sbb-alert>',
    });

    expect(root).toEqualHtml(`
        <sbb-alert title-content="Interruption" size="m">
          <mock:shadow-root>
            <div class="sbb-alert__transition-wrapper" style="height: undefinedpx;">
              <div class="sbb-alert" style="opacity: 0;">
                <span class="sbb-alert__icon">
                  <slot name="icon">
                    <sbb-icon name="info"></sbb-icon>
                  </slot>
                </span>
                <span class="sbb-alert__content">
                  <sbb-title class="sbb-alert__title" level="3" negative visual-level="5">
                    <slot name="title">Interruption</slot>
                  </sbb-title>
                  <p class="sbb-alert__content-slot">
                    <slot></slot>
                  </p>
                </span>
                <span class="sbb-alert__close-button-wrapper">
                <sbb-divider class="sbb-alert__close-button-divider" negative="" orientation="vertical"></sbb-divider>
                <sbb-button aria-label="Close message" class="sbb-alert__close-button" icon-name="cross-small" negative="" size="m" variant="transparent"></sbb-button>
                </span>
              </div>
            </div>
          </mock:shadow-root>
           Alert content
        </sbb-alert>
      `);
  });

  it('should render customized properties', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlert],
      html: '<sbb-alert title-content="Interruption" title-level="2" size="l" disable-animation="true" icon-name="disruption" accessibility-label="label" href="https://www.sbb.ch" rel="noopener" target="_blank" link-content="Show much more">Alert content</sbb-alert>',
    });

    expect(root).toEqualHtml(`
        <sbb-alert title-content="Interruption" title-level="2" size="l" disable-animation="true" icon-name="disruption" accessibility-label="label" href="https://www.sbb.ch" rel="noopener" target="_blank" link-content="Show much more">
          <mock:shadow-root>
            <div class="sbb-alert__transition-wrapper">
              <div class="sbb-alert">
                <span class="sbb-alert__icon">
                  <slot name="icon">
                    <sbb-icon name="disruption"></sbb-icon>
                  </slot>
                </span>
                <span class="sbb-alert__content">
                  <sbb-title class="sbb-alert__title" level="2" negative visual-level="3">
                    <slot name="title">Interruption</slot>
                  </sbb-title>
                  <p class="sbb-alert__content-slot">
                    <slot></slot>
                  </p>
                  <span aria-hidden="true"></span>
                  <sbb-link negative variant="inline" aria-label="label" href="https://www.sbb.ch" rel="noopener" target="_blank">
                    Show much more
                  </sbb-link>
                </span>
                <span class="sbb-alert__close-button-wrapper">
                <sbb-divider class="sbb-alert__close-button-divider" negative="" orientation="vertical"></sbb-divider>
                <sbb-button aria-label="Close message" class="sbb-alert__close-button" icon-name="cross-small" negative="" size="m" variant="transparent"></sbb-button>
                </span>
              </div>
            </div>
          </mock:shadow-root>
           Alert content
        </sbb-alert>
      `);
  });

  it('should hide close button in readonly mode', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlert],
      html: '<sbb-alert title-content="Interruption" readonly>Alert content</sbb-alert>',
    });

    expect(root.shadowRoot.querySelector('.sbb-alert__close-button-wrapper')).toBeNull();
  });
});
