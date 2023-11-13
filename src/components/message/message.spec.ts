import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '.';

describe('sbb-message', () => {
  it('renders', async () => {
    const root = await fixture(
      html` <sbb-message title-content="Title.">
        <sbb-image slot="image"></sbb-image>
        <p slot="subtitle">Subtitle.</p>
        <p slot="legend">Error code: 0001</p>
        <sbb-button slot="action" icon-name="arrows-circle-small"></sbb-button>
      </sbb-message>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-message title-content="Title.">

          <sbb-image slot="image"></sbb-image>
          <p slot="subtitle">
            Subtitle.
          </p>
          <p slot="legend">
            Error code: 0001
          </p>
          <sbb-button icon-name="arrows-circle-small" slot="action"></sbb-button>
        </sbb-message>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-message__container">
          <slot name="image"></slot>
          <sbb-title level="3" visual-level="5" class="sbb-message__title" aria-level="3" role="heading">
            <slot name="title">
              Title.
            </slot>
          </sbb-title>
          <slot name="subtitle"></slot>
          <slot name="legend"></slot>
          <slot name="action"></slot>
        </div>
      `,
    );
  });

  it('renders without optional slots', async () => {
    const root = await fixture(
      html` <sbb-message title-content="Title.">
        <p slot="subtitle">Subtitle.</p>
      </sbb-message>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-message title-content="Title.">

          <p slot="subtitle">
            Subtitle.
          </p>
        </sbb-message>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-message__container">
          <slot name="image"></slot>
          <sbb-title level="3" visual-level="5" class="sbb-message__title" aria-level="3" role="heading">
            <slot name="title">
              Title.
            </slot>
          </sbb-title>
          <slot name="subtitle"></slot>
          <slot name="legend"></slot>
          <slot name="action"></slot>
        </div>
      `,
    );
  });
});
