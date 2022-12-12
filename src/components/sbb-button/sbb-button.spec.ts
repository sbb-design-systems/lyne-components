import { SbbButton } from './sbb-button';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-button', () => {
  it('renders a primary button without icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `
        <sbb-button
          variant="primary"
          negative
          size="m"
          button-id="id"
          type="button"
          disabled
          name="name"
          value="value"
          form="formid"
          accessibility-controls="id"
          accessibility-haspopup="true"
          accessibility-label="Travelcards & tickets"
          accessibility-describedby="id"
        >
          Label Text
        </sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button
          variant="primary"
          negative
          size="m"
          button-id="id"
          type="button"
          disabled
          name="name"
          value="value"
          form="formid"
          accessibility-controls="id"
          accessibility-haspopup="true"
          accessibility-label="Travelcards & tickets"
          accessibility-describedby="id"
        >
          <mock:shadow-root>
            <button
              class="sbb-button"
              dir="ltr"
              id="id"
              type="button"
              disabled="true"
              name="name"
              value="value"
              form="formid"
              aria-controls="id"
              aria-haspopup="true"
              aria-label="Travelcards &amp; tickets"
              aria-describedby="id"
             >
              <span class='sbb-button__label'><slot></slot></span>
            </button>
          </mock:shadow-root>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a primary button with slotted icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button variant='primary'><sbb-icon slot='icon' name='chevron-small-left-small'></sbb-icon>Label Text</sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button size='l' variant='primary'>
          <mock:shadow-root>
            <button class='sbb-button' dir="ltr" type="button">
              <span class='sbb-button__icon'>
                <slot name='icon'></slot>
              </span>
              <span class='sbb-button__label'><slot></slot></span>
            </button>
          </mock:shadow-root>
          <sbb-icon slot='icon' name='chevron-small-left-small'></sbb-icon>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a button as a link', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `
        <sbb-button
          href="http://www.sbb.ch"
          target="_blank"
          rel="noopener"
          download
        >
          Label Text
        </sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button
          variant="primary"
          size="l"
          href="http://www.sbb.ch"
          target="_blank"
          rel="noopener"
          download
        >
          <mock:shadow-root>
            <a
              class="sbb-button"
              dir="ltr"
              href="http://www.sbb.ch"
              target="_blank"
              rel="noopener"
              download
             >
              <span class='sbb-button__label'>
                <slot></slot>
                <span class="sbb-button__opens-in-new-window">
                  . Link target opens in new window.
                </span>
              </span>
            </a>
          </mock:shadow-root>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a sbb-button inside an anchor as span element', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<a href="#"><sbb-button variant='secondary' negative>this is a button</sbb-button></a>`,
    });

    expect(root).toEqualHtml(`
          <sbb-button variant='secondary' negative size='l' static>
            <mock:shadow-root>
              <span class='sbb-button' dir="ltr">
                <span class='sbb-button__label'><slot></slot></span>
              </span>
            </mock:shadow-root>
            this is a button
          </sbb-button>
      `);
  });

  it('renders a sbb-button as span element by setting static property', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button variant='secondary' static>this is a static button</sbb-button>`,
    });

    expect(root).toEqualHtml(`
          <sbb-button variant='secondary' size='l' static>
            <mock:shadow-root>
              <span class='sbb-button' dir="ltr">
                <span class='sbb-button__label'><slot></slot></span>
              </span>
            </mock:shadow-root>
            this is a static button
          </sbb-button>
      `);
  });
});
