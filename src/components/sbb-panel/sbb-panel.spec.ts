import { SbbPanel } from './sbb-panel';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbPanel],
      html: '<sbb-panel />',
    });

    expect(root).toEqualHtml(`
        <sbb-panel>
          <mock:shadow-root>
            <div class="panel">
              <div class="panel__text">
                <slot name="text"></slot>
              </div>
          </mock:shadow-root>
        </sbb-panel>
      `);
  });

  it('renders with property', async () => {
    const { root } = await newSpecPage({
      components: [SbbPanel],
      html: '<sbb-panel text="Panel Text" href="https://sbb.ch" link-text="Mehr erfahren"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-panel href="https://sbb.ch" link-text="Mehr erfahren" text="Panel Text">
          <mock:shadow-root>
            <div class="panel">
              <div class="panel__text">
              <slot name="text">
                Panel Text
              </slot>
              </div>
              <div class="panel__link">
                <slot name="link">
                  <sbb-link href="https://sbb.ch" icon-name="chevron-small-right-small" icon-placement="end" negative="" text-size="m">
                    Mehr erfahren
                  </sbb-link>
                </slot>
              </div>
          </mock:shadow-root>
        </sbb-panel>
      `);
  });

  it('renders with slots', async () => {
    const { root } = await newSpecPage({
      components: [SbbPanel],
      html: '<sbb-panel><span slot="text">Panel Slot Text</span><sbb-link slot="link">Link</sbb-link></sbb-panel>',
    });

    expect(root).toEqualHtml(`
        <sbb-panel >
          <mock:shadow-root>
            <div class="panel">
              <div class="panel__text">
                <slot name="text"></slot>
              </div>
              <div class="panel__link">
                <slot name="link">
                  <sbb-link icon-name="chevron-small-right-small" icon-placement="end" negative="" text-size="m"></sbb-link>
                </slot>
              </div>
            </div>
          </mock:shadow-root>
          <span slot="text">
              Panel Slot Text
          </span>
          <sbb-link slot="link">
            Link
          </sbb-link>
        </sbb-panel>
      `);
  });
});
