import { SbbLink } from './sbb-link';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-link', () => {
  it('renders a plain link with no icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `
        <sbb-link
          href="https://github.com/lyne-design-system/lyne-components"
          text-size="m"
          download
          link-id="id"
          accessibility-label="Travelcards & tickets"
          accessibility-describedbdy="id"
          >
            Travelcards &amp; tickets.
          </sbb-link>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-link
          variant="block"
          href="https://github.com/lyne-design-system/lyne-components"
          text-size="m"
          download
          link-id="id"
          accessibility-label="Travelcards & tickets"
          accessibility-describedbdy="id"
          >
          <mock:shadow-root>
            <a
              aria-label="Travelcards & tickets"
              class="sbb-link"
              dir="ltr"
              download
              href="https://github.com/lyne-design-system/lyne-components"
              id="id"
            >
              <slot></slot>
            </a>
          </mock:shadow-root>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });

  it('renders a link as a button with provided icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `
        <sbb-link
          icon-placement="end"
          text-size="m"
          negative
          name="name"
          type="submit"
          form="formid"
          disabled
          accessibility-controls="id"
          accessibility-haspopup="true"
        >
          <sbb-icon name="chevron-small-right-small" slot="icon"></sbb-icon>
          Travelcards &amp; tickets.
        </sbb-link>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link
          variant="block"
          icon-placement="end"
          text-size="m"
          negative
          name="name"
          type="submit"
          form="formid"
          disabled
          accessibility-controls="id"
          accessibility-haspopup="true"
        >
          <mock:shadow-root>
            <button
              class="sbb-link"
              dir="ltr"
              disabled="true"
              form="formid"
              name="name"
              type="submit"
              aria-controls="id"
              aria-haspopup="true"
            >
              <span class="sbb-link__icon">
                <slot name="icon"></slot>
              </span>
              <slot></slot>
            </button>
          </mock:shadow-root>
          <sbb-icon name="chevron-small-right-small" slot="icon"></sbb-icon>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });

  it('renders a link as a span with sbb-icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `
      <a>
        <sbb-link icon-placement="end" icon-name="chevron-small-right-small" text-size="m">
          Travelcards &amp; tickets.
        </sbb-link>
      </a>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link
            icon-placement="end"
            icon-name="chevron-small-right-small"
            text-size="m"
            variant="block"
            static>
          <mock:shadow-root>
            <span class="sbb-link" dir="ltr">
              <span class="sbb-link__icon">
                <slot name="icon">
                  <sbb-icon name="chevron-small-right-small"></sbb-icon>
                </slot>
              </span>
              <slot></slot>
            </span>
          </mock:shadow-root>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });

  it('renders a link as a span by setting static property', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `
        <sbb-link static>
          Travelcards &amp; tickets.
        </sbb-link>
      `,
    });

    expect(root).toEqualHtml(`
        <sbb-link variant="block" static text-size="s">
          <mock:shadow-root>
            <span class="sbb-link" dir="ltr">
              <slot></slot>
            </span>
          </mock:shadow-root>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });

  it('renders the inline variant', async () => {
    const { root } = await newSpecPage({
      components: [SbbLink],
      html: `
        <sbb-link variant="inline" text-size="m" href="#link" target="_blank">
          Travelcards &amp; tickets.
        </sbb-link>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link
            text-size="m"
            variant="inline"
            href="#link"
            target="_blank"
>
          <mock:shadow-root>
            <a class="sbb-link" dir="ltr" href="#link" rel="external noopener nofollow" target="_blank">
              <slot></slot>
              <span class="sbb-link__opens-in-new-window">. Link target opens in new window.</span>
            </a>
          </mock:shadow-root>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });
});
