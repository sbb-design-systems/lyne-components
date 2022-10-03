import lyneIcons from 'lyne-icons/dist/icons.json';
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
          id-value="id"
          accessibility-label="Travelcards & tickets"
          accessibility-describedbdy="id"
          accessibility-labelledby="id"
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
          id-value="id"
          accessibility-label="Travelcards & tickets"
          accessibility-describedbdy="id"
          accessibility-labelledby="id"
          >
          <mock:shadow-root>
            <a
              aria-label="Travelcards & tickets"
              aria-labelledby="id"
              class="sbb-link sbb-link--icon-placement-start sbb-link--text-m"
              dir="ltr"
              download=""
              href="https://github.com/lyne-design-system/lyne-components"
              id="id"
            >
              <slot name="icon"></slot>
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
        <sbb-link icon-placement="end" text-size="m" negative name="name" type="submit" form="formid" disabled event-id="eventId">
          <span slot="icon">
            ${lyneIcons.icons['chevron-small-right-small']}
          </span>
          Travelcards &amp; tickets.
        </sbb-link>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link
            icon-placement="end"
            text-size="m"
            variant="block"
            negative
            name="name"
            type="submit"
            form="formid"
            disabled
            event-id="eventId"
            >
          <mock:shadow-root>
            <button
              class="sbb-link sbb-link--icon-placement-end sbb-link--negative sbb-link--text-m"
              dir="ltr"
              disabled="true"
              form="formid"
              name="name"
              type="submit"
              >
              <slot name="icon"></slot>
              <slot></slot>
            </button>
          </mock:shadow-root>
          <span slot="icon">
            <svg height="24" viewBox="0,0,24,24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="m10.6776,7.74045,3.949,3.90395.3597.3557-.3597.3555-3.95,3.904-.70297-.7112L13.5639,12,9.97459,8.4516l.70301-.71115z">
              </path>
            </svg>
          </span>
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
            <span class="sbb-link sbb-link--icon-placement-end sbb-link--text-m" dir="ltr">
              <slot name="icon">
                <sbb-icon name="chevron-small-right-small"></sbb-icon>
              </slot>
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
        <sbb-link variant="block" static>
          <mock:shadow-root>
            <span class="sbb-link sbb-link--icon-placement-start sbb-link--text-s" dir="ltr">
              <slot name="icon"></slot>
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
            <a class="sbb-link sbb-link--icon-placement-start sbb-link--inline" dir="ltr" href="#link" rel="external noopener nofollow" target="_blank">
              <slot></slot>
              <span class="sbb-link__opens-in-new-window">. Link target opens in new window.</span>
            </a>
          </mock:shadow-root>
          Travelcards &amp; tickets.
        </sbb-link>
      `);
  });
});
